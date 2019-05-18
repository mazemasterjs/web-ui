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
