<template>
    <div class="GameControls">
        <div class="GameControlsRow">
            <span>Playback speed: {{ gameState.speed }}%</span>
        </div>
        <div class="GameControlsRow">
            <v-btn icon @click="onSpeedDown" :disabled="!canSpeedDown">
                <v-icon medium>remove_circle_outline</v-icon>
            </v-btn>
            <v-btn @click="onPlayPauseBtn">
                <v-icon medium>{{ playPauseIcon }}</v-icon>
            </v-btn>
            <v-btn @click="onRewind">
                <v-icon medium>replay</v-icon>
            </v-btn>
            <v-btn icon @click="onSpeedUp" :disabled="!canSpeedUp">
                <v-icon medium>add_circle_outline</v-icon>
            </v-btn>
        </div>
        <div class="GameControlsRow">
            <v-btn icon @click="onStep(-30)">
                <v-icon medium>replay_30</v-icon>
            </v-btn>
            <v-btn icon @click="onStep(-10)">
                <v-icon medium>replay_10</v-icon>
            </v-btn>
            <v-btn icon @click="onStep(-5)">
                <v-icon medium>replay_5</v-icon>
            </v-btn>
            <v-btn medium @click="onStep(-1)">
                <v-icon large>skip_previous</v-icon>
            </v-btn>
            <v-btn medium @click="onStep(1)">
                <v-icon large>skip_next</v-icon>
            </v-btn>
            <v-btn icon @click="onStep(5)">
                <v-icon medium>forward_5</v-icon>
            </v-btn>
            <v-btn icon @click="onStep(10)">
                <v-icon medium>forward_10</v-icon>
            </v-btn>
            <v-btn icon @click="onStep(30)">
                <v-icon medium>forward_30</v-icon>
            </v-btn>
        </div>
        <div class="GameControlsRow" v-if="allowManual">

        </div>
    </div>
</template>

<script>
    const MAX_SPEED = 400;
    const MIN_SPEED = 25;
    const SPEED_INCREMENT = 25;

    export default {
        name: 'GameControls',
        props: {
            gameState: {type: Object, required: true},
            allowManual: {type: Boolean, required: false, default: false},
        },
        methods: {
            // event handlers
            onPlayPauseBtn() {
                this.$emit('set-paused', !this.gameState.paused);
            },
            onSpeedUp() {
                let speed = this.gameState.speed + SPEED_INCREMENT;
                if (speed > MAX_SPEED) {
                    speed = MAX_SPEED;
                }
                this.$emit('set-speed', speed);
            },
            onSpeedDown() {
                let speed = this.gameState.speed - SPEED_INCREMENT;
                if (speed < MIN_SPEED) {
                    speed = MIN_SPEED;
                }
                this.$emit('set-speed', speed);
            },
            onRewind() {
                this.$emit('reset');
            },
            onStep(count) {
                this.$emit('step', count);
            },
        },
        computed: {
            playPauseIcon() {
                return this.gameState.paused ? 'play_circle_outline' : 'pause_circle_outline';
            },
            canSpeedUp() {
                return this.gameState.speed < MAX_SPEED;
            },
            canSpeedDown() {
                return this.gameState.speed > MIN_SPEED;
            },
            isPaused() {
                return this.gameState.paused;
            },
        },
    };
</script>

<style lang="scss">
    .GameControls {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: nowrap;

        .GameControlsRow {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            flex-wrap: nowrap;
        }
    }
</style>