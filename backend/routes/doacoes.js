import { Router } from 'express'
import { campanhas, doacoes } from '../data/dados.js'

const router = Router()

// POST /api/doacoes -> registra uma nova doação
router.post('/', (req, res) => {
  const { campanhaId, nomeDoador, email, quantidade } = req.body || {}

  // 1) Validar os dados recebidos -> 400
  const erros = []
  if (!campanhaId) {
    erros.push('campanhaId é obrigatório')
  }
  if (typeof nomeDoador !== 'string' || nomeDoador.trim().length < 3) {
    erros.push('nomeDoador é obrigatório (mínimo 3 letras)')
  }
  if (typeof email !== 'string' || !email.includes('@')) {
    erros.push('email inválido')
  }
  if (typeof quantidade !== 'number' || quantidade <= 0) {
    erros.push('quantidade deve ser maior que zero')
  }
  if (erros.length > 0) {
    return res.status(400).json({ erro: 'Dados inválidos', detalhes: erros })
  }

  // 2) A campanha existe? -> 404
  const campanha = campanhas.find((c) => c.id === campanhaId)
  if (!campanha) {
    return res.status(404).json({ erro: 'Campanha não encontrada' })
  }

  // 3) A campanha ainda aceita doações? -> 400
  if (campanha.status !== 'ativa') {
    return res.status(400).json({ erro: 'Esta campanha já atingiu a meta e não aceita novas doações' })
  }

  // Tudo certo: cria a doação
  const novaDoacao = {
    id: doacoes.length + 1,
    campanhaId,
    nomeDoador: nomeDoador.trim(),
    email: email.trim(),
    quantidade,
    data: new Date().toISOString().slice(0, 10), // AAAA-MM-DD
  }
  doacoes.push(novaDoacao)

  // Soma na campanha e encerra se chegou na meta
  campanha.arrecadado += quantidade
  if (campanha.arrecadado >= campanha.meta) {
    campanha.status = 'concluida'
  }

  res.status(201).json(novaDoacao) // 201 = criado
})

export default router
