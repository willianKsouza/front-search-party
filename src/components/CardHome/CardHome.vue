<template>
  <div class="card w-[22rem] bg-base-100 shadow-xl">
    <div class="card-body">
      <div v-if="!isEditing">
        <h2 class="card-title text-lg font-bold">{{ title }}</h2>
        <p>{{ description }}</p>
      </div>

      <div v-else>
        <input
          v-model="editedTitle"
          type="text"
          class="input input-bordered w-full mb-2"
          placeholder="Título"
        />
        <textarea
          v-model="editedDescription"
          class="textarea textarea-bordered w-full"
          placeholder="Descrição"
        ></textarea>
      </div>

      <div class="card-actions justify-center mt-4">
        <button
          v-if="!isEditing"
          class="btn border-green-600 btn-outline"
          @click="startEditing"
        >
          Editar
        </button>
        <button
          v-if="isEditing"
          class="btn border-green-600 btn-outline"
          @click="saveChanges"
        >
          Salvar
        </button>
        <button
          v-if="isEditing"
          class="btn border-orange-600 btn-outline"
          @click="cancelEditing"
        >
          Cancelar
        </button>
        <button
          class="btn border-blue-500 btn-outline"
          @click="openModal"
        >
          Visualizar
        </button>
        <button
          class="btn border-red-600 btn-outline"
          @click="$emit('delete')"
        >
          Excluir
        </button>
      </div>
    </div>

    <PostModal
      :isModalOpen="isModalOpen"
      :title="title"
      :description="description"
      :chatMessages="chatMessages"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PostModal from './PostModal.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update', 'delete'])

const isEditing = ref(false)
const isModalOpen = ref(false)
const editedTitle = ref(props.title)
const editedDescription = ref(props.description)

const chatMessages = ref([
  {
    author: 'João',
    text: 'Olá, tudo bem?',
    time: '10:30',
    isUser: false
  },
  {
    author: 'Maria',
    text: 'Oi! Tudo ótimo, e com você?',
    time: '10:32',
    isUser: true
  }
])

const startEditing = () => {
  isEditing.value = true
  editedTitle.value = props.title
  editedDescription.value = props.description
}

const saveChanges = () => {
  if (editedTitle.value.trim() && editedDescription.value.trim()) {
    isEditing.value = false
    emit('update', {
      title: editedTitle.value,
      description: editedDescription.value
    })
  }
}

const cancelEditing = () => {
  isEditing.value = false
  editedTitle.value = props.title
  editedDescription.value = props.description
}

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}
</script>
