import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    currentUser: null,
    loading: false,
    error: null
  }),
  getters: {
    isLoggedIn: (state) => !!state.currentUser
  },
  actions: {
    async fetchUsers() {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get('http://localhost:8082/api/users')
        this.users = res.data
      } catch (err) {
        this.error = 'No se pudo conectar con el microservicio'
      } finally {
        this.loading = false
      }
    },
    login(username, password) {

      const found = this.users.find(u => u.username === username && u.password === password)
      if (found) {
        this.currentUser = found
        localStorage.setItem('auth_user', JSON.stringify(found))
        return true
      }
      return false
    },
    logout() {
      this.currentUser = null
      this.users = []
      localStorage.removeItem('auth_user')
    }
  }
})