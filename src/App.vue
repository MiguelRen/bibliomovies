<script setup lang="ts">
import { ref, watch } from 'vue'
import { fetchMovies } from './api'
import { displayMovies } from './ui'

const movieInput = ref('')

// Fetch when the input changes (debounce can be added later)
watch(movieInput, (newVal) => {
  fetchMovies(newVal).then((movies) => displayMovies(movies))
})

// Optional: initial fetch
fetchMovies(movieInput.value).then((movies) => displayMovies(movies))
</script>

<template>
  <h1>Ingrese El nombre de una pelicula</h1>
  <input type="text" v-model="movieInput" />
</template>

<style scoped></style>
