<template>
  <div>
    <button @click="openModal" class="btn btn-primary">+ New Post</button>
    <div v-if="isModalOpen" class="modal modal-open">
      <div class="modal-box">
        <form >
          <h2 class="font-bold text-lg mb-4">Create a New Post</h2>
          <input
            type="text"
            v-model="form.title"
            placeholder="Title"
            class="input input-bordered w-full mb-4"
          />
          <textarea
            v-model="form.description"
            class="textarea textarea-bordered w-full mb-4"
            placeholder="Description"
            rows="4"
          ></textarea>

          <div class="modal-action">
            <button class="btn btn-secondary" @click="openModal">Fechar</button>
            <button class="btn btn-primary" @click.prevent="createPost">Create</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '@/stores/store'
import { ref } from 'vue'
const store = useStore()
const isModalOpen = ref(false)
const form = ref({
  title: '',
  description: '',
  userId: store.profile.id,
})

function openModal() {
  isModalOpen.value = !isModalOpen.value
}

async function createPost() {
  const token = localStorage.getItem('authToken')

  const formJson = JSON.stringify({
    title: form.value.title,
    body: form.value.description,
    id_user: form.value.userId,
  })

  await fetch(`${import.meta.env.VITE_URL_API_CREATE_POST}`, {
    method: 'POST',
    body: formJson,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao enviar os dados')
    }
    form.value.title = ''
    form.value.description = ''
    isModalOpen.value = false

  })
  .catch(error => {
    console.error('Erro ao enviar os dados:', error)
  })
}
</script>
