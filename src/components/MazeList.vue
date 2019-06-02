<template dark>
  <div class="content">
    <h2>{{title}}</h2>

    <v-list v-if="error === ''" two-line>
      <template v-for="maze in mazes">
        <v-list-tile :key="maze.id + '-tile'" im>
          <v-list-tile :key="maze.id" class="testing">
            <img src="../assets/maze_32x32.png" class="mazeThumbnail">
          </v-list-tile>

          <v-list-tile-content :key="maze.id + '-content'">
            <v-list-tile-title v-html="maze.name"></v-list-tile-title>
            <v-list-tile-sub-title v-html="maze.id"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider :key="maze.id + '-divider'"></v-divider>
      </template>
    </v-list>
    <span class="error" v-else>{{error}}</span>
  </div>
</template>

<script>
  import MazeService from '../api/MazeService.ts';
  import Logger from '@mazemasterjs/logger';

  // configure logger
  const log = Logger.getInstance();

  export default {
      name: 'MazeList',
      data() {
          return {
              mazes: [],
              error: '',
              title: 'Maze List',
          };
      },
      methods: {},
      mounted() {
        log.debug(__filename, 'getMazes()', 'Mounted.');

        MazeService.GetAllMazes()
        .then(
          (mazes) => this.mazes = mazes,
          (err) => this.$emit('on-error', err),
        );
      },
  };
</script>

<style>
  .content {
      margin: auto;
      border: solid 1px darkslategray;
  }

  .testing {
      border: solid 1px green;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
  }

  .mazeThumbnail {
      border: solid 1px red;
      flex-shrink: 0;
      height: 100%;
      width: 100%;
      /*    font-size: calc(0vw + 0vh + 1vmin); */
  }
</style>
