<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list :list="list" @init='init' @edit='edit'></v-list>
    <v-form :info='info' @lnit='init' ref="form"></v-form>
  </div>
</template>
<script>
import VForm from "./components/form";
import VList from "./components/list";
import { mapGetters, mapActions } from "vuex";
import {reqRoleList} from '../../utils/http'
export default {
  data() {
    return {
      list: [],
      info: {
        isShow: false,
        title: "添加角色",
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    //发请求
    init(){
      reqRoleList().then(res=>{
        this.list=res.data.list
      })
    },
    willAdd(){
      this.info={
        isShow:true,
        title:'添加角色'
      }
    },
    edit(id){
      this.info={
        isShow:true,
        title:'编辑菜单'
      }
      this.$refs.form.getOne(id)
    }
  },
  mounted() {
    this.init()
  },
  components: {
    VList,
    VForm,
  },
};
</script>
<style scoped>
</style>
