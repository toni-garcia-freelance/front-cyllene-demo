import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const token = ref(null)
  const user = ref({})

  function isLoggedIn() {
    return token.value !== null
  }

  function logOut() {
    token.value = null
  }

  return { token, user, isLoggedIn, logOut }
})
