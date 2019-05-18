<template>
    <v-app dark>
        <v-container>
            <v-toolbar app fixed clipped-left>
                <v-btn dark @click.stop="showMenu">
                    <v-toolbar-side-icon/>
                </v-btn>
                <v-toolbar-title class="headline text-uppercase">MazeMasterJS - Code Camp 2019</v-toolbar-title>
            </v-toolbar>

            <v-navigation-drawer v-model="menuVisible" absolute dark temporary>
                <v-list>
                    <v-list-tile avatar tag="div" @click.stop="hideMenu">
                        <v-list-tile-action >
                            <v-btn icon>
                                <v-icon>chevron_left</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>

                <v-list dense>
                    <v-divider light></v-divider>

                    <v-list-tile @click="menuNavigate('HomePage')">
                        <v-list-tile-action>
                            <v-icon>dashboard</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Home Page</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="menuNavigate('MazeListPage')">
                        <v-list-tile-action>
                            <v-icon>list</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Maze List</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="menuNavigate('ServicePage')">
                        <v-list-tile-action>
                            <v-icon>cloud_circle</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Service Reference</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                </v-navigation-drawer>
            
            <v-content>
                <component :is="currentPage" v-if="currentPage" @navigate="navigate"/>
            </v-content>
        </v-container>
    </v-app>
</template>

<script>
    import HomePage from './page/Home.vue';
    import MazeListPage from './page/MazeList.vue';
    import ServicePage from './page/Service.vue';

    export default {
        name: 'Layout',
        components: {
            HomePage,
            MazeListPage,
            ServicePage,
        },
        data() {
            return {
                menuVisible: null,
                currentPage: 'HomePage',
            };
        },
        methods: {
            showMenu() {
                this.menuVisible = true;
            },
            hideMenu() {
                this.menuVisible = false;
            },
            menuNavigate(page) {
                this.menuVisible = false;
                this.navigate(page);
            },
            navigate(page) {
                this.currentPage = page;
            },
        },
    };
</script>

<style lang="scss">

</style>
