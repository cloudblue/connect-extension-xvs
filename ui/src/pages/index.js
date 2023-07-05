/*
Copyright (c) 2023, Ingram Micro
All rights reserved.
*/
import Vue from 'vue';
import App from './App.vue';
import createApp, {
  Card,
} from '@cloudblueconnect/connect-ui-toolkit';
import {
  index,
} from '../pages';
import '@fontsource/roboto/500.css';
import '../../styles/index.css';


createApp({ 'main-card': Card })
  .then(() => { index(); });


const app = new Vue({
  render: h => h(App),
});

app.$mount('#app');
