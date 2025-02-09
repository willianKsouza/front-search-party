<template>
            <form >
              <div class="form-control">
              <label class="label">
                <span class="label-text">Nickname</span>
              </label>
              <input type="text" v-model="profile.username" class="input input-bordered w-full" />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Bio</span>
              </label>
              <textarea
              v-model="profile.bio"
                class="textarea textarea-bordered h-20"
              ></textarea>
              <div class="flex justify-end gap-4 mt-6">
              <button type="button" class="btn btn-ghost">Cancelar</button>
              <button @click.prevent="handleSubmit" type="submit" class="btn btn-primary" :disabled="isLoading">
                {{ isLoading ? 'Salvando...' : 'Salvar alterações' }}
              </button>
            </div>
            </div>
            </form>
</template>
<script setup>
import { useStore } from '@/stores/store'
import { ref } from 'vue'

defineProps({
  isLoading: Boolean
})
const store = useStore()
const profile = ref({
  username:store.profile.username,
  bio:store.profile.bio,
})
const formData = new FormData()


const id = store.decodedToken().user_id
async function handleSubmit() {
  formData.append('username', profile.value.username)
  formData.append('bio', profile.value.bio)

await fetch(`${import.meta.env.VITE_URL_API_UPDATE}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body:profile.value,
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
