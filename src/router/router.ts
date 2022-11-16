import HomeView from '../views/HomeView.vue';
import LinkView from '../views/LinkView.vue';

import { createWebHistory, RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/link',
    name: 'Link',
    component: LinkView
  }
];

export default {
  routes,
  history: createWebHistory()
}
