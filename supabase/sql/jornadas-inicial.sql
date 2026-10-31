-- Revisar e executar UMA VEZ no Supabase antes de habilitar a funcionalidade.
-- Nenhuma tabela de alunos/fotos é alterada. Transação atômica.
begin;
create table public.nak_jornadas (
 id uuid primary key default gen_random_uuid(),
 nome text check (char_length(nome)<=120), tempo text check(char_length(tempo)<=80), prajied text check(char_length(prajied)<=80),
 depoimento text not null check(char_length(btrim(depoimento)) between 1 and 5000),
 menor boolean not null, consentiu boolean not null check(consentiu),
 consentimento_versao text not null default '2026-10-jornada-v1',
 estado text not null default 'Pendente' check(estado in ('Pendente','Aprovado','Rejeitado')),
 autorizacao_valida boolean not null default false,
 autorizacao_referencia text check(char_length(autorizacao_referencia)<=500),
 autorizacao_em timestamptz, autorizacao_por uuid,
 excluida boolean not null default false, versao integer not null default 1,
 criado_em timestamptz not null default now(), atualizado_em timestamptz not null default now(),
 check(estado<>'Aprovado' or (autorizacao_valida and consentiu and not excluida and
   (not menor or (autorizacao_por is not null and autorizacao_em is not null and coalesce(char_length(btrim(autorizacao_referencia)),0)>=10))))
);
create table public.nak_jornadas_historico (
 id bigint generated always as identity primary key, jornada_id uuid not null references public.nak_jornadas(id),
 acao text not null, estado text not null, ator uuid, criado_em timestamptz not null default now()
);
create table public.nak_jornadas_limites(chave text primary key, inicio timestamptz not null, quantidade integer not null);
alter table public.nak_jornadas enable row level security;
alter table public.nak_jornadas_historico enable row level security;
alter table public.nak_jornadas_limites enable row level security;
revoke all on public.nak_jornadas,public.nak_jornadas_historico,public.nak_jornadas_limites from public,anon,authenticated;
grant select on public.nak_jornadas,public.nak_jornadas_historico to authenticated;
create policy nak_jornadas_admin_leitura on public.nak_jornadas for select to authenticated
 using(exists(select 1 from public.nak_admins a where a.user_id=auth.uid()));
create policy nak_jornadas_historico_admin on public.nak_jornadas_historico for select to authenticated
 using(exists(select 1 from public.nak_admins a where a.user_id=auth.uid()));
-- View com projeção explícita: nunca expõe consentimento, menoridade ou evidência privada.
create view public.nak_jornadas_publicas with(security_barrier=true) as
 select id,nome,tempo,prajied,depoimento,criado_em from public.nak_jornadas
 where estado='Aprovado' and autorizacao_valida and consentiu and not excluida
 and (not menor or (autorizacao_por is not null and autorizacao_em is not null and coalesce(char_length(btrim(autorizacao_referencia)),0)>=10));
revoke all on public.nak_jornadas_publicas from public,anon,authenticated;
grant select on public.nak_jornadas_publicas to anon,authenticated;
create index on public.nak_jornadas(estado,criado_em desc);

-- Apenas o serviço de envio pode chamar; anon/authenticated não podem forjar autorizações.
create function public.nak_receber_jornada(p_dados jsonb,p_chave text) returns uuid
language plpgsql security definer set search_path='' as $$
declare v_id uuid; v_count integer; v_menor boolean;
begin
 if p_chave !~ '^[a-f0-9]{64}$' or p_chave is null then raise exception 'Origem inválida'; end if;
 if jsonb_typeof(p_dados->'menor')<>'boolean' or p_dados->>'menor' is null or p_dados->>'autoriza' is distinct from 'true' then raise exception 'Autorização obrigatória'; end if;
 v_menor=(p_dados->>'menor')::boolean;
 -- Contador persistente e atômico; não permite exceder a cota por concorrência.
 insert into public.nak_jornadas_limites(chave,inicio,quantidade) values(p_chave,now(),1)
 on conflict(chave) do update set
 quantidade=case when nak_jornadas_limites.inicio < now()-interval '1 hour' then 1 else nak_jornadas_limites.quantidade+1 end,
 inicio=case when nak_jornadas_limites.inicio < now()-interval '1 hour' then now() else nak_jornadas_limites.inicio end
 returning quantidade into v_count;
 if v_count>3 then raise exception 'Limite de envios' using errcode='P0429'; end if;
 delete from public.nak_jornadas_limites where inicio<now()-interval '2 days';
 insert into public.nak_jornadas(nome,tempo,prajied,depoimento,menor,consentiu,autorizacao_valida)
 values(nullif(btrim(p_dados->>'nome'),''),nullif(btrim(p_dados->>'tempo'),''),nullif(btrim(p_dados->>'prajied'),''),btrim(p_dados->>'depoimento'),v_menor,true,not v_menor) returning id into v_id;
 insert into public.nak_jornadas_historico(jornada_id,acao,estado) values(v_id,'Enviado','Pendente');
 return v_id;
