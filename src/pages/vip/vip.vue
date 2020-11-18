<template>
  <div>
<v-list :list='list' @edit='edit' :init='init'></v-list>
<v-form :init='init' :info='info' ref=form></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import VList from './components/list'
import  VForm from './components/form'
import { reqMemberList} from '../../utils/http.js'
export default {
  data(){
    return{
      list:[],
      info:{
        isshow:false,
        title:'编辑vip'
      }
    }
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    edit(uid){
      this.info={
        isshow:true,
        title:'编辑vip'
      }
      console.log(123);
      this.$refs.form.getOne(uid)
    },
     init() {
      reqMemberList().then(res => {
        this.list = res.data.list? res.data.list:[];
      });
    }
  },
  mounted() {
    this.init()
  },
  components:{
    VList,
    VForm
  }
};
</script>
<style scoped>
</style>
