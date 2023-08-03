/*
Copyright (c) 2023, Ingram Micro
All rights reserved.
*/
import Vue from 'vue';
import PortalVue from 'portal-vue';

import createApp, {
  Card,
} from '@cloudblueconnect/connect-ui-toolkit';


import '@/styles/app.styl';
import '../../styles/index.css';


Vue.use(PortalVue);

createApp({ 'settings-card': Card });
