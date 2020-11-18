<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>

    <v-list :list="list" @init="newInit" @edit="edit"></v-list>
    <v-form :info="info" @init="newInit" ref="form"></v-form>
    <!--分页
    total：总条数
    page-size:一页的数量
    current-change:当前页码发生了修改，会触发，回调函数的参数就是新的页码
    -->
    <el-pagination background  @current-change="changePage" layout="prev, pager, next" :total="total" :page-size="size"></el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import VList from "./components/list";
import VForm from "./components/form";
import {reqUserList,reqUserCount} from '../../utils/http'
export default {
  data() {
    return {
      list:[],
      info:{
        isshow:false,
        title:'添加管理员'
      },
      total:0,//总数
      page:1,//一页的数量
      size:2,//页码
    }
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    willAdd(){
      this.info={
        isshow:true,
        title:'添加管理员'
      }
    },
    init(){
      reqUserList({page:this.page,size:this.size}).then(res=>{
        let list = res.data.list ? res.data.list : [];
        //如果取到的list是[],并且page>1,page自减，请列表
        if(list.length===0&&this.page>1){
          this.page--;
          this.init();
          return;
      }
      this.list = list
    });
    },
    edit(uid){
      this.info={
        isshow:true,
        title:'编辑角色'
      };
      this.$refs.form.getOne(uid)
    },
    //获取总数
    getCount(){
      reqUserCount().then(res=>{
        this.total=res.data.list[0].total
      })
    },
    //页码发生了修改
    changePage(page){
      this.page=page;
      this.init()
    },
    newInit(){
      this.init();
      this.getCount();
    }
  },
  mounted() {
    this.init();
    this.getCount()
  },
  components: {
    VList,
    VForm,
  },
};
</script>
<style scoped>
</style>
