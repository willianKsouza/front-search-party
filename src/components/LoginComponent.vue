<template>
  <div class="bg-base-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="card w-full max-w-sm bg-base-100 shadow-xl">
      <div class="card-body">
        <!-- Header -->
        <h2 class="card-title text-2xl font-bold text-center justify-center">
          Login
        </h2>
        <p class="text-center text-base-content/60 mt-2">
          Bem-vindo de volta!
        </p>

        <form @submit.prevent="handleSubmit" class="space-y-4 mt-4">
          <!-- Email/Username -->
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              type="text"
              v-model="form.email"
              placeholder="Digite seu email ou usuário"
              :class="{'input-error': errors.email}"
              class="input input-bordered w-full"
            />
            <label class="label" v-if="errors.email">
              <span class="label-text-alt text-error">{{ errors.email }}</span>
            </label>
          </div>

          <!-- Password -->
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Senha</span>
            </label>
            <input
              type="password"
              v-model="form.password"
              placeholder="Digite sua senha"
              :class="{'input-error': errors.password}"
              class="input input-bordered w-full"
            />
            <label class="label">
              <span class="label-text-alt text-error" v-if="errors.password">{{ errors.password }}</span>
              <a href="/forgot-password" class="label-text-alt link link-primary">Esqueceu a senha?</a>
            </label>
          </div>

          <!-- Remember me checkbox -->
          <div class="form-control">
            <label class="label cursor-pointer justify-start gap-2">
              <input type="checkbox" class="checkbox checkbox-primary" v-model="form.rememberMe" />
              <span class="label-text">Manter conectado</span>
            </label>
          </div>

          <!-- Error message -->
          <div v-if="loginError" class="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ loginError }}</span>
          </div>

          <!-- Login button -->
          <button
            type="submit"
            class="btn btn-primary w-full"
            :disabled="isLoading"
          >
            <span class="loading loading-spinner" v-if="isLoading"></span>
            {{ isLoading ? 'Entrando...' : 'Entrar' }}
          </button>

          <!-- Register link -->
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
import { ref, reactive } from 'vue'

// Form state
const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})

// Error states
const errors = reactive({
  email: '',
  password: ''
})

const isLoading = ref(false)
const loginError = ref('')

// Form validation
const validateForm = () => {
  let isValid = true

  // Reset errors
  errors.email = ''
  errors.password = ''
  loginError.value = ''

  // Email/Username validation
  if (!form.email.trim()) {
    errors.email = 'Email ou usuário é obrigatório'
    isValid = false
  }

  // Password validation
  if (!form.password) {
    errors.password = 'Senha é obrigatória'
    isValid = false
  }

  return isValid
}

// Form submission
const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    isLoading.value = true
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Login successful', form)

  } catch (error) {
    loginError.value = 'Ocorreu um erro ao fazer login. Tente novamente.'
    console.error('Login error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>