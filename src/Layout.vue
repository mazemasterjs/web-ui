<template>
  <v-app dark class="MazeMasterJS">
    <!-- Title bar -->
    <v-toolbar app fixed clipped-left>
      <v-btn icon dark @click.stop="showMenu">
        <v-toolbar-side-icon/>
      </v-btn>
      <v-toolbar-title class="headline text-uppercase">MazeMasterJS - Code Camp 2019</v-toolbar-title>
    </v-toolbar>

    <!-- Left-nav menu -->
    <v-navigation-drawer v-model="menuVisible" fixed dark temporary>
      <v-list>
        <v-list-tile avatar tag="div" @click.stop="hideMenu">
          <v-list-tile-action>
            <v-btn icon>
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-list dense>
        <v-divider light></v-divider>

        <v-list-tile @click="menuNavigate('home-page')">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home Page</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="menuNavigate('team-page')">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Teams Page</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="menuNavigate('maze-list-page')">
          <v-list-tile-action>
            <v-icon>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Maze List</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="menuNavigate('service-page')">
          <v-list-tile-action>
            <v-icon>cloud_circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Service Reference</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="menuNavigate('game-page')">
          <v-list-tile-action>
            <v-icon>videogame_asset</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Game Player</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="menuNavigate('bot-editor-page')">
          <v-list-tile-action>
            <v-icon>code</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Bot Editor</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="menuNavigate('debug-page')">
          <v-list-tile-action>
            <v-icon>memory</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Development Debug Page</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <!-- Display any error messages at the top -->
      <v-alert
        v-for="error in errors"
        :key = "error.id"
        dismissible
        type="error"
        :value="true"
      >
        {{ error.message }}
      </v-alert>

      <!-- Display the page -->
      <component
        :is="currentPage"
        v-if="currentPage"
        @navigate="navigate"
        @on-error="onError"
        class="MainContent"
      />
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: 'Layout',
    components: {},
    data() {
      return {
        menuVisible: null,
        currentPage: 'home-page',
        errors: [],
        nextErrorId: 0,
      };
    },
    methods: {
      showMenu() {
        this.menuVisible = true;
      },
      hideMenu() {
        this.menuVisible = false;
      },
      menuNavigate(page) {
        this.menuVisible = false;
        this.navigate(page);
      },

      // Event handlers
      navigate(page) {
        if (page != this.currentPage) {
          this.currentPage = page;
          this.errors = [];
        }
      },
      onError(error) {
        this.errors.push(this.makeError(error));
      },

      // Error handling
      makeError(message) {
        let error = {
          id: this.nextErrorId,
          message: message,
        };

        this.nextErrorId++;

        return error;
      },
    },
  };
</script>

<style lang="scss">
  .MazeMasterJS {
      box-sizing: border-box;

      .MainContent {
          width: 100%;
          height: 100%;
      }
  }
</style>
