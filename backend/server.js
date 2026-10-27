import express from 'express'
import cors from 'cors'
import campanhasRouter from './routes/campanhas.js'
import doacoesRouter from './routes/doacoes.js'

const app = express()

app.use(cors()) // permite que o frontend (outra porta) acesse esta API
app.use(express.json()) // transforma o JSON recebido em req.body

app.use('/api/campanhas', campanhasRouter)
app.use('/api/doacoes', doacoesRouter)

app.listen(3000, () => {
  console.log('API rodando em http://localhost:3000')
})
