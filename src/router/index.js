import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateAccount from '@/views/CreateAccount.vue'
import Login from '@/views/Login.vue'
import AccountView from '@/views/UserActivation/AccountView.vue'
import { useStore } from '@/stores/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: CreateAccount,
    },
    {
      path: '/activation',
      name: 'activation',
      component: AccountView,
    },
    {
      path:'/:feedback/:id',
      name:'feedback',
      props: true,
      component: () => import('../views/UserActivation/activationFeedback.vue')
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
//     const store = useStore()
//     if (!store.checkAuthentication()) {
//       next({ name: 'login' });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });




export default router
