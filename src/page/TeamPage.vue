<template>
  <v-container dark>
    <Teams @on-error="onError"/>
  </v-container>
</template>

<script>
import Teams from '../components/Teams.vue';

export default {
  name: 'TeamPage',
  components: {
      Teams,
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
