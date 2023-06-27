/*
Copyright (c) 2023, Ingram Micro
All rights reserved.
*/
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
