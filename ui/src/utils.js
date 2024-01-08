/*
Copyright (c) 2023, Ingram Micro
All rights reserved.
*/
import rest from '@/tools/rest';

import {
  curry,
  either,
  length,
  pipe,
  prop,
} from 'ramda';

import {
  enrich,
  template,
} from '~utils';


export const getIntIndex = index => pipe(prop(index), parseInt);

export const getHeader = curry((name, headers) => headers?.get(name));

export const getContentRange = curry((directiv, str) => {
  const directives = {
    start: 2,
    end: 3,
    size: 4,
  };
  const pattern = /(\w+) (\d+)-(\d+)\/(\d+)/g;

  return getIntIndex(directives[directiv])(pattern.exec(str));
});

export const getCollectionAndTotal = template({
  collection: ['body'],
  total: either(
    pipe(prop('headers'), getHeader('content-range'), getContentRange('size')),
    pipe(prop('body'), length),
  ),
});

const fullResponseGet = async url => {
  const response = await rest.get(url, true);

  return getCollectionAndTotal(response);
};

const prepareUrl = (baseUrl, params) => {
  const processedParams = new URLSearchParams(params).toString();

  return `${baseUrl}?${processedParams}`;
};

export const getDeployments = ({ hubId, productId } = {}) => {
  const queryParams = new URLSearchParams();

  if (hubId) queryParams.append('hub_id', hubId);
  if (productId) queryParams.append('product_id', productId);

  return fullResponseGet(`/api/deployments?${queryParams.toString()}`);
};

export const getDeployment = (id) => rest.get(`/api/deployments/${id}`);

export const getDeploymentConfigurations = (id, params) => fullResponseGet(prepareUrl(`/api/deployments/${id}/configurations`, params));

export const createDeploymentConfigurations = (id, data) => rest.post(`/api/deployments/${id}/configurations`, data);

export const getPPRs = (id, params) => fullResponseGet(prepareUrl(`/api/deployments/${id}/pprs`, params));

export const getPPR = (deploymentId, id) => rest.get(`/api/deployments/${deploymentId}/pprs/${id}`);

export const regeneratePPR = id => rest.post(`/api/deployments/${id}/pprs`, {});

export const deleteDeploymentConfiguration = (deploymentId, configurationId) => rest.delete(`/api/deployments/${deploymentId}/configurations/${configurationId}`);

export const getDeploymentsRequests = params => fullResponseGet(prepareUrl('/api/deployments/requests', params));

export const getDeploymentRequests = (deploymentId, params) => fullResponseGet(prepareUrl(`/api/deployments/${deploymentId}/requests`, params));

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



export const getDeploymentBatches = (deploymentId) => rest.get(`/api/deployments/${deploymentId}/pricing/batches`);

export const getDeploymentRequestTasks = (requestId, params) => fullResponseGet(prepareUrl(`/api/deployments/requests/${requestId}/tasks`, params));

export const getDeploymentRequestFailedTasks = (requestId) => rest.get(`/api/deployments/requests/${requestId}/tasks?status=error`);

export const createDeploymentRequest = (body) => rest.post('/api/deployments/requests', body);

export const abortDeploymentRequest = (id) => rest.post(`/api/deployments/requests/${id}/abort`);

export const retryDeploymentRequest = (id) => rest.post(`/api/deployments/requests/${id}/retry`);


const enrichByBatchInfo = enrich('id', ['pricelist', 'id'], 'pricelist');

export const getDeploymentMarketplaces = async (deploymentId, params) => {
  const response = await fullResponseGet(prepareUrl(`/api/deployments/${deploymentId}/marketplaces`, params));
  const batches = await getDeploymentBatches(deploymentId);
  response.collection = enrichByBatchInfo(batches, response.collection);

  return response;
};

export const getDeploymentRequestMarketplaces = async (requestId, deploymentId, params) => {
  const response = await fullResponseGet(prepareUrl(`/api/deployments/requests/${requestId}/marketplaces`, params));
  const batches = await getDeploymentBatches(deploymentId);
  response.collection = enrichByBatchInfo(batches, response.collection);

  return response;
};

