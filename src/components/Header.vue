<template>
  <v-toolbar app fixed clipped-left>
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title class="headline text-uppercase">MazeMasterJS - Code Camp 2019</v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
    data: () => ({
        drawer: null,
    }),
    props: {
        source: String,
    },
};
</script>

<style>
</style>
