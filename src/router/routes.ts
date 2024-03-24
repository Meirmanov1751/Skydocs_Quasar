import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'home', component: () => import('pages/HomePage.vue') },
      { path: 'corrin', component: () => import('pages/Corr/Corrin/CorrinPage.vue') },
      { path: 'corrout', component: () => import('pages/Corr/Corrout/CorroutPage.vue') },
      { path: 'desktop', component: () => import('pages/DesktopPage.vue') },
      { path: 'ao-ktk-struct', component: () => import('pages/AOKTKPage.vue') },
      { path: 'dp', component: () => import('pages/DPPage.vue') },
      { path: 'fin-oco', component: () => import('pages/FinOCOPage.vue') },
      { path: 'profile', component: () => import('pages/ProfilePage.vue') },
      { path: 'sidebar-mail', component: () => import('pages/MailPage.vue') },
      { path: 'sidebar-calendar', component: () => import('pages/CalendarPage.vue') },
      { path: 'sidebar-calc', component: () => import('pages/CalcPage.vue') },
      { path: 'sad-inst', component: () => import('pages/SADInstPage.vue') },
      { path: 'spec-plugins', component: () => import('pages/SpecPluginsPage.vue') },
      { path: 'charts', component: () => import('pages/ChartsPage.vue') },
      { path: 'tables', component: () => import('pages/TablesPage.vue') },
      { path: 'ui-elems', component: () => import('pages/UIElemsPage.vue') },
      { path: 'forms', component: () => import('pages/FormsPage.vue') },
      { path: 'params', component: () => import('pages/ParamsPage.vue') },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
