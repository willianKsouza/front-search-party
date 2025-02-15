<template>
  <div class="flex items-center justify-center bg-base-200 mt-10">
    <div class="card w-7/12 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title justify-center mb-4">Recuperar Senha</h2>

        <form @submit.prevent="handleSubmit">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              type="email"
              v-model="email"
              class="input input-bordered w-full"
              placeholder="Digite seu email"
              required
            />
          </div>

          <div class="mt-6">
            <button
              type="submit"
              class="btn btn-primary w-full"
              :disabled="isLoading"
            >
              {{ isLoading ? 'Enviando...' : 'Enviar email de recuperação' }}
            </button>
          </div>
        </form>

        <div v-if="showSuccess" class="alert alert-success mt-4">
          <span>Email enviado com sucesso! Verifique sua caixa de entrada.</span>
        </div>

        <div class="text-center mt-4">
          <router-link to="/login" class="link link-hover text-sm">
            Voltar para o login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const isLoading = ref(false)
const showSuccess = ref(false)

async function handleSubmit() {
  isLoading.value = true

  fetch(`${import.meta.env.VITE_URL_API_FORGOTEN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email.value })
  })
    .then((response) => {
      if (response.ok == true && response.status == 200) {
        showSuccess.value = true
        email.value = ''
        setTimeout(() => {
          showSuccess.value = false
        }, 3000)
      }
    })

}
</script>