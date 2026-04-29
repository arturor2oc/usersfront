<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const store = useUserStore()
const username = ref('')
const password = ref('')
const errorMsg = ref('')

const handleLogin = async () => {
  if (!store.users.length) await store.fetchUsers()
  
  if (store.login(username.value, password.value)) {
    router.push('/dashboard')
  } else {
    errorMsg.value = 'Usuario o contraseña incorrectos'
  }
}
</script>

<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" theme="dark" flat>
            <v-toolbar-title>Iniciar Sesión</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field v-model="username" label="Username" prepend-icon="mdi-account" clearable />
            <v-text-field v-model="password" label="Password" type="password" prepend-icon="mdi-lock" clearable />
            <p v-if="errorMsg" class="text-red-darken-2 text-center mt-2">{{ errorMsg }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block variant="elevated" @click="handleLogin">Entrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>