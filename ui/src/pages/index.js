/*
Copyright (c) 2023, Ingram Micro
All rights reserved.
*/
import Vue from 'vue';
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

import {
  index,
} from '../pages';

import '@/styles/app.styl';
import '../../styles/index.css';


Vue.use(PortalVue);

createApp({
  'main-card': Card,
  'ui-tab': Tab,
  'ui-tabs': Tabs,
  'ui-pad': Pad,
}).then(() => { index(); });

Vue.use(PortalVue);
Vue.filter('utcToLocal', utcToLocal);

const app = new Vue({
  render: h => h(App),
});

app.$mount('#app');
