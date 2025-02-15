<template>
  <form>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Nickname</span>
      </label>
      <input type="text" v-model="profile.username" class="input input-bordered w-full" />
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Bio</span>
      </label>
      <textarea v-model="profile.bio" class="textarea textarea-bordered h-20"></textarea>
      <SuccessWarn :showSuccess="showSuccess" :message="message" />
      <div class="flex justify-end gap-4 mt-6">
        <button type="button" class="btn btn-ghost">Cancelar</button>
        <button
          @click.prevent="handleSubmit"
          type="submit"
          class="btn btn-primary"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Salvando...' : 'Salvar alterações' }}
        </button>
      </div>
    </div>
  </form>
</template>
<script setup>
import { useStore } from '@/stores/store'
import { ref } from 'vue'
import SuccessWarn from '../SuccessWarn.vue'

const props = defineProps({
  isLoading: Boolean,
  username: String,
  bio: String,
})

const showSuccess = ref(false)
const isLoading = ref(null)
const store = useStore()
const message = ref('')
const profile = ref({
  username: props.username || '',
  bio: props.bio || '',
})


async function handleSubmit() {
  const id = store.decodedToken().user_id
  const token = localStorage.getItem('authToken')
  isLoading.value = true
  const profileJson = JSON.stringify({
    username: profile.value.username,
    bio: profile.value.bio,
  })
  await fetch(`${import.meta.env.VITE_URL_API_UPDATE}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: profileJson,
  }).then((response) => {
    if (response.ok == true && response.status == 204) {
      message.value = 'Perfil atualizado com sucesso!'
      showSuccess.value = true
      setTimeout(() => (showSuccess.value = false), 2000)
      isLoading.value = false
      return response
    }
  })
}
</script>
