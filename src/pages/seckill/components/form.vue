<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user" :rules="rules">
        <el-form-item label="活动名称" label-width="120px" prop="goodsname">
          <el-input v-model="user.title"></el-input>
        </el-form-item>
        <el-form-item label="活动日期" label-width="120px">
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="一级分类" label-width="120px" prop="first_cateid">
          <el-select placeholder="请选择一级分类" v-model="user.first_cateid" @change="changeFirst">
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" label-width="120px" prop="second_cateid">
          <el-select placeholder="请选择二级分类" v-model="user.second_cateid" @change="changeSecondid" >
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" label-width="120px" prop="specsid">
          <el-select placeholder="请选择商品" v-model="user.goodsid" >
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加活动'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import E from "wangeditor";
import { mapGetters, mapActions } from "vuex";
import {
  reqCateList,
  reqSeckAdd,
  reqSeckDetail,
  reqSeckUpdate,
  reqSeckDel,
} from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      rules: {
        first_cateid: [
          { required: true, message: "请输入一级分类", trigger: "change" },
        ],
        second_cateid: [
          { required: true, message: "请输入二级分类", trigger: "change" },
        ],
        title: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        goodsid: [{ required: true, message: "请输入商品", trigger: "change" }],
      },
      user: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      value1: [],
      //二级分类的list
      secondCateList: [],

      //规格属性list
      attrsList: [],
    };
  },
  computed: {
    ...mapGetters({
      //一级分类的list
      cateList: "cate/list",
      //规格的list
      specsList: "specs/list",
      goodsList:'goods/list'
    }),
  },
  methods: {
    ...mapActions({
      // 请求一级分类list
      reqCateList: "cate/reqList",
      //请求规格list
      reqspecsList: "specs/reqList",
      //商品list和总数
      reqGoodsList: "seckill/reqList",
      reqList:'goods/reqList'
    }),
    cancel() {
      this.info.isshow = false;
    },
    add() {
      this.check().then(() => {
        this.user.begintime = this.value1[0];
        this.user.endtime = this.value1[1];

        let d = { ...this.user };
        d.specsattr = JSON.stringify(d.specsattr);
        reqSeckAdd(d).then((res) => {
          if (res.data.code === 200) {
            successAlert("添加成功");
            this.cancel();
            this.empty();
            // //刷新list
            this.reqGoodsList();
          }
        });
      });
    },
    empty() {
      this.user = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      //二级分类的list
      this.secondCateList = [];
    },
    getSecondList() {
      //获取2级分类list
      reqCateList({ pid: this.user.first_cateid }).then((res) => {
        this.secondCateList = res.data.list;
      });
    },
    changeFirst() {
      //2级分类的id重置
      this.user.second_cateid = "";
      this.getSecondList();
    },
    changeSecondid() {
      this.user.goodsid = "";
      this.reqList({
        fid: this.user.first_cateid,
        sid: this.user.second_cateid,
      });
    },
    // changeSpecsId() {
    //   this.user.specsattr = [];
    //   this.getAttrs();
    // },
    //验证
    check() {
      return new Promise((resolve, resject) => {
        if (this.user.first_cateid === "") {
          errorAlert("一级分类不能为空");
          return;
        }
        if (this.user.second_cateid === "") {
          errorAlert("二级分类不能为空");
          return;
        }
        if (this.user.titlename === "") {
          errorAlert("活动名称为空");
          return;
        }
        if (this.user.goodsid === "") {
          errorAlert("请选择商品");
          return;
        }
        resolve();
      });
    },
    closed() {
      if (this.info.title === "编辑活动") this.empty();
    },
    update() {
      this.check().then(() => {
        let d = { ...this.user };
        // d.specsattr = JSON.stringify(d.specsattr);
        reqSeckUpdate(d).then((res) => {
          if (res.data.code == 200) {
            successAlert("更新成功");
            this.cancel();
            this.empty();
            this.reqGoodsList();
          }
        });
      });
    },
    getOne(id) {
      reqSeckDetail(id).then((res) => {
        this.user = res.data.list;
        this.user.id = id;
        //请二级list
        this.getSecondList();
      });
    },
  },
  mounted() {
    //一进来就请求分类list
    this.reqCateList();
    //一进来就请求规格list，参数true，是为了取得所有的规格
    this.reqspecsList(true);
  },
};
</script>
<style scoped>
.line {
  display: flex;
}
.line .el-input {
  flex: 1;
}
.line .el-button {
  width: auto;
}
.myupload {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  border: 1px dashed #ccc;
  position: relative;
}
.myupload h3 {
  width: 100%;
  height: 100px;
  font-size: 30px;
  text-align: center;
  line-height: 100px;
  color: #666;
  font-weight: 100;
}
.myupload .ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
.myupload .img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
