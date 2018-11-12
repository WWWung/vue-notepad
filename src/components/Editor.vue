<template>
    <div>
        <div id="editorWrap"></div>
    </div>
</template>

<script>
import editor from "../assets/editor/js/editor.js"
import "../assets/editor/css/editor.css"
export default {
    name: "",
    data () {
        return {
        }
    },

    components: {},

    computed: {},

    mounted () {
        editor.init({
            el: "#editorWrap"
        })
    },

    methods: {}
}

</script>
<style scoped>
</style>