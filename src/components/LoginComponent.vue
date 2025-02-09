<template>
  <div class="bg-base-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="card w-full max-w-sm bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl font-bold text-center justify-center">Login</h2>

        <form @submit.prevent="handleSubmit" method="post" class="space-y-4 mt-4">
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              type="text"
              v-model="form.email"
              placeholder="Digite seu email ou usuário"
              :class="{ 'input-error': errors.email }"
              class="input input-bordered w-full"
            />
            <label class="label" v-if="errors.email">
              <span class="label-text-alt text-error">{{ errors.email }}</span>
            </label>
          </div>
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Senha</span>
            </label>
            <input
              type="password"
              v-model="form.password"
              placeholder="Digite sua senha"
              :class="{ 'input-error': errors.password }"
              class="input input-bordered w-full"
            />
            <label class="label">
              <span class="label-text-alt text-error" v-if="errors.password">{{
                errors.password
              }}</span>
              <a href="/forgot-password" class="label-text-alt link link-primary"
                >Esqueceu a senha?</a
              >
            </label>
          </div>
          <div class="form-control">
            <label class="label cursor-pointer justify-start gap-2">
              <input type="checkbox" class="checkbox checkbox-primary" v-model="form.rememberMe" />
              <span class="label-text">Manter conectado</span>
            </label>
          </div>
          <div v-if="loginError" class="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ loginError }}</span>
          </div>
          <button type="submit" class="btn btn-primary w-full" :disabled="isLoading">
            <span class="loading loading-spinner" v-if="isLoading"></span>
            {{ isLoading ? 'Entrando...' : 'Entrar' }}
          </button>
          <div class="text-center mt-4">
            <span class="text-sm">
              Não tem uma conta?
              <a href="/register" class="link link-primary">Cadastre-se</a>
            </span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import { useRoute } from 'vue-router'
import { useStore } from '@/stores/store'
import { computed, onMounted, ref } from 'vue'
const store = useStore()
const form = ref({
  email: '',
  password: '',
  rememberMe: false,
})

const errors = ref({
  email: '',
  password: '',
})



const isLoading = ref(false)
const loginError = ref('')

const validateForm = () => {
  let isValid = true

  errors.value.email = ''
  errors.value.password = ''
  loginError.value = ''

  if (!form.value.email.trim()) {
    errors.value.email = 'Email ou usuário é obrigatório'
    isValid = false
  }

  if (!form.value.password) {
    errors.value.password = 'Senha é obrigatória'
    isValid = false
  }

  return isValid
}

async function handleSubmit(){
  if (!validateForm()) return

  try {
    isLoading.value = true
    const formData = new FormData()
    formData.set('email', form.value.email)
    formData.set('password', form.value.password)
    await fetch(`${import.meta.env.VITE_URL_API_LOGIN}`, {
      method: 'POST',
      body:formData
    }).then((response) => {

      if (response.ok == true && response.status == 200) {
        return response.json()
      }
    })
    .then(data => {

      localStorage.setItem('authToken', data.token)
      router.push('/')
    })
  } catch (error) {
    loginError.value = 'Ocorreu um erro ao fazer login. Tente novamente.'
  } finally {
    isLoading.value = false
  }
}


</script>
