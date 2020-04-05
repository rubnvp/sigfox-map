<template>
  <div>
    <h1>Sigfox API credentials</h1>
    <form @submit.prevent="login">
      <div>
        username: <input v-model="username" type="text">
      </div>
      <div>
        password: <input v-model="password" type="password">
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    username: '',
    password: '',
  }),

  methods: {
    login(){
      localStorage.setItem('username', this.username);
      localStorage.setItem('password', this.password);
      this.$router.push({ name: 'route-map' });
    },
  },
}
</script>