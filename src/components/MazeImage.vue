<template dark>
    <pre id="app">
    <br/>
    {{mazeName}}
    <br/>
    {{mazeImage}}
    <br/>
    </pre>
</template>


<script>
import axios from 'axios';

export default {
    app: '#app',
     //props are passed down from mazeList to mazeImage (parent component to this, child, component)
    props: {
    mazeId: {
    type: String,
    required: true
   },
   mazeImage: null,
   mazeName: null
  },
      data() {
          return {
              //add any data here you want that just needs to be accessed in this component Or passed to a child
          };
      },   
}

</script>

<style>
.btn {
    border: 1px solid white;
    font-size: 18px;
}
</style>
