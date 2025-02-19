<template>
  <div v-if="isModalOpen" class="modal modal-open">
    <div class="modal-box">
      <h2 class="font-bold text-lg">{{ title }}</h2>
      <p class="py-4">{{ description }}</p>

      <div class="chat-section mt-2 pt-4">
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
            @keyup.enter="sendMessage"
          />
          <button class="btn btn-primary" @click="sendMessage">Enviar</button>
        </div>
      </div>

      <div class="modal-action">
        <button class="btn btn-secondary" @click="$emit('close')">Fechar</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

defineEmits(['close'])
const props = defineProps({
  isModalOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  chatMessages: {
    type: Array,
    required: true
  }
})



const newMessage = ref('')

const sendMessage = () => {
  if (newMessage.value.trim()) {
    newMessage.value = ''
  }
}

const ws = new WebSocket('ws://localhost:8080/ws')
ws.onopen = () => {
  console.log('Conexão estabelecida com sucesso')
}
ws.onmessage = (event) => {
  console.log('Mensagem recebida:', event.data)
}

</script>
