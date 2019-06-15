<template dark>
  <div class="MazeList content">
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
            <button v-on:click="height=maze.height; width=maze.width; challenge=maze.challenge; seed=maze.seed; mazeName=maze.name; getMazeImage(height, width, challenge, seed, mazeName)">
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
      <!-- this below sends the mazeName, mazeImage, etc. to the mazeImage component -->
      <div id="mazeContainer">
      <maze-image :mazeId="mazeId" :mazeName="mazeName" :mazeImage="mazeImage"/>
      <activity-monitor/>
      </div>
    </v-list>
    <span class="error" v-else>{{error}}</span>
  </div>
</template>

<script>
  import MazeService from '../api/MazeService.ts';
  import Logger from '@mazemasterjs/logger';
  import MazeImage from './MazeImage.vue';
  import ActivityMonitor from './ActivityMonitor.vue';

  // configure logger
  const log = Logger.getInstance();

  export default {
      name: 'MazeList',
      data() {
        return {
            mazes: [],
            error: '',
            title: 'Maze List',
            mazeId: '3:5:7:TestMazeSeed',
            mazeName: 'Test Maze Seed',
            mazeImage: '',
            height: '',
            width: '',
            challenge: '',
            seed: '',
        };
      },
      methods: {
        //this method is an api call that's executed when the corresponding maze button in the Maze List is pressed
        getMazeImage(height, width, challenge, seed, mazeName) {
          console.log('maze stats:  '+ height + width + challenge + seed + mazeName);

          MazeService.GenerateMaze(width, height, challenge, mazeName, seed)
          .then(
            (maze) => (this.mazeImage = maze.textRender),
            (err) => this.$emit('on-error', err),
          );
        },
      },
      mounted() {
        log.debug(__filename, 'getMazes()', 'Mounted.');
        MazeService.GetAllMazes()
        .then(
          (mazes) => this.mazes = mazes,
          (err) => this.$emit('on-error', err),
        );
        this.getMazeImage(this.mazeId);
      },
      components: {
        MazeImage,
        ActivityMonitor,
      },
  };
</script>

<style lang="scss">
  .MazeList {
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

  #mazeContainer{
    display: flex;
    justify-content: space-around;
  }
}

</style>
