/*
Copyright (c) 2023, Ingram Micro
All rights reserved.
*/
import rest from '@/tools/rest';


export const getDeployments = () => rest.get('/api/deployments');

export const getDeployment = (id) => rest.get(`/api/deployments/${id}`);

export const getDeploymentConfigurations = (id) => rest.get(`/api/deployments/${id}/configurations`);

export const createDeploymentConfigurations = (id, data) => rest.post(`/api/deployments/${id}/configurations`, data);

export const getPPRs = (id) => rest.get(`/api/deployments/${id}/pprs`);

export const getPPR = (deploymentId, id) => rest.get(`/api/deployments/${deploymentId}/pprs/${id}`);

export const regeneratePPR = id => rest.post(`/api/deployments/${id}/pprs`, {});

export const deleteDeploymentConfiguration = (deploymentId, configurationId) => rest.delete(`/api/deployments/${deploymentId}/configurations/${configurationId}`);

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
