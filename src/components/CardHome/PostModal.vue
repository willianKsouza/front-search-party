<template>
  <div v-if="isModalOpen" class="modal modal-open">
    <div class="modal-box">
      <h2 class="font-bold text-lg">{{ title }}</h2>
      <p class="py-4">{{ description }}</p>

      <div class="chat-section mt-2  pt-4">
        <h3 class="font-bold mb-2">Chat</h3>

        <div class="chat-messages h-48 overflow-y-auto mb-4 border border-orange-500 rounded-lg p-2">
          <div
            v-for="(message, index) in chatMessages"
            :key="index"
            :class="['chat-message mb-2 p-2 rounded', message.isUser ? ' ml-auto w-3/4' : ' w-3/4']"
          >
            <div class="font-semibold text-sm">{{ message.author }}</div>
            <div>{{ message.text }}</div>
            <div class="text-xs text-gray-500">{{ message.time }}</div>
          </div>
        </div>

        <div class="chat-input flex gap-2">
          <input
            v-model="newMessage"
            type="text"
            class="input input-bordered flex-1"
            placeholder="Digite sua mensagem..."
          />
          <button class="btn btn-primary">Enviar</button>
        </div>
      </div>

      <div class="modal-action">
        <button class="btn btn-secondary" @click="closeModal">Fechar</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, ref } from 'vue'

defineProps({
  isModalOpen: Boolean,
  title: String,
  description: String,
  chatMessages: Array,
})

const closeModal = () => {
  isModalOpen = false
}
const newMessage = ref('')
</script>
