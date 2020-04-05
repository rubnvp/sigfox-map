<template>
  <div class="home">
    <div>
      <button @click="logout">Logout</button>
    </div>
    My positions:
    <div v-if="loading">Loading...</div>
    <ul>
      <li v-for="position in positions" :key="position.id">
        seqNumber: {{ position.id }}
        lat: {{ position.lat }}
        long: {{ position.long }}
      </li>
    </ul>
  </div>
</template>

<script>
import { fetchSigfoxMessages } from '@/backendApi';
import { getEncodedCoords } from '@/utils';

export default {
  data: () => ({
    positions: [],
    loading: true,
  }),

  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ path: 'login' });
    },
    fetchPositions() {
      this.loading = true;
      return fetchSigfoxMessages()
        .then(messages => {
          this.positions = messages
            .map(m => ({id: m.seqNumber, encodedCoordinates: m.data}))
            .map(({id, encodedCoordinates}) => {
              const {lat, long} = getEncodedCoords(encodedCoordinates);
              return {id, lat, long};
            });
          this.loading = false;
        });
    },
  },

  created() {
    this.fetchPositions();
  }
};
</script>
