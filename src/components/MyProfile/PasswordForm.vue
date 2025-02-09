<template>

<form @click.prevent="handleSubmit">

<div class="divider">Alterar Senha</div>
<div class="form-control">
  <label class="label">
    <span class="label-text">Senha atual</span>
  </label>
  <input type="password" class="input input-bordered w-full" />
</div>

<div class="form-control">
  <label class="label">
    <span class="label-text">Nova senha</span>
  </label>
  <input
    type="password"
    class="input input-bordered w-full"
  />
</div>

<div class="form-control">
  <label class="label">
    <span class="label-text">Confirmar nova senha</span>
  </label>
  <input
    type="password"
    class="input input-bordered w-full"
  />
</div>

<div class="flex justify-end gap-4 mt-6">
  <button type="button" class="btn btn-ghost">Cancelar</button>
  <button type="submit" class="btn btn-primary" :disabled="isLoading">
    {{ isLoading ? 'Salvando...' : 'Salvar alterações' }}
  </button>
</div>

</form>
</template>
<script setup>

defineProps({
  isLoading: Boolean
})

function handleSubmit() {
 fetch(`${import.meta.env.VITE_URL_API_FORGOTEN}`, {
      method: 'POST',
      body:formData
    }).then((response) => {

      if (response.ok == true && response.status == 200) {
        return response.json()
      }
    })
    .then(data => {
      console.log(data);

    })
}
</script>
