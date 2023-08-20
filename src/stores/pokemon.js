import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemonDetails = ref({})

  async function fetchData(name) {
    await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((response) => {
      pokemonDetails.value = response.data
    })
  }

  return {
    pokemonDetails,
    fetchData
  }
})
