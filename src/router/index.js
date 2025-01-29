import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateAccount from '@/views/CreateAccount.vue'
import Login from '@/views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: CreateAccount,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { requiresAuth: true },
      component: () => import('../views/MyProfile.vue'),
    },
    {
      path: '/posts',
      name: 'posts',
      meta: { requiresAuth: true },
      component: () => import('../views/MyPosts.vue'),
    },
  ],
})




// router.beforeEach((to, from, next) => {

//   if (to.meta.requiresAuth) {
//     const isAuthenticated = checkIfUserIsLoggedIn(); // Implemente essa função
//     if (!isAuthenticated) {
//       next({ name: 'login' });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

// function checkIfUserIsLoggedIn() {
//   return !!localStorage.getItem('authToken');
// }

export default router
