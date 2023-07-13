/*
Copyright (c) 2023, Ingram Micro
All rights reserved.
*/
import Vue from 'vue';
import VueRouter from 'vue-router';
import PortalVue from 'portal-vue';

import App from './App.vue';
import {
  utcToLocal,
} from '../tools/filters/utcToLocal';
import createApp, {
  Card,
  Pad,
  Tab,
  Tabs,
} from '@cloudblueconnect/connect-ui-toolkit';

import routes from '@/routes';
import '@/styles/app.styl';
import '../../styles/index.css';


Vue.use(PortalVue);
Vue.use(VueRouter);

createApp({
  'main-card': Card,
  'ui-tab': Tab,
  'ui-tabs': Tabs,
  'ui-pad': Pad,
});

const router = new VueRouter({
  mode: 'hash',
  routes,
});

Vue.filter('utcToLocal', utcToLocal);

const app = new Vue({
  render: h => h(App),
  router,
});

app.$mount('#app');
