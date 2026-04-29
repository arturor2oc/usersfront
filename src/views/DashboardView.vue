<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const store = useUserStore()
const filterType = ref('Todos')

onMounted(async () => {
  if (!store.users.length) await store.fetchUsers()
})

const filteredUsers = computed(() => {
  if (filterType.value === 'Todos') return store.users
  return store.users.filter(u => u.tipo === filterType.value)
})

const uniqueTypes = computed(() => ['Todos', ...new Set(store.users.map(u => u.tipo))])

const refreshTable = () => store.fetchUsers()

const logout = () => {
  store.logout()
  router.push('/')
}
</script>

<template>
  <v-app>
    <v-app-bar color="primary" theme="dark">
      <v-app-bar-title>Panel de Usuarios</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-chip class="mr-2" color="white" variant="text">
        {{ store.currentUser?.nombre }} {{ store.currentUser?.apellidoPaterno }}
      </v-chip>
      <v-btn icon color="white" @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row class="mb-4" align="center">
          <v-col cols="12" md="6">
            <v-select
              v-model="filterType"
              :items="uniqueTypes"
              label="Filtrar por Tipo de Usuario"
              variant="outlined"
              density="compact"
              prepend-icon="mdi-filter-variant"
            />
          </v-col>
          <v-col cols="12" md="6" class="text-md-end">
            <v-btn color="secondary" prepend-icon="mdi-refresh" @click="refreshTable">
              Refrescar DataTable
            </v-btn>
          </v-col>
        </v-row>

        <v-data-table
          :headers="[
            { title: 'ID', key: 'id' },
            { title: 'Clave', key: 'clave' },
            { title: 'Tipo', key: 'tipo' },
            { title: 'Nombre Completo', key: 'nombreCompleto' },
            { title: 'Username', key: 'username' },
            { title: 'Inicio Sesión', key: 'fechaInicio' },
            { title: 'Tiempo En Línea', key: 'tiempoEnLinea' },
            { title: 'Estatus', key: 'estatus' }
          ]"
          :items="filteredUsers"
          :loading="store.loading"
          hover
          density="comfortable"
        >
          <template #item.nombreCompleto="{ item }">
            {{ item.nombre }} {{ item.apellidoPaterno }} {{ item.apellidoMaterno }}
          </template>
          <template #item.fechaInicio="{ item }">
            {{ item.fechaInicio ? new Date(item.fechaInicio).toLocaleString('es-ES') : '-' }}
          </template>
          <template #item.estatus="{ item }">
            <v-chip :color="item.estatus === 'ACTIVO' ? 'success' : 'error'" size="small" variant="tonal">
              {{ item.estatus }}
            </v-chip>
          </template>
          <template #loading>
            <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
          </template>
        </v-data-table>
      </v-container>
    </v-main>
  </v-app>
</template>