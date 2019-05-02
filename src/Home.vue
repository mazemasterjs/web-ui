<template>
  <v-app name="Home" dark>
    <v-container>
      <Header/>
      <v-content>
        <MazeList/>
      </v-content>
    </v-container>
  </v-app>
</template>

<script>
import Header from './components/Header';
import MazeList from './components/MazeList';
export default {
    name: 'Home',
    components: {
        Header,
        MazeList,
    },
};
</script>

<style>
</style>
