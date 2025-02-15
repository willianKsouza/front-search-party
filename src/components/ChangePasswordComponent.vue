<template>
  <div>
    <div class="flex items-center justify-center bg-base-200 mt-10">
      <div class="card w-7/12 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title justify-center mb-4">Alterar Senha</h2>

          <form @submit.prevent="handleSubmit">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Nova Senha</span>
              </label>
              <input
                v-model="form.password"
                type="password"
                class="input input-bordered w-full"
                placeholder="Digite sua nova senha"
                required
              />
            </div>

            <div class="form-control mt-4">
              <label class="label">
                <span class="label-text">Confirme a Nova Senha</span>
              </label>
              <input
                v-model="form.confirmPassword"
                type="password"
                class="input input-bordered w-full"
                placeholder="Digite novamente sua senha"
                required
              />
            </div>
            <ErrorWarn :showError="showError" :message="errorMessage" />
            <SuccessWarn :showSuccess="showSuccess" :message="message" />
            <div class="mt-6">
              <button type="submit" class="btn btn-primary w-full" :disabled="isLoading">
                {{ isLoading ? 'Alterando...' : 'Alterar Senha' }}
              </button>
            </div>
          </form>

          <div class="text-center mt-4">
            <router-link to="/login" class="link link-hover text-sm">
              Voltar para o login
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import ErrorWarn from '@/components/ErrorWarn.vue'
import SuccessWarn from '@/components/SuccessWarn.vue'
import { useRoute } from 'vue-router'
import router from '@/router'

const form = ref({
  password: '',
  confirmPassword: '',
})
const route = useRoute()
const message = ref('')
const showError = ref(false)
const errorMessage = ref('')
const isLoading = ref(false)
const showSuccess = ref(false)

function showTimeOut(obj) {
  setTimeout(() => {
    obj.value = false
  }, 3000)
}
const handleSubmit = async () => {
  isLoading.value = true
  if (form.value.password !== form.value.confirmPassword) {
    errorMessage.value = 'As senhas não coincidem'
    showError.value = true
    isLoading.value = false
    showTimeOut(showError)
    return
  }

  const id = route.params.id
  const token = localStorage.getItem('authToken')

  fetch(`${import.meta.env.VITE_URL_API_UPDATE_PASSWORD}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ password: form.value.password }),
    headers: {
      'Content-Type': 'application/json',
      'X-Context': 'change-password',
    },
  }).then((response) => {
    if (response.ok == true && response.status == 204) {
      message.value = 'Senha alterada com sucesso!'
      showSuccess.value = true
      isLoading.value = false
      showTimeOut(showSuccess)
      router.push('/login')
    }
  })
}
</script>
