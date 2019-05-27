<template dark>
    <div id="activityMonitor">
        <h2>Activity</h2>
        <div class="activity">
            <div>
                Move
            </div>
            <div>
                Action
            </div>
            <div>
                Direction
            </div>
            <div>
                Cohesion
            </div>
        </div>
        <h2>Score</h2>
        <div class="score">
            <div>
                Round
            </div>
            <div>
                Moves
            </div>
            <div>
                Backtracks
            </div>
            <div>
                Bonus
            </div>
        </div>
    </div >
</template>


<script>
import axios from 'axios';

export default {
    activityMonitor: '#activityMonitor',
    //props are passed down from mazeList to mazeImage (parent component to this, child, component)
    props: {
    //this is where data to be passed down goes
  },
      data() {
          return {
              //add any data here you want that just needs to be accessed in this component Or passed to a child
          };
      },   
}

</script>

<style>
#activityMonitor{
display: flex;
flex-direction: column;
}

.activity, .score {
display: flex;
justify-content: space-around;
}

.activity div, .score div{
border: 1px solid white;
width: 25%;
height: 30em;
padding: 0em 2.5em;
}

.score div{
height: 5em;
}

</style>