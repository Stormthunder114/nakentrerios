# NAK Entre Rios — projeto atualizado

Código do site publicado em https://nakentrerios.online, atualizado em 31/10/2026.
Inclui matrículas, administração de alunos e fotos, requisitos das graduações, WhatsApp e Minha Jornada na NAK abaixo das fotos rolantes.

## Executar
Node.js 22.13 ou superior. Execute `npm install`, `npm run dev` e `npm run build`.
O build gera `dist/`. Envie o conteúdo de dist à Cloudflare para publicar.
A atualização no GitHub não altera o banco de dados.

## Organização
- `app/page.tsx`: página principal.
- `components/nak`: componentes atuais, incluindo Jornadas e AdminJornadas.
- `lib`: integração com Supabase e validações.
- `supabase/functions`: código das funções enviar-jornada e avisar-matricula.
- `supabase/sql/jornadas-inicial.sql`: referência da instalação inicial já aplicada. NÃO executar novamente no banco atual; não é uma migração repetível.

## Configuração e dados
A chave do Turnstile em `.env.production` é pública e destinada ao domínio atual. O segredo Turnstile, JORNADAS_RATE_SALT, service role e credenciais Resend ficam somente no Supabase; não estão neste pacote.
A função enviar-jornada tem verificação JWT legada desativada para receber envios sem login; valida Turnstile, origem, conteúdo e limite por IP. Operações administrativas continuam autorizadas no banco.
As funções e políticas já estão instaladas no projeto Supabase existente. Não é necessário reinstalá-las para editar o visual.
Esta cópia contém código e imagens locais, não um backup dos alunos, depoimentos, usuários ou fotos guardadas no Supabase.

## Verificação
Build e TypeScript verificados. Testes locais das jornadas e demais integrações foram executados com respostas simuladas. No servidor, leitura pública e rejeição de acesso privado/ envio sem CAPTCHA foram verificadas. O fluxo completo de um depoimento real, do envio à aprovação, ainda requer conferência.

## Arquivos anteriores no GitHub
O repositório mantém `src/`, `server.ts`, dados e configurações anteriores para referência. A entrada atual é `main.tsx` e os scripts deste package.json usam Vite e Supabase. O histórico Git também preserva a versão anterior.
