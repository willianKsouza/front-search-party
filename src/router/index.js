import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateAccount from '@/views/CreateAccount.vue'
import Login from '@/views/Login.vue'
import AccountView from '@/views/UserActivation/AccountView.vue'
import { useStore } from '@/stores/store'
import MyProfile from '@/views/MyProfile.vue'
import { fetchUserProfile } from '@/functions/UseFetchProfile'

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
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/ForgotPassword.vue'),
    },
    {
      path: '/change-password/:id',
      name: 'change-password',
      component: () => import('../views/ChangePassword.vue'),
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
      component: MyProfile,
    },
    {
      path: '/posts',
      name: 'posts',
      meta: { requiresAuth: true },
      component: () => import('../views/MyPosts.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const store = useStore()
 await fetchUserProfile()
 console.log(store.profile);

  if (to.meta.requiresAuth) {
    if (!store.checkAuthentication()) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});




export default router
