<template>
  <div class="min-h-screen flex flex-col bg-base-200">
    <Header />
    <BackgroundHome />
    <main class="flex-grow">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer.vue'
import BackgroundHome from './components/BackgroundHome.vue'



</script>
