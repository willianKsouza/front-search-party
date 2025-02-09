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
import { onMounted } from 'vue'
import { useStore } from '@/stores/store'

onMounted(() => {
  const store = useStore()
  const id = store.decodedToken().user_id

  async function fetchUserProfile() {
    await fetch(`${import.meta.env.VITE_URL_API_PROFILE}/${id}`)
      .then((response) => {
        if (response.ok == true && response.status == 200) {
          return response.json()
        }
      })
      .then((data) => {
        const userProfile = {
          username: data.user.username,
          bio: data.user.bio,
        }
        store.insertDataProfile(userProfile)
      })
  }
  fetchUserProfile()
})
</script>
