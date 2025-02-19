<template>
  <section class="mx-10">
    <div class="flex flex-col mx-auto px-4">
      <div
        class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] justify-items-center gap-x-16 gap-y-4"
      >
        <CardHome
          v-for="post in posts"
          :title="post.title"
          :description="post.body"
          :key="post.id"
        />
      </div>
    </div>
  </section>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import CardHome from './CardHome/CardHome.vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/stores/store'
const posts = ref('')

const route = useRoute()
const store = useStore()
onMounted(() => {
  async function getPosts() {
    let url
    if (route.path === '/') {
      url = `${import.meta.env.VITE_URL_API_GET_ALL_POSTS}`
    } else {
      url = `${import.meta.env.VITE_URL_API_GET_ALL_POSTS}?id=${store.profile.id}`
    }
    const token = localStorage.getItem('authToken')
    const fetchPosts = await fetch(`${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await fetchPosts.json()
    posts.value = data
  }
 getPosts()
})
</script>
