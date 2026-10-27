// "Banco de dados" em memória: dois arrays de objetos.
// Quando o servidor é reiniciado, tudo volta para estes valores iniciais.

export const campanhas = [
  {
    id: 1,
    titulo: 'Cestas básicas de Natal',
    descricao: 'Arrecadação de cestas para famílias do bairro.',
    unidade: 'cestas',
    meta: 50,
    arrecadado: 30,
    vagasVoluntarios: 3,
    status: 'ativa',
  },
  {
    id: 2,
    titulo: 'Arroz e feijão',
    descricao: 'Reposição do estoque de grãos.',
    unidade: 'kg',
    meta: 200,
    arrecadado: 50,
    vagasVoluntarios: 2,
    status: 'ativa',
  },
  {
    id: 3,
    titulo: 'Kits de higiene',
    descricao: 'Sabonete, pasta e escova de dentes.',
    unidade: 'kits',
    meta: 40,
    arrecadado: 40,
    vagasVoluntarios: 0,
    status: 'concluida',
  },
]

export const doacoes = [
  { id: 1, campanhaId: 1, nomeDoador: 'João Pereira', email: 'joao@email.com', quantidade: 20, data: '2026-10-20' },
  { id: 2, campanhaId: 1, nomeDoador: 'Ana Lima', email: 'ana@email.com', quantidade: 10, data: '2026-10-22' },
  { id: 3, campanhaId: 2, nomeDoador: 'Carlos Dias', email: 'carlos@email.com', quantidade: 50, data: '2026-10-23' },
  { id: 4, campanhaId: 3, nomeDoador: 'Marta Reis', email: 'marta@email.com', quantidade: 40, data: '2026-10-24' },
]
