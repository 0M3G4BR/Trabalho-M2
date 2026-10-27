<script setup>
// "campanha" chega de fora, vindo da tela que usa este componente
defineProps({ campanha: Object })
</script>

<template>
  <div class="cartao">
    <h2>{{ campanha.titulo }}</h2>
    <p>{{ campanha.descricao }}</p>

    <progress :value="campanha.arrecadado" :max="campanha.meta"></progress>
    <p>{{ campanha.arrecadado }} de {{ campanha.meta }} {{ campanha.unidade }}</p>

    <p>Vagas de voluntário: {{ campanha.vagasVoluntarios }}</p>
    <p>Status: {{ campanha.status }}</p>

    <!-- O id da campanha vai na URL: /campanha/2 -->
    <router-link :to="'/campanha/' + campanha.id">Ver detalhes</router-link>
  </div>
</template>
