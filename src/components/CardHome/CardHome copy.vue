<template>
  <div class="card w-96 bg-base-100 shadow-xl">
    <div class="card-body">

      <div v-if="!isEditing">
        <h2 class="card-title text-lg font-bold">{{ title }}</h2>
        <p> Lorem ipsum dolor sit amet consectetur adipisicing...</p>
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

    <div
      v-if="isModalOpen"
      class="modal modal-open"
    >
      <div class="modal-box">
        <h2 class="font-bold text-lg">{{ title }}</h2>
        <p class="py-4">{{ description }}</p>
        <div class="modal-action">
          <button class="btn btn-secondary" @click="closeModal">Fechar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditableCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
      isModalOpen: false,
      editedTitle: this.title,
      editedDescription: this.description,
    };
  },
  methods: {
    startEditing() {
      this.isEditing = true;
    },
    saveChanges() {
      this.isEditing = false;
      this.$emit("update", {
        title: this.editedTitle,
        description: this.editedDescription,
      });
    },
    cancelEditing() {
      this.isEditing = false;
      this.editedTitle = this.title;
      this.editedDescription = this.description;
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
};
</script>
