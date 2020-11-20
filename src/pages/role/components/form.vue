<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="closed">
      <el-form :model="user" :rules="rules">
        <el-form-item label="角色名称" label-width="120px" prop="rolename">
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="120px">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{children:'children',label:'title'}"
          ></el-tree>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title=='添加角色'">添加</el-button>
        <el-button type="primary" v-else @click="update">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqMenuList,
  reqRoleAdd,
  reqRoleDetail,
  reqRoleUpdate,
} from "../../../utils/http";
import { successAlert ,errorAlert} from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        rolename: "",
        menus: "",
        status: 1,
      },
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "change" },
        ],
      },
      menuList: [],
    };
  },

  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    add() {
      this.check().then(() => {
        this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        reqRoleAdd(this.user).then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            successAlert("添加成功");
            this.cancel();
            this.empty();
            //刷新list
            this.$emit("init");
          }
        });
      });
    },
    empty() {
      this.user = {
        rolename: "",
        menus: "",
        status: 1,
      };
      //清空树
      this.$refs.tree.setCheckedKeys([]);
    },
    cancel() {
      this.info.isShow = false;
    },
    getOne(id) {
      reqRoleDetail(id).then((res) => {
        this.user = res.data.list;
        this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus));
        this.user.id = id;
      });
    },
    update() {
      this.check().then(() => {
        this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        reqRoleUpdate(this.user).then((res) => {
          if (res.data.code == 200) {
            successAlert("修改成功");
            this.cancel();
            this.empty();
            this.$emit("init");
          }
        });
      });
    },
    closed() {
      if (this.info.title === "编辑角色") {
        this.empty();
      }
    },
    check() {
      return new Promise((resolve, resject) => {
        if (this.user.rolename === "") {
          errorAlert("角色名称不能为空");
          return;
        }
        resolve();
      });
    },
  },
  mounted() {
    reqMenuList().then((res) => {
      if (res.data.code == 200) {
        this.menuList = res.data.list;
      }
    });
  },
};
</script>
<style scoped>
</style>
