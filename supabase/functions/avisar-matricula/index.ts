// Supabase Edge Function: avisar-matricula
// JWT ativo na plataforma; o webhook também exige o segredo exclusivo abaixo.
export async function handle(req: Request): Promise<Response> {
  const json = (body: object, status = 200) => Response.json(body, { status });
  if (req.method !== 'POST') return json({ error: 'Método não permitido' }, 405);
  const secret = Deno.env.get('MATRICULA_WEBHOOK_SECRET');
  if (!secret || secret.length < 32 || req.headers.get('x-nak-webhook-secret') !== secret)
    return json({ error: 'Não autorizado' }, 401);
  const key = Deno.env.get('RESEND_API_KEY');
  const to = Deno.env.get('MATRICULA_EMAIL_TO') || 'douglaslcarriel@gmail.com';
  const from = Deno.env.get('MATRICULA_EMAIL_FROM') || 'NAK Entre Rios <onboarding@resend.dev>';
  if (!key) return json({ error: 'Envio não configurado' }, 503);
  let payload;
  try { payload = await req.json(); } catch { return json({ error: 'Conteúdo inválido' }, 400); }
  if (!payload || payload.type !== 'INSERT' || payload.schema !== 'public' || payload.table !== 'alunos')
    return json({ error: 'Evento inválido' }, 400);
  const aluno = payload.record;
  if (!aluno || typeof aluno.id !== 'string' || !/^[a-zA-Z0-9-]{1,80}$/.test(aluno.id) ||
      typeof aluno.nome !== 'string' || aluno.nome.length > 120 ||
      typeof aluno.telefone !== 'string' || !/^\d{10,11}$/.test(aluno.telefone) ||
      typeof aluno.turma !== 'string' || aluno.turma.length > 200)
    return json({ error: 'Cadastro inválido' }, 400);
  const whatsapp = 'https://wa.me/55' + aluno.telefone;
  const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]!));
  const html = `<div style="font-family:Arial,sans-serif;color:#18181b;line-height:1.6;max-width:560px;margin:auto;padding:24px"><h2>Nova matrícula — NAK Entre Rios</h2><p><strong>Aluno:</strong> ${escapeHtml(aluno.nome)}<br><strong>WhatsApp:</strong> ${escapeHtml(aluno.telefone)}<br><strong>Turma:</strong> ${escapeHtml(aluno.turma)}</p><p style="margin:24px 0"><a href="${whatsapp}" style="display:inline-block;background:#166534;color:#ffffff;padding:14px 20px;border-radius:10px;text-decoration:none;font-weight:bold">Conversar no WhatsApp</a></p><p>O botão abre a conversa. A mensagem só será enviada quando você tocar em Enviar no WhatsApp.</p><p><a href="https://nakentrerios.online/">Abrir gerenciamento no site</a></p><p style="color:#71717a;font-size:13px">A inscrição é uma solicitação; confirme a vaga com o aluno.</p></div>`;
  const text = ['Uma nova matrícula foi recebida na NAK Entre Rios.', '',
    `Aluno: ${aluno.nome}`, `WhatsApp: ${aluno.telefone}`, `Turma: ${aluno.turma}`,
    '', 'Conversar no WhatsApp: ' + whatsapp, '', 'Confira o cadastro no gerenciamento do site: https://nakentrerios.online/',
    'A inscrição é uma solicitação; confirme a vaga com o aluno.'].join('\n');
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json',
        'Idempotency-Key': `matricula-${aluno.id}` },
      body: JSON.stringify({ from, to: [to], subject: 'Nova matrícula — NAK Entre Rios', text, html }),
      signal: AbortSignal.timeout(15000)
    });
    if (!response.ok) return json({ error: 'Serviço de e-mail recusou o envio', status: response.status }, 502);
    return json({ accepted: true });
  } catch { return json({ error: 'Não foi possível confirmar o envio do aviso' }, 502); }
}
Deno.serve(handle);
