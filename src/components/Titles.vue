<template>
  <div>
      <div class="titleWrap">
          <div class="titleListWrap">
              <div class="noteTitileWrap subCenter">
                <div class="searchNoteWrap" @click="showNewNoteInput">
                  <input type="text" class="searchNote">
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newNoteName: "",
      setNewType: false
    }
  },

  components: {},

  computed: {
    currentTypeId () {
      return this.$store.state.typeId
    }
  },

  mounted () {},

  methods: {
    addNewNote() {

    },
    showNewNoteInput () {

    }
  },

  watch: {
    "currentTypeId" (cur, old) {
      console.log(cur, old)
    }
  }
}

</script>
<style scoped>
.titleWrap {
  width: 220px;
  height: 100vh;
  background-color: #fff;
  box-sizing: border-box;
  border-right: 1px solid #e0e1e5;
}
.noteTitileWrap {
  height: 60px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
  box-sizing: border-box;
  font-size: 12px;
}
.searchNote {
  border: 1px solid #bac0c6;
  border-radius: 8px;
  height: 24px;
  line-height: 24px;
  color: #595959;
  width: 110px;
  text-indent: 10px;
}
</style>