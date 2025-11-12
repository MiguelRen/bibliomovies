import { createApp } from 'vue'
import App from './App.vue'

import { fetchMovies } from './api'
import {displayMovies} from './ui'


const result = await fetchMovies('batman')

createApp(App).mount('#app')



