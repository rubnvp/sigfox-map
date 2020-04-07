<template>
  <div class="route-map">
    <div>
      <button @click="logout">Exit</button>
    </div>
    <span v-if="loading">Loading...</span>
    <div v-else class="route-map__map-container">
      <GmapMap
        :center="markers[0].position"
        :zoom="16"
        map-type-id="terrain"
        style="width: 100%; height: 100%"
      >
        <GmapMarker
          v-for="marker in markers"
          :key="marker.id"
          :position="marker.position"
          :label="marker.id"
          :clickable="true"
          @click="showMarkerInfo(marker)"
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
    showMarkerInfo(marker) {
      window.alert(`Seq Num: ${marker.id}\nDate: ${marker.date}`);
    },
    fetchPositions() {
      this.loading = true;
      return fetchSigfoxMessages()
        .then(messages => {
          this.markers = messages
            .map(m => ({id: m.seqNumber, timestamp: m.time, encodedCoordinates: m.data}))
            .map(({id, timestamp, encodedCoordinates}) => ({
              id: `${id}`,
              date: new Date(timestamp),
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