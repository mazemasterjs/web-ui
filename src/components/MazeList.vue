<template dark>
  <div class="content">
    <h2>{{title}}</h2>
    <v-list v-if="error === ''" two-line>
<div class="dropdown">
  <button class="dropbtn">List of Mazes</button>
<div class="dropdown-content">
      <template v-for="maze in mazes">
    <a :key="maze.id" href="#">
        <v-list-tile :key="maze.id + '-tile'" im>
          <v-list-tile :key="maze.id" class="testing">
            <img src="../assets/maze_32x32.png" class="mazeThumbnail">
          </v-list-tile>
          <v-list-tile-content :key="maze.id + '-content'">
            <button v-on:click="mazeId = maze.id; mazeName=maze.name; getApi(mazeId)">
            <v-list-tile-title v-html="maze.name"></v-list-tile-title>
            <v-list-tile-sub-title v-html="maze.id"></v-list-tile-sub-title>
            </button>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider :key="maze.id + '-divider'"></v-divider>
        </a>
      </template>
      </div>
</div>

          <maze-image :mazeId="mazeId" :mazeName="mazeName" :mazeImage="mazeImage"></maze-image>
    </v-list>
    <span class="error" v-else>{{error}}</span>
  </div>
</template>

<script>
  import axios from 'axios';
  import Logger, { LOG_LEVELS } from '@mazemasterjs/logger';
  import MazeImage from './MazeImage.vue';

  // configure logger
  const log = Logger.getInstance();

  export default {
      name: 'MazeList',
      data: function () {
          return {
              mazes: [],
              error: '',
              title: 'Maze List',
              mazeId: '3:5:7:TestMazeSeed',
              mazeName: 'Test Maze Seed',
              mazeImage: ''
          };
      },
      methods: {
      getApi(mazeId) {
          console.log(process.env.VUE_APP_API_MAZE_URL + '/get/' + mazeId)
          axios
            .get(process.env.VUE_APP_API_MAZE_URL + '/get/' + mazeId)
            .then(res => (this.mazeImage = res.data.textRender))
            .catch((err) => (console.log(err)))
         }
      },
      mounted() {
          const apiUrl = process.env.VUE_APP_API_MAZE_URL + '/get/all';
          log.debug(__filename, 'getMazes()', 'Mounted.');
          axios
              .get(apiUrl)
              .then((res) => {
                  log.debug(__filename, 'getMazes()', res.data.length + ' Mazes returned.');
                  this.mazes = res.data;
              })
              .catch((err) => {
                  log.error(__filename, 'getMazeListData().catch()', 'Error ->', err);
                  this.error = err.message + ' from ' + apiUrl;
              });
          this.getApi(this.mazeId)
      },  
      components: {
        MazeImage: MazeImage
      }
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



  /* Dropdown Button */
.dropbtn {
  background-color: #4CAF50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {display: block;}

</style>
