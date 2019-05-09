<template>
  <v-app name="Home" dark>
    <v-container>
      <Header/>
      <v-content>
        <MazeList/>
        <!--<ServiceViewer/>-->
      </v-content>
    </v-container>
  </v-app>
</template>

<script>
import Header from './components/Header';
import MazeList from './components/MazeList';
import ServiceViewer from './components/ServiceViewer';

export default {
    name: 'Home',
    components: {
        Header,
        MazeList,
        ServiceViewer,
    },
};
</script>

<style>
</style>
