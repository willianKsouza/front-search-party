<template>
  <form>
    <div class="divider">Alterar Senha</div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Nova senha</span>
      </label>
      <input v-model="form.password" type="password" class="input input-bordered w-full" />
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text">Confirmar nova senha</span>
      </label>
      <input v-model="form.confirmPassword" type="password" class="input input-bordered w-full" />
    </div>
    <SuccessWarn :showSuccess="showSuccess" :message="message" />
    <div class="flex justify-end gap-4 mt-6">
      <button type="button" class="btn btn-ghost">Cancelar</button>
      <button  @click.prevent="handleSubmit" type="submit" class="btn btn-primary" :disabled="isLoading">
        {{ isLoading ? 'Salvando...' : 'Salvar alterações' }}
      </button>
    </div>
  </form>
</template>
<script setup>
import { ref, defineProps, watch } from 'vue'
import SuccessWarn from '../SuccessWarn.vue'
import { useStore } from '../../stores/store'
const store = useStore()

const props = defineProps({
  id: String,
})

const showSuccess = ref(false)
const isLoading = ref(null)
const message = ref('')
const form = ref({
  password: '',
  confirmPassword: '',
})

async function handleSubmit() {
  const userId = store.decodedToken().user_id
  const token = localStorage.getItem('authToken')


  const formJson = JSON.stringify({ password: form.value.password})
  try {
    isLoading.value = true
    const response = await fetch(`${import.meta.env.VITE_URL_API_UPDATE_PASSWORD}/${userId}`, {
      method: 'PUT',
      body: formJson,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      message.value = 'Senha alterada com sucesso!'
      showSuccess.value = true
      setTimeout(() => (showSuccess.value = false), 2000)
      form.value.password = ''
      form.value.confirmPassword = ''
    } else {
      message.value = 'Erro ao alterar senha'
      showSuccess.value = true
      setTimeout(() => (showSuccess.value = false), 2000)
    }
  } catch (error) {
    console.error('Erro:', error)
    message.value = 'Erro ao alterar senha'
    showSuccess.value = true
    setTimeout(() => (showSuccess.value = false), 2000)
  } finally {
    isLoading.value = false
  }
}
</script>
