import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import VideoPage from '../views/VideoPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/video/:youtubeId',
    name: 'VideoPage',
    component: VideoPage,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
