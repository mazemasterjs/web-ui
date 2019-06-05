<template dark>
    <div class="GameList">
        <div v-if="gameList">
            <v-toolbar dense dark>
                <v-toolbar-title>Available Games</v-toolbar-title>
                <v-spacer/>
                <v-toolbar-items>
                    <v-pagination v-model="currentPage" :length="pageCount"/>
                </v-toolbar-items>
            </v-toolbar>
            <v-list dense dark subheader three-line>
                <v-list-tile
                    v-for="(game, n) in currentGames"
                    :key="n"
                >
                    <v-list-tile-content>
                        <v-list-tile-title>{{ game.id }}</v-list-tile-title>
                        <v-list-tile-sub-title>
                            Maze: {{ getMazeDetails(game.maze) }}<br>
                            Bot: {{ game.teamId }} / {{ game.botId }}
                        </v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                        <v-btn small @click="onSelect(game)">
                            <v-icon small>play_arrow</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
        </div>
        <loader v-else>Loading game list...</loader>
    </div>
</template>

<script>

    import Loader from './util/Loader.vue';
    import { GAME_STATES, GAME_MODES, DIRS, PLAYER_STATES } from '@mazemasterjs/shared-library/Enums';
    import MazeService from '../api/MazeService.ts';

    const GAMES_PER_PAGE = 10;

    export default {
        name: 'GameList',
        components: {
            Loader,
        },
        data() {
            return {
                gameList: null,
                currentPage: 1,
            };
        },
        methods: {
            onSelect(game) {
                this.$emit('select-game', game);
            },
            colorForState(state) {
                switch (state) {
                    case GAME_STATES.NEW:
                    case GAME_STATES.IN_PROGRESS:
                    case GAME_STATES.FINISHED:
                    case GAME_STATES.ABORTED:
                    case GAME_STATES.ERROR:
                    default: return '#696969';
                }
            },
            getMazeDetails(maze) {
                return maze.width + 'x' + maze.height + ', difficulty' + maze.challenge;
            },
            createMoveAction(dir, tmpLoc) {
                if (dir === DIRS.NORTH) {
                    tmpLoc.row--;
                }
                if (dir === DIRS.SOUTH ) {
                    tmpLoc.row++;
                }
                if (dir === DIRS.WEST) {
                    tmpLoc.col--;
                }
                if (dir === DIRS.EAST ) {
                    tmpLoc.col++;
                }
                const loc = {
                    row: tmpLoc.row,
                    col: tmpLoc.col,
                };
                return {
                    action: 'MOVE',
                    direction: dir,
                    engram: null,
                    location: loc,
                    mazeId: null,
                    score: null,
                    playerState: PLAYER_STATES.STANDING,
                    outcome: [],
                    trophies: [],
                    botCohesion: [],
                };
            },
            createDefaultMazeList() {
                MazeService.GenerateMaze(5, 5, 1, 'test', 'abc')
                .then(
                    (maze) => {
                        const tmpLoc = {
                            row: maze.startCell.row,
                            col: maze.startCell.col,
                        };

                        const actions = new Array();
                        actions.push(this.createMoveAction(DIRS.NONE, tmpLoc));
                        actions.push(this.createMoveAction(DIRS.WEST, tmpLoc));
                        actions.push(this.createMoveAction(DIRS.WEST, tmpLoc));
                        actions.push(this.createMoveAction(DIRS.SOUTH, tmpLoc));
                        actions.push(this.createMoveAction(DIRS.SOUTH, tmpLoc));
                        actions.push(this.createMoveAction(DIRS.SOUTH, tmpLoc));
                        actions.push(this.createMoveAction(DIRS.SOUTH, tmpLoc));
                        actions.push(this.createMoveAction(DIRS.EAST, tmpLoc));
                        actions.push(this.createMoveAction(DIRS.NORTH, tmpLoc));
                        actions.push(this.createMoveAction(DIRS.EAST, tmpLoc));
                        actions.push(this.createMoveAction(DIRS.EAST, tmpLoc));
                        actions.push(this.createMoveAction(DIRS.SOUTH, tmpLoc));
                        actions.push(this.createMoveAction(DIRS.WEST, tmpLoc));
                        actions.push(this.createMoveAction(DIRS.SOUTH, tmpLoc));

                        const game = {
                            id: 'Test Game',
                            state: GAME_STATES.NEW,
                            maze,
                            mode: GAME_MODES.SINGLE_PLAYER,
                            score: null,
                            player: null,
                            actions,
                            round: 0,
                            teamId: 'teamsters',
                            botId: 'Roomba',
                            lastAccessed: 0,
                        };

                        this.gameList = new Array();
                        this.gameList.push(game);
                    },
                    (err) => this.$emit('on-error', err),
                );
            },
        },
        computed: {
            currentPageIndex() {
                return this.currentPage - 1;
            },
            pageCount() {
                return Math.ceil(this.gameList.length / GAMES_PER_PAGE);
            },
            currentGames() {
                const pageStart = this.currentPageIndex * GAMES_PER_PAGE;
                const pageEnd = Math.min(pageStart + GAMES_PER_PAGE, this.gameList.length);

                return this.gameList.slice(pageStart, pageEnd);
            },
        },
        mounted() {
            // TODO query game list
            this.createDefaultMazeList();
        },
    };
</script>

<style lang="scss">
    .GameList {
        .GameDetails {
            display: flex;
            flex-direction: column;

            h4 {
                padding: 0;
                margin: 0;
                font-weight: normal;
                font-size: 100%;
            }
        }
    }
</style>