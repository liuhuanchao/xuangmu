<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user" :rules="rules">
        <el-form-item label="标题" label-width="120px" prop="title">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeFile2"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加轮播图'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import path from "path";
import { mapGetters, mapActions } from "vuex";
import { errorAlert, successAlert } from "../../../utils/alert";
import {
  reqBannerAdd,
  reqBannerList,
  reqBannerDetail,
  reqBannerUpdate,
} from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      //初始化
      user: {
        title: "",
        img: null,
        status: 1,
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "change" }],
      },
      //初始化图片路径
      imgUrl: "",
    };
  },
  computed: {
    ...mapGetters({
      cateList: "banner/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "banner/reqList",
    }),
    //选择了文件
    changeFile2(e) {
      // let file = e.target.files[0];
      let file = e.raw;
      //判断文件大小
      if (file.size > 2 * 1024 * 1024) {
        errorAlert("文件大小不能超过2M");
        return;
      }
      //判断文件类型
      let extname = path.extname(file.name);
      let arr = [".jpg", ".jpeg", ".png", ".gif"];
      if (!arr.includes(extname)) {
        errorAlert("请上传正确的图片格式");
        return;
      }
      //URL.createObjectURL(file) 将一个文件生成一个URL地址
      this.imgUrl = URL.createObjectURL(file);
      //给user.img赋值
      this.user.img = file;
    },
    cancel() {
      this.info.isshow = false;
    },
    add() {
      this.check().then(() => {
        reqBannerAdd(this.user).then((res) => {
          if (res.data.code == 200) {
            successAlert("添加成功");
            this.cancel();
            this.empty();
            this.reqList();
          }
        });
      });
    },
    getOne(id) {
      reqBannerDetail(id).then((res) => {
        this.user = res.data.list;
        this.imgUrl = this.$imgPre + this.user.img;
        //补id
        this.user.id = id;
      });
    },
    empty() {
      this.user = {
        id: "",
        title: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
    },
    update() {
      this.check().then(() => {
        reqBannerUpdate(this.user).then((res) => {
          if (res.data.code == 200) {
            successAlert("修改成功");
            this.cancel();
            this.empty();
            this.reqList();
            this.$emit("init");
          }
        });
      });
    },
    closed() {
      if (this.info.title === "编辑轮播图") {
        this.empty();
      }
    },
    check() {
      return new Promise((resolve, resject) => {
        if (this.user.title === "") {
          errorAlert("昵称不能为空");
          return;
        }
        resolve();
      });
    },
  },
  mounted() {
    // reqBannerList().then((res) => {
    //   if (res.data.code == 200) {
    //     this.roleList = res.data.list;
    //   }
    // });
  },
};
</script>
<style scoped >
.line {
  display: flex;
}
.line .el-input {
  flex: 1;
}
.line .el-button {
  width: auto;
}
.add >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
