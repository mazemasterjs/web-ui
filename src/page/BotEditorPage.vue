<template>
  <v-container dark>
    <BotEditor/>
  </v-container>
</template>


<script>
  import BotEditor from '../components/BotEditor.vue';

  export default {
      name: 'BotPage',
      components: {
          BotEditor,
      },
  };
</script>

<style>
</style>
