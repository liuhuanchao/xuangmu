<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list :list='list' @init="init" @edit="edit($event)"></v-list>
    <v-form :info='info' :list='list' @init='init'  ref="form"></v-form>
  </div>
</template>
<script>
import vList from "./components/list";
import vForm from "./components/form";
import { mapGetters, mapActions } from "vuex";
import { reqMenuList } from '../../utils/http';
export default {
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    willAdd(){
      this.info.isshow=true,
       this.info.title="添加菜单"
    },
    init(){
      reqMenuList().then(res=>{
        this.list=res.data.list
      })
    },
    //处理逻辑
    edit(id){
      //弹框出现
      this.info.isshow=true
       // .给info补了一个字段，用来判断是添加还是编辑打开的弹框
       this.info.title='编辑菜单'
       //.父组件调用子组件 form.vue 的getOne()
       this.$refs.form.getOne(id)
    }
  },
  data() {
    return {
      //弹窗状态
      info:{
        isshow:false,
         title:"添加菜单"
      },
      list:[]
    }
  },
  mounted() {this.init()},
  components: {
    vList,
    vForm,
  },

};
</script>
<style scoped>
</style>
