<template>
  <v-container dark>
    <ServiceViewer/>
  </v-container>
</template>

<script>
import ServiceViewer from '../components/ServiceViewer.vue';

export default {
    name: 'ServicePage',
    components: {
        ServiceViewer,
    },
};
</script>

<style>
</style>
