<template dark>
    <div class="GamePlayer">
        <div v-if="game" class="MainContent">
            <v-toolbar dense dark>
                <v-toolbar-title> {{ gameType }} - {{ game.id }} </v-toolbar-title>
                <v-spacer/>
                <v-toolbar-items>
                    <v-btn icon @click="onShowMenu">
                        <v-icon medium>apps</v-icon>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <div class="FlowLayout" style="margin-top: 5px">
                <div class="SectionFrame" style="width: 60%">
                    <div class="Section">
                        <live-maze-viewer
                            :maze="game.maze"
                            :botLocation="currentAction.location"
                            :cell-size="mazeCellSize"
                        />
                    </div>
                </div>
                <div class="SectionFrame" style="width: 40%">
                    <div class="Section">
                        <game-log
                            :actions="game.actions"
                            :gameState="gameState"
                            style="width: 100%; height: 100%;"
                        />
                    </div>
                </div>
                <div class="SectionFrame" style="width: 100%">
                    <div class="Section">
                        <game-controls
                            :gameState="gameState"
                            :game="game"
                            @set-speed="onSetSpeed"
                            @set-paused="onSetPaused"
                            @step="onStep"
                            @reset="onReset"
                        />
                    </div>
                </div>
            </div>
        </div>
        <loader v-else>Loading game...</loader>
    </div>
</template>

<script>

    import SplitPanel from './util/SplitPanel.vue';
    import Loader from './util/Loader.vue';

    import LiveMazeViewer from './LiveMazeViewer.vue';
    import GameControls from './GameControls.vue';
    import GameLog from './GameLog.vue';

    import { GAME_MODES } from '@mazemasterjs/shared-library/Enums';

    export default {
        name: 'GamePlayer',
        components: {
            SplitPanel,
            Loader,
            LiveMazeViewer,
            GameControls,
            GameLog,
        },
        props: {
            game: {type: Object, required: true},
        },
        data() {
            return {
                gameState: {
                    speed: 100,
                    paused: true,
                    actionNumber: 0,
                },
                tickTimer: null,
            };
        },
        methods: {
            // Event handlers
            onSetSpeed(speed) {
                this.gameState.speed = speed;
            },
            onSetPaused(paused) {
                this.gameState.paused = paused;
            },
            onStep(steps) {
                let newSteps = this.gameState.actionNumber + steps;
                if (newSteps >= this.game.actions.length) {
                    newSteps = this.game.actions.length - 1;
                }
                if (newSteps < 0) {
                    newSteps = 0;
                }
                this.gameState.actionNumber = newSteps;
            },
            onReset() {
                this.gameState.actionNumber = 0;
            },
            onShowMenu() {
                this.$emit('exit');
            },

            runTick() {
                if (this.game) {
                    if (!this.gameState.paused && this.gameState.actionNumber < this.game.actions.length - 1) {
                        this.gameState.actionNumber++;
                    }
                }
                this.setupTickTimer();
            },
            setupTickTimer() {
                this.tickTimer = window.setTimeout(this.runTick, 1000.0 / (this.gameState.speed / 100.0));
            },
            clearTickTimer() {
                if (this.tickTimer) {
                    window.clearTimeout(this.tickTimer);
                }
            },
        },
        computed: {
            currentAction() {
                return this.game.actions[this.gameState.actionNumber];
            },
            gameType() {
                if (this.game.mode === GAME_MODES.SINGLE_PLAYER) {
                    return 'Singleplayer';
                } else if (this.game.mode === GAME_MODES.MULTI_PLAYER) {
                    return 'Multiplayer';
                } else {
                    return this.game.mode;
                }
            },
            mazeCellSize() {
                const largestSize = Math.max(this.game.maze.width, this.game.maze.height);

                // 5 cells is 50px per cell so 250 px total
                const pixelScale = 5.0 / largestSize;

                const pixelsPerCell = Math.ceil(50.0 * pixelScale);

                return Math.max(10, Math.min(pixelsPerCell, 50)) + 'px';
            },
        },
        mounted() {
            this.setupTickTimer();
        },
        destroyed() {
            this.clearTickTimer();
        },
    };
</script>

<style lang="scss">
    .GamePlayer {
        width: 100%;
        height: 100%;

        .FlowLayout {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: stretch;
            flex-wrap: wrap;
        }

        .SectionFrame {
            padding: 0.25em;
            
            .Section {
                width: 100%;
                height: 100%;
                padding: 0.5em;

                background-color: dimgray;

                border: 1px solid black;
                border-radius: 4px;

                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
            }
        }
    }
</style>