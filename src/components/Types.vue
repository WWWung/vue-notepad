<template>
  <div>
      <div class="typeWrap">
          <div class="typeListWrap">
            <div class="typeTitleWrap subCenter">
              <div class="createNewType subCenter" @click="showNewTypeInput">
                <i class="typeTitleIcon"></i>
                <input type="text" class="newTypeTitle" v-if="setNewType" v-focus @blur="getNewType" v-model="newType">
                <span class="typeTitle" v-else>新建笔记分类</span>
              </div>
            </div>
            <ul class="typeList">
              <li v-for="(item, index) in data" :key="index" @click="selectType(index)" :class="item.selected ? 'selected' : ''">
                <i class="typeIcon"></i>
                <span class="typeName">{{item.type}}</span>
              </li>
            </ul>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [
        {
          type: "Vue学习笔记",
          selected: false
        },
        {
          type: "GOlang学习笔记",
          selected: false
        }
      ],
      setNewType: false,
      newType: ""
    }
  },

  components: {},

  computed: {},

  mounted () {
    this.invoke("/api/type.api?pageIndex=1&rowsInPage=10", "getList", {}).then(d => {
      console.log(d)

    })
  },

  methods: {
    selectType (index) {
      this.data.forEach((item, i) => {
        if (i === index) {
          item.selected = true
        } else {
          item.selected = false
        }
      })
    },
    showNewTypeInput () {
      if (!this.setNewType) {
        this.setNewType = true;
      }
    },
    getNewType () {
      if (this.newType) {
        this.data.push({
          type: this.newType,
          selected: false
        })
      }
      const data = {
        data: {
          name: this.newType
        }
      }
      this.loading = true
      this.invoke("/api/type.api", "add", data).then(d => {
        console.log(d)
        if (d.code) {

        } else {

        }
        this.loading = false
      })
      if (this.setNewType) {
        this.setNewType = false;
      }
    }
  },

  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  }
}

</script>
<style scoped>
.typeWrap {
  width: 220px;
  height: 800px;
  background-color: #f5f5f5;
  box-sizing: border-box;
  border-right: 1px solid #e0e1e5;
}
.typeTitleWrap {
  height: 60px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
  box-sizing: border-box;
  font-size: 12px;
}
.createNewType {
  width: 110px;
  margin: 0 auto;
  cursor: pointer;
}
.createNewType:hover {
  color: #398dee;
}
.newTypeTitle {
  width: 110px;
  height: 24px;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  background-color: #fff;
  font-size: 12px;
}
.typeTitleIcon {
  width: 24px;
  height: 24px;
  background: url("../assets/imgs/new.png") no-repeat;
  background-size: 100% 100%;
  margin-right: 10px;
}
.typeList li {
  display: flex;
  cursor: pointer;
  height: 40px;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 12px;
}
.typeList .selected {
  background-color: #398dee!important;
  border: 1px solid #2280ed;
  color: #fff;
}
.typeList .selected .typeIcon {
  background: url("../assets/imgs/fenlei.png") no-repeat;
  background-size: 100% 100%;
}
.typeList li:hover {
  background-color: #e4edf8;
}
.typeIcon {
  width: 24px;
  height: 24px;
  background: url("../assets/imgs/fenlei1.png") no-repeat;
  background-size: 100% 100%;
}
.typeName {
  width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 10px;
}
</style>