<template>
<div>
  <button @click="logoutUser" class="btn mr-4">Logout</button>
</div>
</template>
<script setup>
import router from '@/router';
function logoutUser() {
  localStorage.removeItem('authToken')
  router.push('/login')
}
</script>
<style>

</style>