end $$;
revoke all on function public.nak_receber_jornada(jsonb,text) from public,anon,authenticated;
grant execute on function public.nak_receber_jornada(jsonb,text) to service_role;

create function public.nak_moderar_jornada(p_id uuid,p_versao integer,p_acao text,p_dados jsonb default '{}') returns jsonb
language plpgsql security definer set search_path='' as $$
declare j public.nak_jornadas; v_actor uuid=auth.uid(); v_event text;
begin
 if v_actor is null or not exists(select 1 from public.nak_admins where user_id=v_actor) then raise exception 'Acesso negado' using errcode='42501'; end if;
 select * into j from public.nak_jornadas where id=p_id for update;
 if not found or j.excluida then raise exception 'Jornada indisponível'; end if;
 if p_versao is distinct from j.versao then raise exception 'Atualize a lista antes de continuar'; end if;
 case p_acao
 when 'aprovar' then
  if not j.autorizacao_valida or (j.menor and (j.autorizacao_por is null or j.autorizacao_em is null or coalesce(char_length(btrim(j.autorizacao_referencia)),0)<10)) then raise exception 'Autorização não verificada'; end if;
  j.estado='Aprovado'; v_event='Publicado';
 when 'rejeitar' then j.estado='Rejeitado'; v_event='Rejeitado';
 when 'retirar' then j.estado='Pendente'; v_event='Retirado do site';
 when 'excluir' then j.excluida=true;j.estado='Rejeitado';j.autorizacao_valida=false;v_event='Excluído (arquivado)';
 when 'editar' then
  j.nome=nullif(btrim(p_dados->>'nome'),'');j.tempo=nullif(btrim(p_dados->>'tempo'),'');j.prajied=nullif(btrim(p_dados->>'prajied'),'');j.depoimento=btrim(p_dados->>'depoimento');
  j.estado='Pendente';j.autorizacao_valida=false;j.autorizacao_referencia=null;j.autorizacao_em=null;j.autorizacao_por=null;v_event='Editado — nova autorização necessária';
 when 'autorizar' then
  if coalesce(char_length(btrim(p_dados->>'referencia')),0) not between 10 and 500 then raise exception 'Registre uma referência verificável'; end if;
  j.autorizacao_valida=true;j.autorizacao_referencia=btrim(p_dados->>'referencia');j.autorizacao_em=now();j.autorizacao_por=v_actor;v_event='Autorização conferida';
 else raise exception 'Ação inválida'; end case;
 update public.nak_jornadas set nome=j.nome,tempo=j.tempo,prajied=j.prajied,depoimento=j.depoimento,estado=j.estado,autorizacao_valida=j.autorizacao_valida,autorizacao_referencia=j.autorizacao_referencia,autorizacao_em=j.autorizacao_em,autorizacao_por=j.autorizacao_por,excluida=j.excluida,versao=versao+1,atualizado_em=now() where id=p_id;
 insert into public.nak_jornadas_historico(jornada_id,acao,estado,ator) values(p_id,v_event,j.estado,v_actor);
 return jsonb_build_object('ok',true);
end $$;
revoke all on function public.nak_moderar_jornada(uuid,integer,text,jsonb) from public,anon;
grant execute on function public.nak_moderar_jornada(uuid,integer,text,jsonb) to authenticated;
commit;
