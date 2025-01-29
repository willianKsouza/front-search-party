<template>
  <div>
    <!-- Botão para abrir o modal -->
    <button @click="openModal" class="btn btn-primary">+ New Post</button>

    <!-- Modal -->
    <div v-if="isModalOpen" class="modal modal-open">
      <div class="modal-box">
        <form @submit.prevent="createPost">
          <!-- Título do modal -->
          <h2 class="font-bold text-lg mb-4">Create a New Post</h2>

          <!-- Campo de entrada para o título -->
          <input
            type="text"
            v-model="form.title"
            placeholder="Title"
            class="input input-bordered w-full mb-4"
          />

          <!-- Campo de entrada para a descrição -->
          <textarea
            v-model="form.description"
            class="textarea textarea-bordered w-full mb-4"
            placeholder="Description"
            rows="4"
          ></textarea>

          <!-- Ações do modal -->
          <div class="modal-action">
            <!-- Botão para fechar o modal -->
            <button class="btn btn-secondary" @click="openModal">Fechar</button>
            <!-- Botão para criar o post -->
            <button class="btn btn-primary" @click="createPost">Create</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isModalOpen = ref(false)
const form = ref({
  title: '',
  description: '',
  userId: '',
})

function openModal() {
  isModalOpen.value = !isModalOpen.value
}

async function createPost() {
  const formData = new FormData()

  formData.append('title', form.value.title)
  formData.append('description', form.value.description)
  formData.append('userId', form.value.userId)

  try {
    const response = await fetch('url da api', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Erro ao enviar os dados')
    }
    form.title.value = ''
    form.description.value = ''
    form.isModalOpen.value = false
    const result = await response.json()
    console.log('Resposta do servidor:', result)
    alert('Dados enviados com sucesso!')
  } catch (error) {
    console.error('Erro:', error)
    alert('Falha ao enviar os dados.')
  }
}
</script>

