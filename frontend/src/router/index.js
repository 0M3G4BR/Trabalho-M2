import { createRouter, createWebHistory } from 'vue-router'
import CampanhasView from '../views/CampanhasView.vue'
import CampanhaDetalheView from '../views/CampanhaDetalheView.vue'
import DoarView from '../views/DoarView.vue'
import NaoEncontradoView from '../views/NaoEncontradoView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: CampanhasView }, // Tela 1
    { path: '/campanha/:id', component: CampanhaDetalheView }, // Tela 2 (":id" é o parâmetro dinâmico)
    { path: '/doar', component: DoarView }, // Tela 3
    { path: '/:pathMatch(.*)*', component: NaoEncontradoView }, // qualquer outro endereço
  ],
})

export default router
