<template>
  <main class="">
    <section class="flex gap-4 p-4 light:bg-slate-200">
      <NewPost />
      <SearchInput type="text" class="flex-grow px-4 py-2 rounded" />
    </section>
    <PostsGallery />
    <Pagination class="mx-auto mt-20 mb-5"/>
  </main>
</template>
<script setup>
import SearchInput from './SearchInput.vue'
import PostsGallery from './PostsGallery.vue';
import NewPost from './NewPost.vue';
import Pagination from './Pagination.vue';
</script>

