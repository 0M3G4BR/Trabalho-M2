<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { buscarCampanha } from '../services/api.js'

const route = useRoute()

const campanha = ref(null)
const carregando = ref(true)
const erro = ref('')

onMounted(async () => {
  try {
    // route.params.id é o ":id" da rota /campanha/:id (na URL /campanha/2, vale "2")
    campanha.value = await buscarCampanha(route.params.id)
  } catch (e) {
    // se o id não existir, a API responde 404 e a mensagem vem para cá
    erro.value = e.message
  }
  carregando.value = false
})
</script>

<template>
  <div>
    <router-link to="/">&larr; Voltar</router-link>

    <p v-if="carregando">Carregando...</p>
    <p v-else-if="erro" class="erro">{{ erro }}</p>

    <div v-else>
      <h2>{{ campanha.titulo }}</h2>
      <p>{{ campanha.descricao }}</p>

      <progress :value="campanha.arrecadado" :max="campanha.meta"></progress>
      <p>Meta: {{ campanha.meta }} {{ campanha.unidade }}</p>
      <p>Arrecadado: {{ campanha.arrecadado }} {{ campanha.unidade }}</p>
      <p>Vagas de voluntário: {{ campanha.vagasVoluntarios }}</p>
      <p>Status: {{ campanha.status }}</p>

      <!-- Vai para /doar?campanha=2, e o formulário já abre com essa campanha escolhida -->
      <router-link v-if="campanha.status === 'ativa'" :to="'/doar?campanha=' + campanha.id" class="botao">
        Quero doar
      </router-link>
      <p v-else>Esta campanha já atingiu a meta. Obrigado a todos que ajudaram!</p>
    </div>
  </div>
</template>
