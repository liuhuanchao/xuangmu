<template>
  <div>
     <el-button type="primary" @click="willAdd">添加</el-button>

    <v-list  @edit="edit"></v-list>

    <v-form :info="info"  ref="form"></v-form>

  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import VList from "./components/list";
import VForm from "./components/form";
export default {
    data(){
    return {
      info:{
        isshow:false,
        title:"添加活动"
      }
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
        title:'添加活动'
      }
    },
    edit(id){
      this.info={
        isshow:true,
        title:'编辑活动'
      };
      this.$refs.form.getOne(id)
    },

  },
  mounted() {


  },
  components: {
    VList,
    VForm,
  },
};
</script>
<style scoped>
</style>
