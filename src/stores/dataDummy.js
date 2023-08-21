import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useDataDummyStore = defineStore('dataDummy', () => {
  const data = ref([])

  const url = 'http://localhost:5000/transmitter'

  const datas = computed(() => data.value)

  const getDataDummy = async () => {
    await axios
      .get(url)
      .then((res) => {
        data.value = res.data
      })
      .catch((err) => console.log('error', err))
  }

  const addData = async (payload) => {
    try {
      await axios.post(url, payload)
      getDataDummy()
    } catch (err) {
      console.error('Error adding data:', err.message)
    }
  }

  const deleteData = async (id) => {
    try {
      await axios.delete(url + '/' + id)
      getDataDummy()
    } catch (error) {
      console.error(error)
    }
  }

  return {
    data,
    datas,
    getDataDummy,
    addData,
    deleteData
  }
})