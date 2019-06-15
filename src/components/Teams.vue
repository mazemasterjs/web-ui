<template dark>
  <div class="Teams">
    <br>
    <h1>TEAMS</h1>
    <input type="text" v-model="teamName" placeholder="name">
    <input type="text" v-model="teamLogo" placeholder="logo">
    <br>
    <input class="button" type="button" @click="createTeam()" value="submit">
    <template v-for="team in teams">
      <v-list-tile :key="team.id + '-tile'" im>
        <div id="logo">
          <img class="teamLogo" v-bind:src="team.logo">
        </div>
        <v-list-tile-title v-html="team.name"></v-list-tile-title>BOTS:
        <template v-for="bot in team.bots">
          <v-list-tile :key="bot.id + '-tile'" im>
            <v-list-tile-title v-html="bot.name"></v-list-tile-title>
            <v-list-tile-title v-html="bot.coder"></v-list-tile-title>
          </v-list-tile>
        </template>

        <!-- @Siri :: External resource links are unreliable!  Use material.io icons whenever possible: See Chris's post on Trello for samples: https://trello.com/c/YHw9weYI
        When not possible, download resources and store in the /assets folder (or static-content/images repo) and link to them there.-->
        <!-- <button v-on:click="deleteTeam(team.id)"><img src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Ftools-solid-icons-vol-2%2F72%2F59-512.png&f=1" style="height: 50px;" alt="Delete team"></button> -->

        <!-- seems like a lot of code to just add a tooltip - what was wrong good-old alt property? ... whatever, here it is -JD -->
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" v-on:click="deleteTeam(team.id)">
              <v-icon>delete</v-icon>
            </v-btn>
          </template>
          <span>Delete Team</span>
        </v-tooltip>
      </v-list-tile>
    </template>
    <br>
  </div>
</template>
<script>
  import Vue from 'vue';
  import axios from 'axios';
  import UUID from 'vue-uuid';
  import { uuid } from 'vue-uuid'; // Import uuid

  Vue.use(UUID);

  export default {
      data() {
          return {
              teamName: null,
              teamLogo: null,
              teams: null,
              error: null,
              id: null,
              dialog: false,
          };
      },
      mounted() {
          this.getTeams();
      },
      methods: {
          deleteTeam(teamId) {
              if (confirm('Are you sure?')) {
                  axios
                      .delete('http://mazemasterjs.com/api/team/delete/' + teamId)
                      .then((res) => this.getTeams())
                      .catch((err) => console.log(err));
              }
          },
          getTeams() {
              axios
                  .get('http://mazemasterjs.com/api/team/get')
                  .then((res) => (this.teams = res.data))
                  .catch((err) => console.log(err));
          },
          async createTeam() {
              await axios
                  .put('http://mazemasterjs.com/api/team/insert', {
                      id: uuid.v1().replace(/-/g, ''),
                      name: this.teamName,
                      logo: this.teamLogo,
                      bots: [],
                      trophies: [],
                  })
                  .then((res) => {
                      console.log(res);
                      this.getTeams();
                  })
                  .catch((err) => {
                      console.log(err);
                  });
          },
      },
  };
</script>

<style lang="scss">
  .Teams {
    .v-list__tile {
        height: 250px;
        max-width: 500px;
    }

    input {
        border: 1.5px solid white;
        margin: 5px;
    }

    .button {
        border: 2px solid black;
        color: #171717;
        font-weight: 800;
        background-color: rgb(65, 181, 161);
        margin-top: 20px;
        padding: 10px;
    }

    .teamLogo {
        height: 50px;
        width: 50px;
    }
  }
</style>
