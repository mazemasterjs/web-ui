<template>
  <v-container dark class="GamePage">
    <game-player v-if="game" :game="game" class="Player" @exit="onExitGame" @on-error="onError"/>
    <game-list v-else @select-game="onSelectGame" @on-error="onError"/>
  </v-container>
</template>

<script>
  import GamePlayer from '../components/GamePlayer.vue';
  import GameList from '../components/GameList.vue';

  export default {
    name: 'GamePage',
    components: {
      GamePlayer,
      GameList,
    },
    data() {
      return {
        game: null,
      };
    },
    methods: {
      onError(error) {
        this.$emit('on-error', error);
      },
      onSelectGame(game) {
        this.game = game;
      },
      onExitGame() {
        this.game = null;
      },
    },
  };
</script>

<style lang="scss">
  .GamePage {
    .Player {
      width: 100%;
      height: 100%;
    }
  }
</style>
