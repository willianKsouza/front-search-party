<template>
  <div class="min-h-screen bg-base-200 py-8">
    <div class="container mx-auto px-4">
      <div class="card bg-base-100 shadow-xl max-w-2xl mx-auto">
        <div class="card-body">
          <h2 class="card-title text-2xl font-bold mb-6">Perfil</h2>
          <Avatar :avatarUrl="profile.avatarUrl"/>
          <ProfileForm :isLoading="isLoading" :username="profile.username" :bio="profile.bio"/>
          <PasswordForm :isLoading="isLoading"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
console.log();

import { ref } from 'vue'
import { useStore } from '@/stores/store'
import Avatar from './Avatar.vue'
import ProfileForm from './ProfileForm.vue'
import PasswordForm from './PasswordForm.vue';
const store = useStore()
const profile = ref({
  username: store.profile.username,
  bio: store.profile.bio,
  avatarUrl: '',
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const isLoading = ref(false)
const showSuccess = ref(true)

const handleSubmit = async () => {
  try {
    isLoading.value = true

    await new Promise((resolve) => setTimeout(resolve, 1000))

    showSuccess.value = true
    setTimeout(() => {
      showSuccess.value = false
    }, 3000)
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error)
  } finally {
    isLoading.value = false
  }
}

const resetForm = () => {
  Object.assign(profile, {
    username: '',
    bio: '',
  })
  Object.assign(passwordForm, {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  removeAvatar()
}
</script>
