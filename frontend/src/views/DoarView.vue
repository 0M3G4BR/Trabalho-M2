<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { listarCampanhas, registrarDoacao } from '../services/api.js'

const route = useRoute()
const router = useRouter()

// Campos do formulário (v-model liga cada campo a uma destas variáveis)
const campanhaId = ref('')
const nomeDoador = ref('')
const email = ref('')
const quantidade = ref('')

const campanhas = ref([])
const erro = ref('')
const sucesso = ref('')
const enviando = ref(false)

onMounted(async () => {
  try {
    const lista = await listarCampanhas()
    // só campanhas ativas aceitam doação
    campanhas.value = lista.filter((c) => c.status === 'ativa')
    // se a URL for /doar?campanha=2, a campanha 2 já vem escolhida
    campanhaId.value = Number(route.query.campanha) || ''
  } catch (e) {
    erro.value = e.message
  }
})

// Validação básica: devolve a mensagem do primeiro problema, ou '' se estiver tudo certo
function validar() {
  if (campanhaId.value === '') return 'Escolha uma campanha.'
  if (nomeDoador.value.trim().length < 3) return 'O nome deve ter pelo menos 3 letras.'
  if (!email.value.includes('@')) return 'Digite um e-mail válido.'
  if (quantidade.value === '' || quantidade.value <= 0) return 'A quantidade deve ser maior que zero.'
  return ''
}

async function enviar() {
  erro.value = validar()
  if (erro.value) return

  enviando.value = true
  try {
    const doacao = await registrarDoacao({
      campanhaId: campanhaId.value,
      nomeDoador: nomeDoador.value.trim(),
      email: email.value.trim(),
      quantidade: quantidade.value,
    })
    sucesso.value = 'Doação registrada! Obrigado por ajudar.'
    // depois de 1,5 segundo, volta para os detalhes da campanha
    setTimeout(() => router.push('/campanha/' + doacao.campanhaId), 1500)
  } catch (e) {
    erro.value = e.message
    enviando.value = false
  }
}
</script>

<template>
  <div>
    <h2>Registrar doação</h2>

    <form @submit.prevent="enviar" novalidate>
      <label>
        Campanha *
        <select v-model.number="campanhaId">
          <option value="" disabled>Selecione uma campanha</option>
          <option v-for="campanha in campanhas" :key="campanha.id" :value="campanha.id">
            {{ campanha.titulo }}
          </option>
        </select>
      </label>

      <label>
        Seu nome *
        <input v-model="nomeDoador" type="text" />
      </label>

      <label>
        E-mail *
        <input v-model="email" type="email" />
      </label>

      <label>
        Quantidade *
        <input v-model.number="quantidade" type="number" min="0" step="any" />
      </label>

      <p v-if="erro" class="erro">{{ erro }}</p>
      <p v-if="sucesso" class="sucesso">{{ sucesso }}</p>

      <button type="submit" :disabled="enviando">
        {{ enviando ? 'Enviando...' : 'Enviar doação' }}
      </button>
      <router-link to="/">Cancelar</router-link>
    </form>
  </div>
</template>
