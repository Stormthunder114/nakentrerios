import React from 'react';
import { NakLogo } from './NakLogo';
import { Prajied } from './Prajied';
import './requisitos.css';

const exames = [{
  id: 'branca-ponta-vermelha', nome: 'Branca com ponta vermelha', cores: ['#faf9f2', '#b72b27'],
  secoes: [
    { titulo: 'Conhecimento teórico', grupos: [{ itens: ['Saber recitar 4 mandamentos do Muay Thai.'] }] },
    { titulo: 'Avaliação física', grupos: [{ itens: ['20 flexões de braço.', '40 abdominais curtos.', '20 abdominais longos.', '10 sugados (burpees).'] }] },
    { titulo: 'Avaliação técnica', grupos: [{ itens: ['1 minuto de sequência livre.', '1 minuto de sombra (Shadow Boxing).'] }] },
    { titulo: 'Golpes obrigatórios', grupos: [
      { titulo: 'Técnicas de mão', itens: ['Jab', 'Direto', 'Cruzado', 'Gancho'] },
      { titulo: 'Técnicas de perna', itens: ['Pando', 'Pando tchagui', 'Irokiko', 'Aptchagui', 'Yoptchagui', 'Ampantã', 'Yopantã', 'Aparolegui'] },
    ] },
  ],
}, {
  id: 'vermelha', nome: 'Vermelha', cores: ['#b72b27'],
  secoes: [
    { titulo: 'Conhecimento teórico', grupos: [{ itens: ['Saber recitar 6 mandamentos do Muay Thai.'] }] },
    { titulo: 'Avaliação física', grupos: [{ itens: ['30 flexões de braço.', '60 abdominais curtos.', '30 abdominais longos.', '15 sugados (burpees).'] }] },
    { titulo: 'Avaliação técnica', grupos: [{ itens: ['1 minuto e 30 segundos de sequência livre.', '1 minuto e 30 segundos de sombra (Shadow Boxing).'] }] },
    { titulo: 'Golpes obrigatórios', grupos: [
      { titulo: 'Técnicas de mão', itens: ['Jab', 'Direto', 'Cruzado', 'Gancho'] },
      { titulo: 'Técnicas de perna', itens: ['Pando', 'Pando tchagui', 'Irokiko', 'Aptchagui', 'Yoptchagui', 'Ampantã', 'Yopantã', 'Aparolegui', 'Tora Yoptchagui', 'Tora Yopantã', 'Tora Tolho'] },
    ] },
  ],
}, {
  id: 'vermelha-ponta-azul-clara', nome: 'Vermelha com ponta azul clara', cores: ['#b72b27', '#63bce1'],
  secoes: [
    { titulo: 'Conhecimento teórico', grupos: [{ itens: ['Saber recitar 7 mandamentos do Muay Thai.'] }] },
    { titulo: 'Avaliação física', grupos: [{ itens: ['40 flexões de braço.', '80 abdominais curtos.', '40 abdominais longos.', '20 sugados (burpees).'] }] },
    { titulo: 'Avaliação técnica', grupos: [{ itens: ['2 minutos de sequência livre.', '2 minutos de sombra (Shadow Boxing).'] }] },
    { titulo: 'Golpes obrigatórios', grupos: [
      { titulo: 'Técnicas de mão', itens: ['Jab', 'Direto', 'Cruzado', 'Gancho'] },
      { titulo: 'Técnicas de perna', itens: ['Pando', 'Pando tchagui', 'Irokiko', 'Aptchagui', 'Yoptchagui', 'Ampantã', 'Yopantã', 'Aparolegui', 'Tora Yoptchagui', 'Tora Yopantã', 'Tora Tolho', 'Idan Tora Yoptchagui', 'Idan Tora Yopantã', 'Idan Tora Tolho'] },
    ] },
  ],
}, {
  id: 'azul-clara', nome: 'Azul clara', cores: ['#63bce1'],
  secoes: [
    { titulo: 'Conhecimento teórico', grupos: [{ itens: ['Saber recitar 8 mandamentos do Muay Thai.', 'Como era conhecido o Muay Thai em sua origem?', 'Quais são os nomes populares pelos quais o Muay Thai é conhecido?'] }] },
    { titulo: 'Avaliação física', grupos: [{ itens: ['50 flexões de braço.', '100 abdominais curtos.', '50 abdominais longos.', '20 sugados (burpees).'] }] },
    { titulo: 'Avaliação técnica', grupos: [{ itens: ['2 minutos de sequência livre.', '2 minutos de sombra (Shadow Boxing).'] }] },
    { titulo: 'Golpes obrigatórios', grupos: [
      { titulo: 'Técnicas de mão', itens: ['Jab', 'Direto', 'Cruzado', 'Gancho', '2 técnicas de cotovelo'] },
      { titulo: 'Técnicas de perna', itens: ['Pando', 'Pando tchagui', 'Irokiko', 'Aptchagui', 'Yoptchagui', 'Ampantã', 'Yopantã', 'Aparolegui', 'Tora Yoptchagui', 'Tora Yopantã', 'Tora Tolho', 'Idan Tora Yoptchagui', 'Idan Tora Yopantã', 'Idan Tora Tolho', 'Rejane Tora Yoptchagui', 'Rejane Tora Yopantã', 'Rejane Tora Tolho', '2 técnicas de joelhada', '1 técnica de defesa contra chute circular'] },
    ] },
  ],
}, {
  id: 'azul-clara-ponta-azul-escura', nome: 'Azul clara com ponta azul escura', cores: ['#63bce1', '#254789'],
  secoes: [
    { titulo: 'Conhecimento teórico', grupos: [{ itens: ['Saber recitar 9 mandamentos do Muay Thai.', 'Como era conhecido o Muay Thai em sua origem?', 'Quais são os nomes populares pelos quais o Muay Thai é conhecido?', 'O que significa Muay Thai?', 'O que significa Nak Muay?'] }] },
    { titulo: 'Avaliação física', grupos: [{ itens: ['60 flexões de braço.', '120 abdominais curtos.', '60 abdominais longos.', '20 sugados (burpees).'] }] },
    { titulo: 'Avaliação técnica', grupos: [{ itens: ['2 minutos de sequência livre.', '2 minutos de sombra (Shadow Boxing).'] }] },
    { titulo: 'Golpes obrigatórios', grupos: [
      { titulo: 'Técnicas de mão', itens: ['Jab', 'Direto', 'Cruzado', 'Gancho', '3 técnicas de cotovelo'] },
      { titulo: 'Técnicas de perna', itens: ['Pando', 'Pando tchagui', 'Irokiko', 'Aptchagui', 'Yoptchagui', 'Ampantã', 'Yopantã', 'Aparolegui', 'Tora Yoptchagui', 'Tora Yopantã', 'Tora Tolho', 'Idan Tora Yoptchagui', 'Idan Tora Yopantã', 'Idan Tora Tolho', 'Rejane Tora Yoptchagui', 'Rejane Tora Yopantã', 'Rejane Tora Tolho', 'Jajari Aptchagui', 'Jajari Yoptchagui', 'Jajari Yopantã', 'Jajari Tchagui', '3 técnicas de joelhada'] },
    ] },
    { titulo: 'Técnicas de defesa', grupos: [{ itens: ['1 técnica de defesa contra chute circular.', '1 técnica de defesa contra chute reto (frontal).'] }] },
  ],
}, {
  id: 'azul-escura', nome: 'Azul escura', cores: ['#254789'], subtitulo: '1º grau de instrução • Instrutor auxiliar',
  secoes: [
    { titulo: 'Conhecimento teórico', grupos: [{ itens: ['Saber recitar 10 mandamentos do Muay Thai.', 'Como era conhecido o Muay Thai em sua origem?', 'Quais são os nomes populares pelos quais o Muay Thai é conhecido?', 'O que significa Muay Thai?', 'Explique: o que significa Nak Muay?', 'O que o Nak Muay deve dominar?'] }] },
    { titulo: 'Avaliação física', grupos: [{ itens: ['80 flexões de braço.', '160 abdominais curtos.', '80 abdominais longos.', '30 sugados (burpees).'] }] },
    { titulo: 'Avaliação técnica', grupos: [{ itens: ['3 minutos de sequência livre.', '3 minutos de sombra (Shadow Boxing).', 'Identificar verbalmente e executar corretamente todos os socos e chutes obrigatórios listados abaixo.'] }] },
    { titulo: 'Golpes obrigatórios', grupos: [
      { titulo: 'Técnicas de mão', itens: ['Jab', 'Direto', 'Cruzado', 'Gancho', '4 técnicas de cotovelo'] },
      { titulo: 'Técnicas de perna', itens: ['Pando', 'Pando tchagui', 'Irokiko', 'Aptchagui', 'Yoptchagui', 'Ampantã', 'Yopantã', 'Aparolegui', 'Tora Yoptchagui', 'Tora Yopantã', 'Tora Tolho', 'Idan Tora Yoptchagui', 'Idan Tora Yopantã', 'Idan Tora Tolho', 'Idan Pando', 'Rejane Tora Yoptchagui', 'Rejane Tora Yopantã', 'Rejane Tora Tolho', 'Jajari Aptchagui', 'Jajari Yoptchagui', 'Jajari Yopantã', 'Jajari Tchagui', 'Tubal Pando', 'Tubal Aptchagui', 'Tubal Apantã'] },
      { titulo: 'Joelhadas e defesas', itens: ['4 técnicas de joelhada.', '2 técnicas de defesa contra chute reto (frontal).', '2 técnicas de defesa contra chute circular.'] },
    ] },
    { titulo: 'Sparring e absorção', grupos: [{ itens: ['3 rounds obrigatórios de sparring.', '1 round obrigatório de absorção.'] }] },
  ],
}, {
  id: 'azul-escura-ponta-preta', nome: 'Azul escura com ponta preta', cores: ['#254789', '#252525'],
  secoes: [
    { titulo: 'Conhecimento teórico', grupos: [{ itens: ['Saber recitar 11 mandamentos do Muay Thai.', 'Como era conhecido o Muay Thai em sua origem?', 'Quais são os nomes populares pelos quais o Muay Thai é conhecido?', 'O que significa Muay Thai?', 'Explique: o que significa Nak Muay?', 'O que o Nak Muay deve dominar?'] }] },
    { titulo: 'Avaliação física', grupos: [{ itens: ['100 flexões de braço.', '200 abdominais curtos.', '100 abdominais longos.', '30 sugados (burpees).'] }] },
    { titulo: 'Avaliação técnica', grupos: [{ itens: ['3 minutos de sequência livre.', '3 minutos de sombra (Shadow Boxing).', 'Identificar verbalmente e executar corretamente todos os socos e chutes obrigatórios listados abaixo.'] }] },
    { titulo: 'Golpes obrigatórios', grupos: [
      { titulo: 'Técnicas de mão', itens: ['Jab', 'Direto', 'Cruzado', 'Gancho', '5 técnicas de cotovelo'] },
      { titulo: 'Técnicas de perna', itens: ['Pando', 'Pando tchagui', 'Irokiko', 'Aptchagui', 'Yoptchagui', 'Ampantã', 'Yopantã', 'Aparolegui', 'Tora Yoptchagui', 'Tora Yopantã', 'Tora Tolho', 'Idan Tora Yoptchagui', 'Idan Tora Yopantã', 'Idan Tora Tolho', 'Idan Pando', 'Rejane Tora Yoptchagui', 'Rejane Tora Yopantã', 'Rejane Tora Tolho', 'Jajari Aptchagui', 'Jajari Yoptchagui', 'Jajari Yopantã', 'Jajari Tchagui', 'Tubal Pando', 'Tubal Aptchagui', 'Tubal Apantã', 'Murokopã'] },
      { titulo: 'Joelhadas, defesas e quedas', itens: ['5 técnicas de joelhada.', '2 técnicas de defesa contra chute reto (frontal).', '2 técnicas de defesa contra chute circular.', '1 técnica de queda iniciada de chute circular.', '1 técnica de queda iniciada de chute reto (frontal).'] },
    ] },
    { titulo: 'Sparring e absorção', grupos: [{ itens: ['3 rounds obrigatórios de sparring.', '2 rounds obrigatórios de absorção.'] }] },
  ],
}, {
  id: 'preta', nome: 'Preta', cores: ['#252525'],
  secoes: [
    { titulo: 'Conhecimento teórico', grupos: [{ itens: ['Saber recitar 12 mandamentos do Muay Thai.', 'Como era conhecido o Muay Thai em sua origem?', 'Quais são os nomes populares pelos quais o Muay Thai é conhecido?', 'O que significa Muay Thai?', 'Explique: o que significa Nak Muay?', 'O que o Nak Muay deve dominar?', 'Em que ano o Muay Thai chegou ao Brasil?', 'Quem trouxe e implantou o Muay Thai no Brasil?', 'O candidato poderá responder a outras questões apresentadas no momento do exame.'] }] },
    { titulo: 'Avaliação física', grupos: [{ itens: ['120 flexões de braço.', '240 abdominais curtos.', '120 abdominais longos.', '40 sugados (burpees).'] }] },
    { titulo: 'Avaliação técnica', grupos: [{ itens: ['4 minutos de sequência livre.', '4 minutos de sombra (Shadow Boxing).', 'Identificar verbalmente e executar corretamente todos os socos e chutes obrigatórios listados abaixo.'] }] },
    { titulo: 'Golpes obrigatórios', grupos: [
      { titulo: 'Técnicas de mão', itens: ['Jab', 'Direto', 'Cruzado', 'Gancho', '5 técnicas de cotovelo'] },
      { titulo: 'Técnicas de perna', itens: ['Pando', 'Pando tchagui', 'Irokiko', 'Aptchagui', 'Yoptchagui', 'Ampantã', 'Yopantã', 'Aparolegui', 'Tora Yoptchagui', 'Tora Yopantã', 'Tora Tolho', 'Idan Tora Yoptchagui', 'Idan Tora Yopantã', 'Idan Tora Tolho', 'Idan Pando', 'Rejane Tora Yoptchagui', 'Rejane Tora Yopantã', 'Rejane Tora Tolho', 'Jajari Aptchagui', 'Jajari Yoptchagui', 'Jajari Yopantã', 'Jajari Tchagui', 'Tubal Pando', 'Tubal Aptchagui', 'Tubal Apantã', 'Murokopã', 'Sambal Tchagui'] },
      { titulo: 'Joelhadas, defesas e quedas', itens: ['5 técnicas de joelhada.', '2 técnicas de defesa contra chute reto (frontal).', '2 técnicas de defesa contra chute circular.', '4 técnicas de queda, incluindo quedas iniciadas de chute circular e de chute reto (frontal).', 'Técnica de clinch.'] },
    ] },
    { titulo: 'Sparring e absorção', grupos: [{ itens: ['3 rounds obrigatórios de sparring.', '3 rounds obrigatórios de absorção.'] }] },
  ],
}];

