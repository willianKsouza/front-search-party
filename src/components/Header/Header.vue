<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown" v-if="showMenu">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/posts">My Posts</RouterLink></li>
          <li><RouterLink to="/posts">My Profile</RouterLink></li>
          <li><a>Themes</a></li>
          <li>
            <ul>
              <li><a>light</a></li>
              <li><a>dark</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <a class="btn btn-ghost text-xl"><RouterLink to="/">Search Party</RouterLink></a>
    </div>
    <div class="navbar-center hidden lg:flex" v-if="showMenu">
      <ul class="menu menu-horizontal px-1">
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/posts">My Posts</RouterLink></li>
        <li><RouterLink to="/profile">My Profile</RouterLink></li>
      </ul>
    </div>

    <div class="navbar-end">
      <Logout v-if="showMenu"/> 
      <ThemeController class="mr-10" />
      <div class="avatar" v-if="showMenu">
        <div class="w-12 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import ThemeController from './ThemeController.vue'
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import Logout from './Logout.vue';
const route = useRoute()
const showMenu = computed(() => !(route.path == '/login'))
</script>
