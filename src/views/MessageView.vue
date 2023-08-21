<template>
  <div>
    Hallo {{ singleData.to }}
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useDataDummyStore } from "../stores/dataDummy"
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
const store = useDataDummyStore();
const { singleData } = storeToRefs(store)
const route = useRoute();

onMounted(async () => {
  await store.getDataDetail(route.params.id)
})
</script>