export function RequisitosGraduacao() {
  return <div className="req-page">
    <header className="req-header"><a className="req-brand" href="/"><NakLogo size={44} title="NAK Entre Rios"/><span><b>NAK</b> ENTRE RIOS</span></a><a className="req-back" href="/#historiaMuayThai">← Voltar ao site</a></header>
    <main className="req-main">
      <div className="req-intro"><p className="req-eyebrow">MUAY THAI · CAMINHO NAK</p><h1>Seu próximo passo.<br/><span>Uma nova conquista.</span></h1><p>Requisitos dos exames de graduação. Conheça o que praticar e prepare-se com a orientação do professor.</p></div>
      {exames.map(exame => <article className="req-exame" id={exame.id} key={exame.id} aria-labelledby={`${exame.id}-titulo`}>
        <aside className="req-rank"><p className="req-eyebrow">EXAME DE GRADUAÇÃO</p><Prajied colors={exame.cores} label={exame.nome}/><span className="req-rank-label">PRAJIED</span><h2 id={`${exame.id}-titulo`}>{exame.nome}</h2>{exame.subtitulo && <p className="req-subtitulo">{exame.subtitulo}</p>}<p>Disciplina em cada treino.<br/>Evolução em cada etapa.</p><div className="req-rank-line"/></aside>
        <div className="req-sections">{exame.secoes.map((secao, i) => <section className="req-card" key={secao.titulo}><div className="req-card-heading"><span>{String(i + 1).padStart(2, '0')}</span><h3>{secao.titulo}</h3></div><div className={secao.grupos.length > 1 ? 'req-groups' : ''}>{secao.grupos.map((grupo, j) => <div key={j}>{'titulo' in grupo && <h4>{grupo.titulo}</h4>}<ul>{grupo.itens.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div></section>)}</div>
      </article>)}
    </main><footer className="req-footer">NAK Entre Rios – Muay Thai</footer>
  </div>;
}
