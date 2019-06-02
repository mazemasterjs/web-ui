<template>
    <div class="ActionViewer">
        <v-toolbar dense dark>
            <v-toolbar-title>Action Details</v-toolbar-title>
            <v-spacer/>
            <v-toolbar-items>
                <v-btn icon @click="onHide">
                    <v-icon medium>cancel</v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-card>
            <v-card-title>
                <v-chip small :color="actionColor">
                    {{ action.action }}
                </v-chip>
                <v-chip small>
                    {{ actionDirection }}
                </v-chip>
                <v-chip small>
                    {{ actionLocation }}
                </v-chip>
            </v-card-title>

            <v-card-text>
                <v-expansion-panel expandable>
                    <v-expansion-panel-content>
                        <template #header>
                            Engram
                        </template>
                        <v-card>
                            <v-card-text> {{ action.engram }} </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content>
                        <template #header>
                            Score
                        </template>
                        <v-card>
                            <v-card-text> {{ action.score }} </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content>
                        <template #header>
                            Outcome
                        </template>
                        <v-list dense dark subheader three-line>
                            <v-list-tile
                                v-for="(outcome, n) in action.outcome"
                                :key="n"
                            >
                                <v-list-tile-content>
                                    {{ outcome }}
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import { DIRS } from '@mazemasterjs/shared-library/Enums';
    export default {
        name: 'ActionViewer',
        props: {
            action: {type: Object, required: true},
        },
        data() {
            return {
                currentPage: 1,
            };
        },
        methods: {
            onHide() {
                this.$emit('hide');
            },
        },
        computed: {
            actionColor() {
                if (this.action.action == 'MOVE') {
                    return '#196719';
                } else {
                    return null;
                }
            },
            actionDirection() {
                switch (this.action.direction) {
                    case DIRS.NONE: return 'None';
                    case DIRS.NORTH: return 'North';
                    case DIRS.EAST: return 'East';
                    case DIRS.SOUTH: return 'South';
                    case DIRS.WEST: return 'West';
                    default: return dir;
                }
            },
            actionLocation() {
                return this.action.location.row + ', ' + this.action.location.col;
            },
        },
    };
</script>

<style lang="scss">
    .ActionViewer {
    }
</style>