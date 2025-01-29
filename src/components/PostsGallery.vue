<template>
    <section>
      <div class="flex flex-col  mx-auto px-4">
        <div class="flex flex-wrap justify-center gap-4">
          <CardHome title="the king of fighter" description="jogar the king" />
          <CardHome title="the king of fighter" description="jogar the king" />
          <CardHome title="the king of fighter" description="jogar the king" />
          <CardHome title="the king of fighter" description="jogar the king" />
          <CardHome title="the king of fighter" description="jogar the king" />
          <CardHome title="the king of fighter" description="jogar the king" />
        </div>
        <Pagination class="mx-auto mt-36"/>
      </div>
    </section>
</template>
<script setup>
import CardHome from './CardHome/CardHome.vue';
import Pagination from './Pagination.vue';
</script>
<style >

</style>