import Dashboard from '@/pages/Dashboard.vue';


export default [
  {
    path: '/',
    redirect: { name: 'Dashboard', params: { tab: 'deployments' } },
  },
  {
    name: 'Dashboard',
    path: '/dashboard/:tab(deployments|requests)?',
    component: Dashboard,
  },
  {
    name: 'DeploymentDetails',
    path: '/deployments/:id/:tab(marketplaces|ppr|configuration|requests)?',
    component: () => import(/* webpackChunkName: "deployment-details" */ '@/pages/DeploymentDetails.vue'),
  },
  {
    name: 'RequestDetails',
    path: '/requests/:id/:tab(marketplaces|tasks)?',
    component: () => import(/* webpackChunkName: "request-details" */ '@/pages/RequestDetails.vue'),
  },
];
