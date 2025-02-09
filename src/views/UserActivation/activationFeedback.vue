<template>
  <FeedBackActivationUser />
</template>
<script setup>
import FeedBackActivationUser from '@/components/UserActivation/FeedbackActivationUser.vue'
import router from '@/router';

import { onMounted } from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute()
onMounted(() => {
  try {
    fetch(`${import.meta.env.VITE_URL_API_UPDATE}/${route.params.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ active: 1 }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    if (response.ok) {
    router.push(`/success/${route.params.id}`)
  } else {
    router.push(`/fail/${route.params.id}`)
  }
  })
  }catch(error){
    console.log(error);
  }


})
</script>
