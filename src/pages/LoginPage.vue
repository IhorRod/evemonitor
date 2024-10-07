<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="login-wrapper">
        <q-card class="login-card">
          <q-card-section class="q-mb-md">
            <div class="text-h6">Login</div>
          </q-card-section>
          <q-card-section class="q-mb-md">
            <q-form @submit.prevent="handleLogin">
              <q-input
                filled
                v-model="username"
                label="Username"
                type="text"
                required
                class="q-mb-md"
              />
              <q-input
                filled
                v-model="password"
                label="Password"
                type="password"
                required
                class="q-mb-md"
              />
              <q-btn type="submit" label="Login" color="primary" class="full-width q-mb-md" />
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from 'src/composables/useAuth'

const username = ref('')
const password = ref('')
const router = useRouter()
const { login } = useAuth()

const handleLogin = async () => {
  const success = await login(username.value, password.value)
  if (success) {
    console.log('Login successful')
    await router.push('/')
  } else {
    alert('Invalid credentials')
  }
}
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-card {
  width: 400px;
  max-width: 90%;
}

.full-width {
  width: 100%;
}
</style>
