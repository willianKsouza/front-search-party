<template>
  <div class="max-h-screen flex items-center justify-center bg-base-200 mt-6">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Ativação de Conta</h2>
        <p>Por favor, verifique seu e-mail e clique no link de ativação para ativar sua conta.</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary" @click="resendActivationEmail">Reenviar E-mail</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


   const resendActivationEmail = () => {
      alert('E-mail de ativação reenviado!');
    }


</script>
