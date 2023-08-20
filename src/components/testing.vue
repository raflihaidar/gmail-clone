<template>
    <div>
        state pokemon details : {{ pokemonDetails }}
    </div>
    <div>
        state count: {{ count }} <br>
    </div>
    <div>getters : {{ doubleCount(5) }}</div>
    <button @click="increment" class="bg-gray-400 px-2 py-3 rounded-full">Increment</button>
    <br>
    <br>
    <button @click="decrement" class="bg-gray-400 px-2 py-3 rounded-full">decrement</button>
    <br>
    <br>
    <button @click="reset" class="bg-gray-400 px-2 py-3 rounded-full">Reset</button>
    <br>
    <br>
    <button @click="fetchData('pikachu')" class="bg-gray-400 px-2 py-3 rounded-full">fetch data</button>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCounterStore } from "../stores/counter";
import { usePokemonStore } from "../stores/pokemon"

const counterStore = useCounterStore();
const pokemonStore = usePokemonStore()
const { doubleCount, count } = storeToRefs(counterStore)
const { pokemonDetails } = storeToRefs(pokemonStore)

const increment = () => {
    counterStore.increment()
}

const decrement = () => {
    counterStore.decrement()
}

const reset = () => {
    counterStore.$reset()
}

const fetchData = (name) => {
    pokemonStore.fetchData(name)
}


</script>