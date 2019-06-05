<template>
    <div class="Loader" v-if="visible">
        <div class="LoaderBody">
            <div class="Spinner"/>
            <h4><slot></slot></h4>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Loader',
        props: {
            visible: {type: Boolean, default: true},
        },
    };
</script>

<style lang="scss">
    .Loader {
        display: flex;
        align-items: center;
        justify-content: center;

        background-color: #f3f3f33f;

        .LoaderBody {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            flex-wrap: nowrap;

            padding: 1em;

            h4 {
                padding: 0;
                margin: 0;
                font-weight: bold;
                font-size: 110%;
                line-height: 1;
                color: black;
            }

            .Spinner {
                margin-bottom: 1em;
            }
        }

        .Spinner {
            border: 5px solid lightgray;
            border-top: 5px solid #3498db;
            border-radius: 50%;
            width: 2.5em;
            height: 2.5em;
            animation: spin 2s linear infinite;
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }
</style>