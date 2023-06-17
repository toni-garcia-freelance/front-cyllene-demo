import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStationsChargingStore = defineStore('stationsCharging', () => {
  const stationsCharging = ref([])

  return { stationsCharging }
})
