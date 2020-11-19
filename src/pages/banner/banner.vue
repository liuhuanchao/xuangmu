<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list  @edit='edit' :init='init'></v-list>
    <v-form :init='init' :info='info' ref="form"></v-form>

  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import VList from "./components/list";
import VForm from "./components/form";
import { reqBannerList} from '../../utils/http'
export default {
  data() {
    return {
      list:[],
      info: {
        isshow: false,
        title: "添加轮播图",
      },
    };
  },
  computed: {
    ...mapGetters({

    }),
  },
  methods: {
    ...mapActions({}),
    willAdd() {
      this.info = {
        isshow: true,
        title: "添加轮播图",
      };
    },
    edit(id){
      this.info={
        isshow:true,
        title:'编辑轮播图'
      };
      this.$refs.form.getOne(id)
    },
     init() {
      reqBannerList().then(res => {
        this.list = res.data.list? res.data.list:[];
      });
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
