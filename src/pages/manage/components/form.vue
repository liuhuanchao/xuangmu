<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user" :rules="rules">
        <el-form-item label="所属角色" label-width="120px" prop="roleid">
          <!-- 通过v-model将user绑定到表单上 -->
          <el-select v-model="user.roleid" placeholder="请选择角色">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :value="item.id"
              :label="item.rolename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="120px" prop="username">
          <!-- 通过v-model将user绑定到表单上 -->
          <el-input v-model="user.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加管理员'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, errorAlert } from "../../../utils/alert";
import {
  reqUserAdd,
  reqRoleList,
  reqUserDetail,
  reqUserUpdate,
} from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      //初始化
      user: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      rules: {
        roleid: [
          { required: true, message: "请输入所属角色", trigger: "change" },
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "change" },
        ],
      },
      //角色列表
      roleList: [],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    cancel() {
      this.info.isshow = false;
    },
    add() {
      this.check().then(() => {
        reqUserAdd(this.user).then((res) => {
          if (res.data.code == 200) {
            successAlert("添加成功");
            this.cancel();
            this.empty();
            this.$emit("init");
          }
        });
      });
    },
    getOne(uid) {
      reqUserDetail(uid).then((res) => {
        this.user = res.data.list;
        this.user.password = "";
      });
    },
    empty() {
      this.user = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    update() {
      this.check().then(() => {
        reqUserUpdate(this.user).then((res) => {
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
      if (this.info.title === "编辑管理员") {
        this.empty();
      }
    },
    check() {
      return new Promise((resolve, resject) => {
        if (this.user.username === "") {
          errorAlert("用户名不能为空");
          return;
        }
        if (this.user.roleid === "") {
          errorAlert("所属角色不能为空");
          return;
        }
        resolve();
      });
    },
  },
  mounted() {
    //进来就加载菜单列表
    reqRoleList().then((res) => {
      if (res.data.code == 200) {
        this.roleList = res.data.list;
      }
    });
  },
};
</script>
<style scoped>
</style>
