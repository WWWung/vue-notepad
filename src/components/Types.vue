<template>
  <div>
      <div class="typeWrap">
          <div class="typeListWrap">
            <div class="typeTitleWrap subCenter">
              <div class="createNewType subCenter" @click="showNewTypeInput">
                <i class="typeTitleIcon"></i>
                <input type="text" class="newTypeTitle" v-if="setNewType" v-focus @blur="addNewType" v-model="newType" placeholder="请输入类型名称">
                <span class="typeTitle" v-else>新建笔记分类</span>
              </div>
            </div>
            <ul class="typeList">
              <li v-for="(item, index) in data.rows" :key="index" @click="selectType(index)" :class="index===selectedIndex ? 'selected' : ''">
                <i class="typeIcon"></i>
                <span class="typeName">{{item.name}}</span>
                <el-button size="mini" type="text" class="deleteType" @click="deleteType($event, index)">删除</el-button>
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
      data: {
        pageCount: 0,
        pageIndex: 1,
        rowsInPage: 10,
        total: 0,
        rows: []
      },
      setNewType: false,
      newType: "",
      selectedIndex: 0
    }
  },

  components: {},

  computed: {},

  mounted () {
    this.initData()
  },

  methods: {
    selectType (index) {
      this.selectedIndex = index
    },
    showNewTypeInput () {
      if (!this.setNewType) {
        this.setNewType = true;
      }
    },
    addNewType () {
      if (!this.newType) {
        this.setNewType = false
        return
      }
      const data = {
        data: {
          name: this.newType
        }
      }
      this.invoke("/api/type.api", "add", data).then(d => {
        if (d.code) {
          this.$message.error(d.data)
        } else {
          this.initData(() => {
            this.$message.success("新增分类成功")
          })
        }
      })
      this.newType = ""
      if (this.setNewType) {
        this.setNewType = false
      }
    },
    initData(cb) {
      this.invoke("/api/type.api?sort=createTime&sortDir=desc&pageIndex="+this.data.pageIndex+"&rowsInPage="+this.data.rowsInPage, "getList", {}).then(d => {
        if (d.code) {
          this.$message.error(d.data)
          return
        }
        this.data = d.data
        if (this.selectedIndex >= this.data.rows.length) {
          this.selectedIndex = 0
        }
        typeof cb === "function" && cb()
      })
    },
    deleteType(e, index) {
      //  阻止冒泡触发父集li的选中事件
      e.stopPropagation()
      // this.data.rows.splice(index, 1)
      this.$confirm('该分类下的笔记将会一并删除并不可找回,请确认是否删除!').then(_ => {
        this.invoke('/api/type.api', 'delete', { id: this.data.rows[index].id }).then(d => {
          if (d.code) {
            this.$message.error(d.data)
          } else {
            this.initData()
            this.$message('删除成功')
          }
        })
      }).catch(err => {
        console.log(err)
      })
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
  height: 100vh;
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