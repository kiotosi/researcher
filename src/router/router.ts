import HomeView from '../views/HomeView.vue';
import InfoView from '../views/InfoView.vue';
import LinkView from '../views/LinkView.vue';
import routeInfo from '../data/router.define';
import { createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: routeInfo.home.path,
    name: routeInfo.home.name,
    component: HomeView,
  },
  {
    path: routeInfo.info.path,
    name: routeInfo.info.name,
    component: InfoView
  },
  {
    path: routeInfo.link.path,
    name: routeInfo.link.name,
    component: LinkView,
  },
];

export default {
  routes,
  history: createWebHistory(),
};
