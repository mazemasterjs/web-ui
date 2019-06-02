<template>
    <div class="GameLog">
        <v-toolbar dense dark>
            <v-toolbar-title>Actions</v-toolbar-title>
            <v-spacer/>
            <v-toolbar-items>
                <v-pagination v-model="currentPage" :length="pageCount" :total-visible="3"/>
            </v-toolbar-items>
        </v-toolbar>
        <v-list dense dark subheader>
            <v-list-tile
                v-for="(action, n) in displayActions"
                :key="n"
                avatar
                @click="showAction(action)"
            >
                <v-list-tile-avatar>
                    <v-chip small :color="colorForAction(action)">
                        {{ action.action }}
                    </v-chip>
                </v-list-tile-avatar>

                <v-list-tile-content>
                    <div class="LogDetails">
                        <div>Direction: {{ translateDirection(action.direction)}}</div>
                        <div>Location: {{ translateLocation(action.location) }}</div>
                    </div>
                </v-list-tile-content>

                <v-list-tile-action>
                    <v-chip small color="#6b1414" v-if="n === 0">Latest</v-chip>
                </v-list-tile-action>
            </v-list-tile>
        </v-list>
        <br/>
        <action-viewer
            :action="selectedAction"
            @hide="showAction(null)"
            v-if="selectedAction"
        />
    </div>
</template>

<script>
    import { DIRS } from '@mazemasterjs/shared-library/Enums';
    import ActionViewer from './ActionViewer.vue';

    const ACTIONS_PER_PAGE = 7;

    export default {
        name: 'GameLog',
        props: {
            actions: {type: Array, required: true},
            gameState: {type: Object, required: true},
        },
        components: {
            ActionViewer
        },
        data() {
            return {
                currentPage: 1,
                selectedAction: null,
            };
        },
        methods: {
            colorForAction(action) {
                if (action.action == 'MOVE') {
                    return '#196719';
                } else {
                    return null;
                }
            },
            translateDirection(dir) {
                switch (dir) {
                    case DIRS.NONE: return 'None';
                    case DIRS.NORTH: return 'North';
                    case DIRS.EAST: return 'East';
                    case DIRS.SOUTH: return 'South';
                    case DIRS.WEST: return 'West';
                    default: return dir;
                }
            },
            translateLocation(location) {
                return location.row + ', ' + location.col;
            },
            convertActionNumber(index) {
                return this.currentActions.length - index;
            },
            showAction(action) {
                this.selectedAction = action;
            },
        },
        computed: {
            currentActions() {
                if (this.actions.length === 0) {
                    return new Array();
                }
                return this.actions.slice(0, this.gameState.actionNumber + 1).reverse();
            },
            displayActions() {
                const pageStart = this.currentPageIndex * ACTIONS_PER_PAGE;
                const pageEnd = Math.min(pageStart + ACTIONS_PER_PAGE, this.currentActions.length)

                return this.currentActions.slice(pageStart, pageEnd);
            },
            pageCount() {
                return Math.ceil(this.currentActions.length / ACTIONS_PER_PAGE);
            },
            currentPageIndex() {
                return this.currentPage - 1;
            },
        },
    };
</script>

<style lang="scss">
    .GameLog {
        padding: 5px;

        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
    }
</style>