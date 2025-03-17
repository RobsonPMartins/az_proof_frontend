<template>
  <div class="container">
    <!-- Lado esquerdo com o formulário -->
    <div class="left-side">
      <div class="form-container">
        <img src="../assets/logo.svg" alt="Logo">
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">E-mail</label>
            <input type="email" id="email" v-model="email" placeholder="seuemail@exemplo.com" required>
          </div>
          <div class="form-group">
            <label for="password">Senha</label>
            <input type="password" id="password" v-model="password" required>
          </div>
          <div class="forgot-password">Esqueci a senha</div>
          <button type="submit" class="btn" :disabled="loading">Entrar</button>
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </form>
      </div>
    </div>

    <!-- Lado direito com a imagem -->
    <div class="right-side">
      <img src="../assets/imagem.svg" alt="Tela de login">
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { login } from '../services/auth';

export default {
  name: "LoginScreen",
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      loading: false,
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.errorMessage = '';

      const result = await login(this.email, this.password);

      if (result.success) {
        this.router.push('/dashboard');
      } else {
        this.errorMessage = result.message;
      }

      this.loading = false;
    },
  },
};
</script>


<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.left-side {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--white-color);
}

.right-side {
  width: 50%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-container {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}

.logo {
  font-size: 24px;
  color: var(--gray-color);
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 14px;
  color: var(--black-color);
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--gray-color);
  border-radius: 5px;
}

.forgot-password {
  text-align: right;
  font-size: 12px;
  color: var(--primary-color);
  cursor: pointer;
  margin-bottom: 15px;
}

.btn {
  width: 100%;
  background-color: var(--primary-color);
  color: var(--white-color);
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #e5675b;
}

img {
  width: 100%;
  height: auto;
}
</style>