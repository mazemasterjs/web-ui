<template dark>
    <pre>
    <br/>
    {{mazeName}}
    <br/>
    {{mazeImage}}
    <br/>
    </pre>
</template>


<script>
export default {
    //props are passed down from mazeList to mazeImage (parent component to this, child, component)
    props: {
        mazeId: {type: String, required: true},
        mazeImage: null,
        mazeName: null,
    },
};

</script>

<style>
    .btn {
        border: 1px solid white;
        font-size: 18px;
    }
</style>
