<template>
  <v-container dark>
    <ServiceViewer @on-error="onError"/>
  </v-container>
</template>

<script>
import ServiceViewer from '../components/ServiceViewer.vue';

export default {
  name: 'ServicePage',
  components: {
      ServiceViewer,
  },
  methods: {
    onError(err) {
      this.$emit('on-error', err);
    },
  },
};
</script>

<style>
</style>
