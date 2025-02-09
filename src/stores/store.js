import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'

export const useStore = defineStore('counter', () => {
  const profile = ref({
    username: '',
    bio: '',
  })

  const isAuthenticated = ref(false)
  const computedIsAuthenticated = computed(() => isAuthenticated.value)

  const checkAuthentication = () => {
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken()) {
      if (decodedToken().exp < currentTime) {
        return false
      }else {
        return true
      }
    }
  }

  function insertDataProfile(obj) {
    profile.value.username = obj.username
    profile.value.bio = obj.bio
  }


function decodedToken() {
  const token = localStorage.getItem('authToken')
  const decoded = jwtDecode(token)
  return decoded
}

  return { isAuthenticated, computedIsAuthenticated, checkAuthentication, profile, insertDataProfile,decodedToken }
})
