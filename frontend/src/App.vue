<template>
  <header>
    <h1>Banco de Alimentos - Parque Dom Bosco</h1>
    <nav>
      <router-link to="/">Campanhas</router-link>
      <router-link to="/doar">Doar</router-link>
    </nav>
  </header>

  <main>
    <!-- Aqui aparece a tela da rota atual -->
    <router-view />
  </main>
</template>
