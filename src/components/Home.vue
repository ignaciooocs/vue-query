<script setup>
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { getData as getApi } from '../services/api';

let count = 1
const queryClient = useQueryClient()

defineProps({
  msg: String,
})
const getData = async () => {
  try {
    return await getApi(count)
  } catch (error) {
    
  }
}

const { data, isError, isLoading, error } = useQuery({
  queryKey: ['Data'],
  queryFn: getData
})

const nextpage = () => {
  window.scroll({ top: 0, behavior: 'smooth'})
  count = count + 1
  queryClient.invalidateQueries({ queryKey: ['Data']})
}

const previouspage = () => {
  window.scroll({ top: 0, behavior: 'smooth' })
  count = count - 1
  queryClient.invalidateQueries({ queryKey: ['Data'] })
}


</script>

<template>
  <h1>{{ msg }}</h1>
  <p>pagina {{ count }}</p>
  <p v-if="isLoading">Loading...</p>
  <p v-else-if="isError">Error: {{ error }}</p>
  <ul v-else>
    <li v-for="character in data" :key="character.id">
      <p>{{ character.name }}</p>
      <img :src="character.image" alt="">
    </li>
  </ul>
  <button type="button" @click="previouspage">anterior {{ count > 1 ? count - 1 : '' }}</button>
  <button type="button" @click="nextpage">siguiente {{ count + 1 }}</button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

ul {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 50px;
  padding: 20px;
}

li {
  list-style: none;
}

img {
  width: 200px;
  height: 200px;
}
</style>
