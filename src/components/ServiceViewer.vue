<template>
    <div class="ServiceViewer">

        <!-- Overall page header -->
        <div class="ServiceViewerHeader">
            <span class="ServiceViewerHeaderTitle">MazeMasterJS REST Service</span>
        </div>
        
        <!-- Error banner -->
        <span class="ServiceViewerError" v-if="error">{{ error }}</span>
        
        <!-- Description of the service base -->
        <div class="ServiceViewerDescription">
            <span class="ServiceViewerDescriptionName">Endpoint name: {{ service.endpointName }}</span>
            <span class="ServiceViewerDescriptionUrl">Base URL: {{ service.baseURL }}</span>
        </div>
        
        <!-- Service endpoint details -->
        <div class="ServiceViewerEndpoints">

            <!-- Title of service endpoint section -->
            <div class="ServiceViewerEndpointsHeader">
                <span class="ServiceViewerEndpointsHeaderTitle">Endpoints:</span>
            </div>
            
            <!-- List of service endpoints -->
            <div class="ServiceViewerEndpointsList">
                <template v-for="(endpoint, n) in service.endpoints">

                    <!-- Section of the page containing a specific endpoint -->
                    <div class="ServiceViewerEndpointsListEntry" :key="n">

                        <!-- Header for this endpoint entry -->
                        <div class="ServiceViewerEndpointsListEntryHeader">
                            <span class="ServiceViewerEndpointsListEntryHeaderTitle">{{ endpoint.name }}</span>
                            <span class="ServiceViewerEndpointsListEntryHeaderMethod">{{ endpoint.method }}</span>
                            <span class="ServiceViewerEndpointsListEntryHeaderDescription">{{ endpoint.descriptions }}</span>
                        </div>

                        <div class="ServiceViewerEndpointsListEntryBody">
                            <span class="ServiceViewerEndpointsListEntryBodyRequest">URL: {{ endpoint.method }} {{ endpoint.url }}</span>
                            <span class="ServiceViewerEndpointsListEntryBodyContentType">Content Type: {{ endpoint.contentType }}</span>
                            
                            <div class="ServiceViewerEndpointsListEntryBodyArguments">
                                <template v-for="(argument, n) in endpoint.arguments">
                                    <div class="ServiceViewerEndpointsListEntryBodyArgumentsEntry" :key="n">
                                        <span class="ServiceViewerEndpointsListEntryBodyArgumentsEntryHeader">{{ argument.type }} {{ argument.name }}</span>
                                        <span class="ServiceViewerEndpointsListEntryBodyArgumentsEntryDescription">{{ argument.description}}</span>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>

    import axios from 'axios';
    import Logger, { LOG_LEVELS } from '@mazemasterjs/logger';

    // configure logger
    const log = Logger.getInstance();

    export default {
        data() {
            return {
                service: {
                    endpointName: null,
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

</style>