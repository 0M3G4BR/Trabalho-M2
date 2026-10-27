import { Router } from 'express'
import { campanhas } from '../data/dados.js'

const router = Router()

// GET /api/campanhas -> lista todas as campanhas
router.get('/', (req, res) => {
  res.json(campanhas)
})

// GET /api/campanhas/:id -> uma campanha, ou erro 404 se não existir
router.get('/:id', (req, res) => {
  const id = Number(req.params.id) // o id da URL chega como texto
  const campanha = campanhas.find((c) => c.id === id)

  if (!campanha) {
    return res.status(404).json({ erro: 'Campanha não encontrada' })
  }

  res.json(campanha)
})

export default router
