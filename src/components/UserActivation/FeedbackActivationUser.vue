<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200">
    <div v-if="props.feedback == 'success'" class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body items-center text-center">
        <h2 class="card-title text-2xl font-bold text-success">🎉 Parabéns!</h2>
        <p class="mt-4 text-lg">
          Sua conta foi ativada com sucesso. Agora você pode aproveitar todos os nossos serviços.
        </p>

        <div class="card-actions mt-6">
          <button @click="redirectToHome" class="btn btn-primary">
            login
          </button>
        </div>
      </div>
    </div>

    <div v-if="props.feedback == 'fail'" class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body items-center text-center">
        <h2 class="card-title text-2xl font-bold text-error">Ops!</h2>
        <p class="mt-4 text-lg">
          Não foi possível ativar sua conta. Por favor, tente novamente mais tarde.
        </p>
        <div class="card-actions mt-6">
          <button @click="redirectToHome" class="btn btn-primary">
          login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const props = defineProps({
  feedback: String,
  id: String
});


const router = useRouter();

const redirectToHome = () => {
  router.push({ name: 'login'});
};
</script>
