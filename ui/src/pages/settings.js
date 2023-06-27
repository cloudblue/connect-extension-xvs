/*
Copyright (c) 2023, Ingram Micro
All rights reserved.
*/
import createApp, {
  Card,
} from '@cloudblueconnect/connect-ui-toolkit';
import {
  settings,
} from '../pages';
import '@fontsource/roboto/500.css';
import '../../styles/index.css';


createApp({ 'settings-card': Card })
  .then(settings);
