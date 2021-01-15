import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import(/* webpackChunkName: "Register" */ '../views/Register.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '../views/Login.vue'),
  },
  {
    path: '/category',
    name: 'Category',
    component: () =>
      import(/* webpackChunkName: "Category" */ '../views/Category.vue'),
  },
  {
    path: '/product',
    name: 'Product',
    component: () =>
      import(/* webpackChunkName: "Product" */ '../views/Product.vue'),
  },
  {
    path: '/role',
    name: 'Role',
    component: () => import(/* webpackChunkName: "Role" */ '../views/Role.vue'),
  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "User" */ '../views/User.vue'),
  },
  {
    path: '/403',
    name: 'ErrorPage',
    component: () => import(/* webpackChunkName: "User" */ '../views/403.vue'),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const token = Vue.cookies.get('token');
  if (to.name !== 'Login' && to.name !== 'Register' && !token)
    next({ name: 'Login' });
  else next();
});

export default router;
