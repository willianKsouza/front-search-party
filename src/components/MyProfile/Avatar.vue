<template>
  <div class="flex flex-col items-center gap-4 mb-6">
    <div class="avatar">
      <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
        <img
          :src="
            avatarPreview ||
            avatarUrl ||
            'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
          "
          alt="Avatar do perfil"
          class="object-cover"
        />
      </div>
    </div>
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Escolha uma nova foto</span>
      </label>
      <input
        type="file"
        accept="image/*"
        @change="handleAvatarChange"
        class="file-input file-input-bordered w-full max-w-xs border-orange-500 hover:bg-orange-400 text-white file-input-ghost"
      />

      <div
        v-if="selectedFile"
        class="mt-2 text-sm text-gray-600 flex items-center justify-center gap-2"
      >
        <!-- <span>{{ selectedFile.name }}</span> -->
        <button type="button" @click="removeAvatar" class="btn btn-ghost btn-xs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, ref } from 'vue'
const avatarPreview = ref(null)
const selectedFile = ref(null)
defineProps({
  avatarUrl: String,
})
const removeAvatar = () => {
  selectedFile.value = null
  avatarPreview.value = null
}

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
</script>
