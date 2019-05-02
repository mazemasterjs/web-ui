<template>
  <div class="title">
    <h1>{{title}}</h1>
    <h3>{{message}}</h3>
  </div>
</template>

<script>
  export default {
      name: 'Test.vue',
      props: {
          ttl: String,
          msg: String,
      },
      data() {
          return {
              title: 'Test App',
              message: 'Working pretty well so far...',
          };
      },
  };
</script>

<style scoped>
  h1 {
      text-align: center;
  }
  h3 {
      text-align: center;
      margin-top: 10px;
  }
</style>
