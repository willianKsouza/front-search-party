<template>
  <div class="bg-base-200 flex items-center justify-center min-h-screen">
    <div class="card w-full max-w-md shadow-xl bg-base-100 p-6">
      <h2 class="text-2xl font-bold text-center mb-6">Register</h2>
      <form @submit.prevent="submitForm">
        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text">Username</span>
          </label>
          <input
            type="text"
            v-model="form.username"
            placeholder="Enter your username"
            class="input input-bordered w-full"
            required
          />
        </div>

        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input
            type="email"
            v-model="form.email"
            placeholder="Enter your email"
            class="input input-bordered w-full"
            required
          />
        </div>

        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input
            type="password"
            v-model="form.password"
            placeholder="Enter your password"
            class="input input-bordered w-full"
            required
          />
        </div>

        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text">Repeat Password</span>
          </label>
          <input
            type="password"
            v-model="form.repeatPassword"
            placeholder="Repeat your password"
            class="input input-bordered w-full"
            required
          />
          <span v-if="!passwordsMatch && form.repeatPassword" class="text-error text-sm">
            As senhas não coincidem.
          </span>
        </div>
        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text">Bio</span>
          </label>
          <textarea
            v-model="form.bio"
            placeholder="Tell me a little about yourself..."
            class="textarea textarea-bordered w-full"
            rows="3"
          ></textarea>
        </div>
        <div class="form-control mt-6">
          <button type="submit" class="btn btn-primary w-full">Cadastrar</button>
        </div>
      </form>

      <div class="text-center mt-4">
        <span class="text-sm">
          Já tem uma conta?
          <a href="/login" class="link link-primary">Faça login</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const form = ref({
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
  bio: '',
})

const passwordsMatch = computed(() => {
  return form.value.password === form.value.repeatPassword
})

async function submitForm() {
  const formData = new FormData()
  if (!passwordsMatch.value) {
    alert('As senhas não coincidem. Por favor, verifique.')
    return
  }

  formData.append('username', form.value.username)
  formData.append('email', form.value.email)
  formData.append('password', form.value.password)
  formData.append('bio', form.value.bio)

  fetch(`${import.meta.env.VITE_URL_API}/user/create`, {
    method: 'POST',
    body: formData,
    headers:{
      'x-teste':'algum valor'
    }
  })
    .then((response) => {
      console.log(response.status)

      return response.json()
    })
    .then((data) => console.log(data))
    .catch((error) => console.log(error))

  // form.value = {
  //   username: '',
  //   email: '',
  //   password: '',
  //   repeatPassword: '',
  //   bio: '',
  // };
}
</script>
