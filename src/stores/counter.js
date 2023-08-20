import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  //state
  const count = ref(0)

  //getters
  const doubleCount = computed(() => {
    return (num) => count.value * num
  })

  //action
  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  function $reset() {
    count.value = 0
  }

  return { count, doubleCount, increment, decrement, $reset }
})
