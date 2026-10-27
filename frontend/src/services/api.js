const API_URL = 'http://localhost:3000/api'

// Faz a requisição e devolve o JSON da resposta.
// Se a API responder com erro (400, 404...), lança um Error com a mensagem dela.
async function pedir(caminho, opcoes) {
  let resposta
  try {
    resposta = await fetch(API_URL + caminho, opcoes)
  } catch {
    throw new Error('Não foi possível conectar ao servidor.')
  }

  const dados = await resposta.json()
  if (!resposta.ok) {
    throw new Error(dados.erro)
  }
  return dados
}

export function listarCampanhas() {
  return pedir('/campanhas')
}

export function buscarCampanha(id) {
  return pedir('/campanhas/' + id)
}

export function registrarDoacao(doacao) {
  return pedir('/doacoes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(doacao),
  })
}
