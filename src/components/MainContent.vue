<template>
  <div>
    <section class="flex gap-4 p-4 light:bg-slate-200">
      <NewPost />
      <SearchInput type="text" class="flex-grow px-4 py-2 rounded" />
    </section>
    <PostsGallery />
  </div>
</template>
<script setup>
import SearchInput from './SearchInput.vue'
import PostsGallery from './PostsGallery.vue';
import NewPost from './NewPost.vue';

</script>

