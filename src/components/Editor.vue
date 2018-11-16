<template>
    <div>
        <div id="editorTitle">
            <div id="titleInputWrap">
                <input type="text" id="titleInput" v-model="note.title">
            </div>
            <div id="titleOption">
                <button id="save" @click="save">保存</button>
                <div id="optionItem" v-if="!saved">
                    <span>点击保存后生成分享链接</span>
                </div>
                <div id="optionItem" v-else>
                    <span>分享链接:</span>
                    <a href="http://localhost:8080/" target="blank" id="url">http://localhost:8080/</a>
                    <button id="preview">预览</button>
                    <button id="copy">复制</button>
                </div>
            </div>
        </div>
        <div id="editorWrap"></div>
    </div>
</template>

<script>
import Editor from "../assets/editor/js/editor3.js"
import "../assets/editor/css/editor.css"
export default {
    name: "",
    data () {
        return {
            note: {
                title: "",
                textContent: "",
                htmlContent: ""
            },
            saved: false,
            editor: null
        }
    },

    components: {},

    computed: {},

    mounted () {
        this.editor = new Editor()
        this.editor.init({
            el: "#editorWrap"
        })
    },

    methods: {
        save () {
            // console.log(this.editor.getHtmlContent())
            // console.log(this.editor.getTextContent())
        }
    }
}

</script>
<style scoped>
#editorTitle {
    display: flex;
}
#titleInputWrap {
    height: 59px;
    padding-left: 20px;
}
#titleInput {
    padding: 19px 0;
    width: 800px;
    font-size: 18px;
    line-height: 22px;
    height: 22px;
}
#titleOption {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 11px;
}
button {
    color: #82B6F4;
    height: 30px;
    font-size: 11px;
    line-height: 30px;
    border: 1px solid #e2e2e2;
    padding: 0 20px;
    cursor: pointer;
    border-radius: 4px;
    margin-left: 10px;
}
button:hover {
    border: 1px solid #B9BBC5;
    color: #398dee;
}
#save {
    margin-right: 40px;
}
#url {
    margin-left: 10px;
}
</style>