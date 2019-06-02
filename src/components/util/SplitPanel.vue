<template>
    <div class="SplitPanel" :class="splitClass">
        <div class="Panel Primary" :style="primaryStyle">
            <slot name="Primary"></slot>
        </div>
        <div class="Panel Secondary" :style="secondaryStyle">
            <slot name="Secondary"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SplitPanel',
        props: {
            vertical: Boolean,
            primarySize: {type: Number, default: 1},
            secondarySize: {type: Number, default: 0},
        },
        computed: {
            primaryStyle() {
                return {
                    flexGrow: this.primarySize,
                };
            },
            secondaryStyle() {
                return {
                    flexGrow: this.secondarySize,
                };
            },
            splitClass() {
                return this.vertical ? 'Vertical' : 'Horizontal';
            },
        },
    };
</script>

<style lang="scss">
    .SplitPanel {
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: stretch;

        &.Horizontal {
            flex-direction: row;
        }

        &.Vertical {
            flex-direction: column;
        }
    }
</style>