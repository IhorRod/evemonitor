import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true')

export function useAuth () {
  const router = useRouter()

  const login = async (username: string, password: string) => {
    const envUsername = import.meta.env.VITE_LOGIN
    const envPassword = import.meta.env.VITE_PASSWORD

    if (username === envUsername && password === envPassword) {
      isAuthenticated.value = true
      localStorage.setItem('isAuthenticated', 'true')
      return true
    } else {
      return false
    }
  }

  const logout = async () => {
    isAuthenticated.value = false
    localStorage.removeItem('isAuthenticated')
    await router.push('/login')
  }

  return {
    isAuthenticated,
    login,
    logout
  }
}
