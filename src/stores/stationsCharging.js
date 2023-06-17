import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStationsChargingStore = defineStore('stationsCharging', () => {
  const stationsCharging = ref([])
  const searchZip = ref('')
  const searchCity = ref('')

  return { stationsCharging, searchCity, searchZip }
})
