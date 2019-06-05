<template dark>
    <table class="LiveMazeViewer">
        <tr v-for="(row, x) in maze.cells" :key="x">
            <LiveMazeViewerCell
                v-for="(cell, y) in maze.cells[x]"
                :key="y"
                :cell="cell"
                :maze="maze"
                :bot-location="botLocation"
                :size="cellSize"
            />
        </tr>
    </table>
</template>

<script>

    import LiveMazeViewerCell from './LiveMazeViewerCell.vue';

    export default {
        name: 'LiveMazeViewer',
        components: {
            LiveMazeViewerCell,
        },
        props: {
            maze: {type: Object, required: true},
            botLocation: {type: Object, required: true},
            cellSize: {type: Number, required: false, default: 30},
        },
    };
</script>

<style lang="scss">
    .LiveMazeViewer {
        border-collapse: collapse;
    }
</style>