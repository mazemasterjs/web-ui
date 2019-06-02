<template>
  <v-container dark class="DebugPage">
    <div class="Split">
      <div class="Title">
        <h2>This is a debug page for testing components.</h2>
        <br/>
        <h3>You can add your component here, and uncomment the debug page reference in the Layout.vue.</h3>
      </div>
    </div>
    <div>
    </div>
  </v-container>
</template>

<script>

import Logger from '@mazemasterjs/logger';

// configure logger
const log = Logger.getInstance();

export default {
    name: 'DebugPage',
};
</script>

<style lang="scss">
  .DebugPage {
    .Title {
      flex-grow: 0;

      h2 {
        margin: auto;
        padding: 0.5em;
      }
      h3 {
        margin: auto;
        padding: 0.5em;
        font-weight: normal;
        font-size: 115%;
      }
    }

    .Split {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      flex-wrap: nowrap;
    }

    .Row {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      >* {
        padding: 10px;
      }
    }
  }
</style>
