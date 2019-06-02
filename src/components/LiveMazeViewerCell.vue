<template dark>
    <td
        class="LiveMazeViewerCell"
        :class="cellClasses"
        :style="cellStyle"
    >
        <div
            v-if="iconType"
            class="IconContainer"
        >
            <v-icon
                dark
                :size="iconSize"
                color="black"
            >
                {{ iconType }}
            </v-icon>
        </div>
    </td>
</template>

<script>
    import { DIRS, CELL_TAGS, CELL_TRAPS } from '@mazemasterjs/shared-library/Enums';

    export default {
        name: 'LiveMazeViewerCell',
        props: {
            maze: {type: Object, required: true},
            cell: {type: Object, required: true},
            botLocation: {type: Object, required: true},
            size: {type: String, required: true}
        },
        computed: {
            cellClasses() {
                return {
                    // Walls
                    WallTop: !(this.cell.exits & DIRS.NORTH),
                    WallRight: !(this.cell.exits & DIRS.EAST),
                    WallBottom: !(this.cell.exits & DIRS.SOUTH),
                    WallLeft: !(this.cell.exits & DIRS.WEST),

                    // Cell type
                    Entrance: this.isEnter,
                    Exit: this.isExit,
                };
            },
            cellStyle() {
                return {
                    width: this.size,
                    height: this.size,
                };
            },
            isEnter() {
                return this.maze.startCell.row === this.cell.pos.row && this.maze.startCell.col === this.cell.pos.col;
            },
            isExit() {
                return this.maze.finishCell.row === this.cell.pos.row && this.maze.finishCell.col === this.cell.pos.col;
            },
            iconType() {
                if (this.botLocation.row === this.cell.pos.row && this.botLocation.col === this.cell.pos.col) {
                    return 'face';
                }

                if (this.cell.notes.length > 0) {
                    return 'insert_comment';
                }
                if (this.cell.tags & CELL_TAGS.LAVA) {
                    return 'flash_on';
                }

                if (this.cell.trap & CELL_TRAPS.PIT) {
                    return 'flash_on';
                }
                if (this.cell.trap & CELL_TRAPS.BEARTRAP) {
                    return 'flash_on';
                }
                if (this.cell.trap & CELL_TRAPS.TARPIT) {
                    return 'flash_on';
                }
                if (this.cell.trap & CELL_TRAPS.FLAMETHOWER) {
                    return 'flash_on';
                }

                return null;
            },
            iconSize() {
                return ((this.size * 2.0) / 3.0) + 'px';
            },
        },
    };
</script>

<style lang="scss">
    .LiveMazeViewerCell {
        border: 1px solid lightgrey;

        margin: 0;
        padding: 0;

        background-color: white;

        // Walls
        &.WallTop {
            border-top: 2px solid black;
        }
        &.WallRight {
            border-right: 2px solid black;
        }
        &.WallBottom {
            border-bottom: 2px solid black;
        }
        &.WallLeft {
            border-left: 2px solid black;
        }

        // Cell type
        &.Entrance {
            background-color: green;
        }
        &.Exit {
            background-color: red;
        }

        .IconContainer {
            width: 100%;
            height: 100%;

            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>