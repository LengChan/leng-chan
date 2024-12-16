import Home from '../components/Home.vue'
import Music from '../components/Music.vue'
import About from '../components/About.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { 
    path: '/', 
    component: Home,
  },
  { path: '/about', name: 'About', component: About},
  { path: '/music', name: 'Music', component: Music},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;