<template>
  <div class="bg-cover bg-center max-w-[7.5rem] max-h-[7.5rem] w-full h-full rounded-lg shadow-lg" :style="{ backgroundImage: `url(${imageUrl})` }">
    <img src="" alt="">
    <!-- Conteúdo opcional pode ser inserido aqui -->
  </div>
</template>

<script setup>
defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
  maxSizeRem: {
    type: Number,
    default: 7.5, // 120px em rem padrão (7.5rem * 16px)
  },
});
</script>

