<template>
  <div>
    <h1>Sigfox API Maps</h1>
    <form @submit.prevent="login">
      <div>
        username: <input v-model="username" type="text">
      </div>
      <div>
        password: <input v-model="password" type="password">
      </div>
      <div>
        deviceId: <input v-model="deviceId" type="text">
      </div>
      <button type="submit">Show positions</button>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    username: '',
    password: '',
    deviceId: '',
  }),

  methods: {
    login(){
      localStorage.setItem('username', this.username);
      localStorage.setItem('password', this.password);
      localStorage.setItem('deviceId', this.deviceId);
      this.$router.push({ name: 'route-map' });
    },
  },
}
</script>