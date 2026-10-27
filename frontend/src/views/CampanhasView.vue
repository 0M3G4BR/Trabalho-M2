<script setup>
import { ref, onMounted } from 'vue'
import { listarCampanhas } from '../services/api.js'
import CampanhaCard from '../components/CampanhaCard.vue'

// ref() cria um valor reativo: quando ele muda, a tela atualiza sozinha
const campanhas = ref([])
const carregando = ref(true)
const erro = ref('')

// onMounted roda quando a tela aparece: busca as campanhas na API
onMounted(async () => {
  try {
    campanhas.value = await listarCampanhas()
  } catch (e) {
    erro.value = e.message
  }
  carregando.value = false
})
</script>

<template>
  <div>
    <h2>Campanhas</h2>

    <p v-if="carregando">Carregando...</p>
    <p v-else-if="erro" class="erro">{{ erro }}</p>
    <p v-else-if="campanhas.length === 0">Nenhuma campanha encontrada.</p>

    <div v-else class="lista">
      <CampanhaCard v-for="campanha in campanhas" :key="campanha.id" :campanha="campanha" />
    </div>
  </div>
</template>
