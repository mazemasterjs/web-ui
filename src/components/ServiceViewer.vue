<template dark>
    <v-card class="ServiceViewer">
        <!-- Overall page header -->
        <v-card-title primary-title class="PageTitle">
            <h2>MazeMasterJS REST Service</h2>
        </v-card-title>
        
        <v-divider dark/>
        
        <!-- Error display -->
        <template v-if="error">
            <v-card-text class="Error">{{ error }}</v-card-text>
            <v-divider dark/>
        </template>
        
        <!-- Service details section -->
        <v-expansion-panel expand popout>
            <v-expansion-panel-content>
                <template v-slot:header >
                    <h2>Service details</h2>
                </template>

                <v-card>
                    <v-card-text>
                        <table class="PropertyGrid">
                            <tr>
                                <td><h4>Service name:</h4></td>
                                <td>{{ service.name }}</td>
                            </tr>
                            <tr>
                                <td><h4>Service URL:</h4></td>
                                <td>{{ service.baseUrl }}</td>
                            </tr>
                        </table>
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>

            <!-- Endpoints list section -->
            <v-expansion-panel-content>
                <template v-slot:header>
                    <h2>Endpoints</h2>
                </template>

                <v-card>
                    <v-expansion-panel expand popout>

                        <v-expansion-panel-content v-for="(endpoint, n) in service.endpoints" :key="n">
                            <template v-slot:header>
                                <div class="SplitTitle">
                                    <h3>{{ endpoint.name }}: </h3>
                                    <p>{{ endpoint.title }}</p>
                                </div>
                            </template>

                            <!-- Endpoint details section -->
                            <v-card>
                                <v-card-text>
                                    <p>
                                        {{ endpoint.description }}
                                    </p>

                                    <table class="PropertyGrid">
                                        <tr>
                                            <td><h4>URL:</h4></td>
                                            <td>/{{endpoint.url}}</td>
                                        </tr>
                                        <tr>
                                            <td><h4>Method:</h4></td>
                                            <td>{{endpoint.method}}</td>
                                        </tr>
                                        <tr>
                                            <td><h4>Content Type:</h4></td>
                                            <td>{{endpoint.contentType}}</td>
                                        </tr>
                                    </table>

                                    <!-- Endpoint arguments section -->
                                    <template v-if="endpoint.arguments.length > 0">
                                        <v-divider dark/>
                                        <v-card>
                                            <v-card-title primary-title>
                                                <h3>Arguments:</h3>
                                            </v-card-title>

                                            <v-card-text>
                                                <v-expansion-panel expand popout>
                                                    <v-expansion-panel-content v-for="(argument, n) in endpoint.arguments" :key="n" class="ArgumentEntry">
                                                        <template v-slot:header>
                                                            <div class="SplitTitle">
                                                                <h3>{{ argument.name }}: </h3>
                                                                <p>{{ argument.title }}</p>
                                                            </div>
                                                        </template>
                                                        <v-divider/>
                                                        
                                                        <v-card>
                                                            <v-card-text>
                                                                <p>
                                                                    {{ argument.description}}
                                                                </p>
                                                                <table class="PropertyGrid">
                                                                    <tr>
                                                                        <td><h4>Type:</h4></td>
                                                                        <td>{{ argument.type }}</td>
                                                                    </tr>
                                                                </table>
                                                            </v-card-text>
                                                        </v-card>
                                                    </v-expansion-panel-content>
                                                </v-expansion-panel>
                                            </v-card-text>
                                        </v-card>
                                    </template>
                                </v-card-text>
                            </v-card>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-card>
</template>

<script>

    import axios from 'axios';
    import Logger from '@mazemasterjs/logger';

    // configure logger
    const log = Logger.getInstance();

    export default {
        data() {
            return {
                service: {
                    name: null,
                    baseUrl: null,
                    endpoints: [],
                },
                error: null,
            };
        },
        created() {
            log.debug(__filename, 'mounted()', 'Mounted.');

            const apiUrl = process.env.VUE_APP_API_MAZE_URL + '/service';
            axios
                .get(apiUrl)
                .then((res) => {
                    this.service = res.data;

                    log.debug(__filename, 'mounted().then()', this.service.endpoints.length + ' endpoints returned.');
                })
                .catch((err) => {
                    log.error(__filename, 'mounted().catch()', 'Error ->', err);

                    this.error = err.message + ' from ' + apiUrl;
                });
        },
    };
</script>

<style lang="scss">
    .ServiceViewer {
        h1, h2, h3, h4, h5, p {
            margin: 0;
            padding: 0;
        }

        .v-expansion-panel__header, .v-expansion-panel__body {
            padding: 0.5em 1em ;
        }

        .v-card__text {
            padding: 0 0.5em;
        }

        .PageTitle {
            padding-left: 2em;
        }

        .SplitTitle {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;

            h3 {
                flex-grow: 0;

                margin: 0 2em 0 0;
            }

            p:  {
                flex-grow: 1;
            }
        }

        .PropertyGrid {
            border: none;
            margin: 0.5em;

            td {
                padding: 0 1em 0 0;
                border: none;
            }
        }
    }
</style>