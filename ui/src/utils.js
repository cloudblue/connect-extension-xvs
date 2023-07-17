
/*
Copyright (c) 2023, Ingram Micro
All rights reserved.
*/
// API calls to the backend
export const getSettings = () => fetch('/api/settings').then((response) => response.json());

export const getChart = () => fetch('/api/chart').then((response) => response.json());

export const getMarketplaces = () => fetch('/api/marketplaces').then((response) => response.json());

export const getDeployments = () => fetch('/api/deployments').then((response) => response.json());

export const getDeployment = (id) => fetch(`/api/deployments/${id}`).then((response) => response.json());

export const updateSettings = (settings) => fetch('/api/settings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(settings),
}).then((response) => response.json());

// data processing
export const processMarketplaces = (
  allMarketplaces,
  selectedMarketplaces,
) => allMarketplaces.map((marketplace) => {
  const checked = !!selectedMarketplaces.find(
    (selectedMarketplace) => selectedMarketplace.id === marketplace.id,
  );

  return { ...marketplace, checked };
});

export const processSelectedMarketplaces = (
  allMarketplaces,
  checkboxes,
) => checkboxes.map((checkbox) => allMarketplaces.find(
  (marketplace) => marketplace.id === checkbox.value,
));

export const processCheckboxes = (
  checkboxes,
) => Array.from(checkboxes).filter(checkbox => checkbox.checked);
