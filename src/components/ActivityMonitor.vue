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
export default {
    name: 'ActivityMonitor',
};

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