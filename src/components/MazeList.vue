<template>
  <div>
    <h1>{{title}}</h1>
    <h3>{{message}}</h3>
    <p>{{getMazes()}}</p>
  </div>
</template>

<script>
  export default {
      name: 'MazeList.vue',
      props: {
          ttl: String,
          msg: String,
      },
      data() {
          return {
              title: 'MazeList',
              message: 'Working pretty well so far...',
          };
      },
      methods: {
          getMazes() {
              axios
                  .get('http://mazemasterjs.com/api/maze/get/all')
                  .then((res) => {
                      const mazes = res.data;
                      this.data = mazes;
                  })
                  .catch((err) => {
                      log.error(__filename, 'getMazeListData().catch()', 'Error ->', err);
                  });
          },
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


