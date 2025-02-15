<template>
  <div class="min-h-screen bg-base-200 py-8">
    <div class="container mx-auto px-4">
      <div class="card bg-base-100 shadow-xl max-w-2xl mx-auto">
        <div class="card-body">
          <h2 class="card-title text-2xl font-bold mb-6">Perfil</h2>
          <Avatar :avatarUrl="store.profile.avatarUrl" />
          <ProfileForm
          :isLoading="isLoading"
          :username="store.profile.username"
          :bio="store.profile.bio">
          </ProfileForm>
          <PasswordForm
          :id="store.profile.id"
          > </PasswordForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '@/stores/store'
import Avatar from './Avatar.vue'
import ProfileForm from './ProfileForm.vue'
import PasswordForm from './PasswordForm.vue'
const isLoading = ref(false)
const store = useStore()

</script>
