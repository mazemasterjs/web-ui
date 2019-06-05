<template>
  <v-container dark>
    <MazeList @on-error="onError"/>
  </v-container>
</template>

<script>
import MazeList from '../components/MazeList';

export default {
    name: 'MazeListPage',
    components: {
        MazeList,
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
