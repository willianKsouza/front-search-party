<template>
  <div class="min-h-screen bg-base-200 py-8">
    <div class="container mx-auto px-4">
      <div class="card bg-base-100 shadow-xl max-w-2xl mx-auto">
        <div class="card-body">
          <h2 class="card-title text-2xl font-bold mb-6">Perfil</h2>
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="flex flex-col items-center gap-4 mb-6">
              <div class="avatar">
                <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    :src="avatarPreview || profile.avatarUrl || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'"
                    alt="Avatar do perfil"
                    class="object-cover"
                  />
                </div>
              </div>
              <div class="form-control w-full max-w-xs">
                <label class="label ">
                  <span class="label-text ">Escolha uma nova foto</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  @change="handleAvatarChange"
                  class="file-input file-input-bordered w-full max-w-xs border-orange-500 hover:bg-orange-400 text-white  file-input-ghost"
                />

                <div v-if="selectedFile" class="mt-2 text-sm text-gray-600 flex items-center justify-center gap-2">
                  <span>{{ selectedFile.name }}</span>
                  <button
                    type="button"
                    @click="removeAvatar"
                    class="btn btn-ghost btn-xs"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Username -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">Nome de usuário</span>
              </label>
              <input
                type="text"
                v-model="profile.username"
                placeholder="Seu nome de usuário"
                class="input input-bordered w-full"
              />
            </div>

            <!-- Bio -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">Biografia</span>
              </label>
              <textarea
                v-model="profile.bio"
                placeholder="Conte um pouco sobre você"
                class="textarea textarea-bordered h-24"
              ></textarea>
            </div>

            <!-- Divider -->
            <div class="divider">Alterar Senha</div>

            <!-- Senha Atual -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">Senha atual</span>
              </label>
              <input
                type="password"
                v-model="passwordForm.currentPassword"
                placeholder="Digite sua senha atual"
                class="input input-bordered w-full"
              />
            </div>

            <!-- Nova Senha -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">Nova senha</span>
              </label>
              <input
                type="password"
                v-model="passwordForm.newPassword"
                placeholder="Digite sua nova senha"
                class="input input-bordered w-full"
              />
            </div>

            <!-- Confirmar Nova Senha -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">Confirmar nova senha</span>
              </label>
              <input
                type="password"
                v-model="passwordForm.confirmPassword"
                placeholder="Confirme sua nova senha"
                class="input input-bordered w-full"
              />
            </div>

            <!-- Botões -->
            <div class="flex justify-end gap-4 mt-6">
              <button
                type="button"
                class="btn btn-ghost"
                @click="resetForm"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="isLoading"
              >
                {{ isLoading ? 'Salvando...' : 'Salvar alterações' }}
              </button>
            </div>
          </form>

          <!-- Alert de sucesso -->
          <div v-if="showSuccess" class="alert alert-success mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Perfil atualizado com sucesso!</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Estado do perfil
const profile = reactive({
  username: '',
  bio: '',
  avatarUrl: ''
})

// Estado do formulário de senha
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Estados para o avatar
const selectedFile = ref(null)
const avatarPreview = ref(null)

// Estados de UI
const isLoading = ref(false)
const showSuccess = ref(false)

// Métodos para manipulação do avatar
const handleAvatarChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      avatarPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const removeAvatar = () => {
  selectedFile.value = null
  avatarPreview.value = null
}

// Métodos
const handleSubmit = async () => {
  try {
    isLoading.value = true
    // Aqui você implementaria a lógica de atualização do perfil
    // Incluindo o upload do arquivo selectedFile.value se existir
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulando uma requisição

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
  // Resetar para os valores originais
  Object.assign(profile, {
    username: '',
    bio: '',
  })
  Object.assign(passwordForm, {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  removeAvatar()
}
</script>