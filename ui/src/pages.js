/*
Copyright (c) 2023, Ingram Micro
All rights reserved.
*/
import {
  getMarketplaces,
  getSettings,
  processCheckboxes,
  processMarketplaces,
  processSelectedMarketplaces,
  updateSettings,
} from './utils';
import {
  addEventListener,
  disableButton,
  enableButton,
  hideComponent,
  prepareMarketplacesWithSwitch,
  renderMarketplaces,
  showComponent,
} from './components';


export const saveSettingsData = async (app) => {
  if (!app) return;
  disableButton('save', 'Saving...');
  try {
    const allMarketplaces = await getMarketplaces();
    const checkboxes = processCheckboxes(document.getElementsByTagName('input'));
    const marketplaces = processSelectedMarketplaces(allMarketplaces, checkboxes);
    await updateSettings({ marketplaces });
    app.emit('snackbar:message', 'Settings saved');
  } catch (error) {
    app.emit('snackbar:error', error);
  }
  enableButton('save', 'Save');
};

export const index = () => {
  hideComponent('app');
  showComponent('loader');

  hideComponent('loader');
  showComponent('app');
};

export const settings = async (app) => {
  if (!app) return;
  showComponent('loader');
  hideComponent('app');
  hideComponent('error');
  try {
    const allMarketplaces = await getMarketplaces();
    const { marketplaces: selectedMarketpaces } = await getSettings();
    const preparedMarketplaces = processMarketplaces(allMarketplaces, selectedMarketpaces);
    const marketplaces = prepareMarketplacesWithSwitch(preparedMarketplaces);
    renderMarketplaces(marketplaces);
    enableButton('save', 'Save');
    addEventListener('save', 'click', saveSettingsData.bind(null, app));
    showComponent('app');
  } catch (error) {
    app.emit('snackbar:error', error);
    showComponent('error');
  }
  hideComponent('loader');
};
