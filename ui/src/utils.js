/*
Copyright (c) 2023, Ingram Micro
All rights reserved.
*/
import rest from '@/tools/rest';


export const getDeployments = ({ hubId, productId } = {}) => {
  const queryParams = new URLSearchParams();

  if (hubId) queryParams.append('hub_id', hubId);
  if (productId) queryParams.append('product_id', productId);

  return rest.get(`/api/deployments?${queryParams.toString()}`);
};

export const getDeployment = (id) => rest.get(`/api/deployments/${id}`);

export const getDeploymentConfigurations = (id) => rest.get(`/api/deployments/${id}/configurations`);

export const createDeploymentConfigurations = (id, data) => rest.post(`/api/deployments/${id}/configurations`, data);

export const getPPRs = (id) => rest.get(`/api/deployments/${id}/pprs`);

export const getPPR = (deploymentId, id) => rest.get(`/api/deployments/${deploymentId}/pprs/${id}`);

export const regeneratePPR = id => rest.post(`/api/deployments/${id}/pprs`, {});

export const deleteDeploymentConfiguration = (deploymentId, configurationId) => rest.delete(`/api/deployments/${deploymentId}/configurations/${configurationId}`);

export const getDeploymentsRequests = () => rest.get('/api/deployments/requests');

export const getDeploymentsRequest = (id) => rest.get(`/api/deployments/requests/${id}`);

export const uploadPPR = (deploymentId, {
  id,
  location,
  size,
  name,
  mimeType,
  description,
}) => rest.post(`/api/deployments/${deploymentId}/pprs`, {
  file: {
    id,
    location,
    size,
    name,
    mime_type: mimeType,
  },
  description,
});

export const getProducts = () => rest.get('/api/products');

export const getProductHubs = (productId) => rest.get(`/api/products/${productId}/hubs`);

export const getDeploymentMarketplaces = (deploymentId) => rest.get(`/api/deployments/${deploymentId}/marketplaces`);

export const getDeploymentRequestMarketplaces = (requestId) => rest.get(`/api/deployments/requests/${requestId}/marketplaces`);

export const getDeploymentRequestTasks = (requestId) => rest.get(`/api/deployments/requests/${requestId}/tasks`);

export const createDeploymentRequest = (body) => rest.post('/api/deployments/requests', body);
