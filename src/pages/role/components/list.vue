<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="角色编号" sortable></el-table-column>
      <el-table-column prop="rolename" label="角色名称" sortable></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm='del(scope.row.id)'></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert } from '../../../utils/alert';
import { reqRoleDel} from '../../../utils/http'

export default {
  props: ["list"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    del(id){
      reqRoleDel(id).then(res=>{
        if(res.data.code==200){
          successAlert(res.data.msg)
          this.$emit('init')
        }
      })
    },
    edit(id){
      this.$emit('edit',id)
    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>
