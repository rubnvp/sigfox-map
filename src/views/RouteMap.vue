<template>
  <div class="route-map">
    <div>
      <button @click="logout">Logout</button>
    </div>
    <div class="route-map__map-container">
      <GmapMap
        :center="{lat: 40.42689, lng: 2.17621e-38}"
        :zoom="11"
        map-type-id="terrain"
        style="width: 100%; height: 100%"
      >
        <GmapMarker
          v-for="marker in markers"
          :key="marker.id"
          :position="marker.position"
          :clickable="true"
          :draggable="true"
        />
      </GmapMap>
    </div>
  </div>
</template>

<script>
import { fetchSigfoxMessages } from '@/backendApi';
import { getEncodedCoords } from '@/utils';

export default {
  data: () => ({
    markers: [],
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
          this.markers = messages
            .map(m => ({id: m.seqNumber, encodedCoordinates: m.data}))
            .map(({id, encodedCoordinates}) => ({
              id,
              position: getEncodedCoords(encodedCoordinates),
            }));
          this.loading = false;
        });
    },
  },

  created() {
    this.fetchPositions();
  }
};
</script>

<style>
.route-map,
.route-map__map-container {
  height: 100%;
} 
</style>