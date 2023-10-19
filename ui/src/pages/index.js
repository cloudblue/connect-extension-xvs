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
import createApp from '@cloudblueconnect/connect-ui-toolkit';

import routes from '@/routes';
import '@/styles/app.styl';
import '../../styles/index.css';


Vue.use(PortalVue);
Vue.use(VueRouter);

createApp().then(toolkit => {
  const router = new VueRouter({
    mode: 'hash',
    routes,
  });

  router.afterEach(() => {
    document.documentElement.scrollIntoView();
  });

  Vue.filter('utcToLocal', utcToLocal);

  const app = new Vue({
    render: h => h(App, {
      props: { toolkit },
    }),

    router,
  });

  app.$mount('#app');
});
