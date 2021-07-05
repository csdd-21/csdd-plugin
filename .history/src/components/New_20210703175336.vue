<template>
  <div class="new">
    <el-form :model="form" ref="form" :rules="rules" class="demo-form-inline" @submit.prevent>
      <el-form-item label="图片" prop="imgPath" label-width="80px">
        <el-upload action="/api/upload" :file-list="fileList" :before-upload="handle_before" :on-change="handle_change" :on-remove="handle_remove" :on-success="handle_success" v-model="form.icon" list-type="picture-card">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="标题" prop="title" label-width="80px">
        <el-input v-model="form.title" placeholder="Type Title..."></el-input>
      </el-form-item>
      <el-form-item label="网址" prop="url" label-width="80px">
        <el-input v-model="form.url" placeholder="Type url..."></el-input>
        <el-button type="primary"><a :href="form.url" target="__blank">测试</a></el-button>
      </el-form-item>
      <el-form-item label="归档" prop="tag" label-width="80px">
        <el-select v-model="form.tag" placeholder="Select" filterable clearable allow-create>
          <el-option v-for="i in tags" :key="i.value" :label="i.label" :value="i.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="说明" prop="desc" label-width="80px">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item @submit.prevent>
        <el-input v-model="form.author" placeholder="Sign here"></el-input>
        <el-button @click="click_submit" type="primary">提 交</el-button>
      </el-form-item>
    </el-form>
    <!-- <button @click="click_submit" type="button">提交</button> -->
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "New",
  components: {},
  props: {},
  // emits: ['close'],
  data() {
    const isValidate = (rule, value, callback) => {
      if (!this.form[rule.field]) {
        callback(new Error("不能为空"));
      } else {
        callback();
      }
    };
    return {
      form: { imgPath: "", title: "", url: "", tag: "", desc: "", author: "", auth: "", publish: 0 },
      rules: {
        imgPath: [{ validator: isValidate, trigger: ["blur", "change"] }],
        title: [{ validator: isValidate }],
        // url: [{ validator: isValidate }],
        // tag: [{ validator: isValidate }],
        // desc: [{ validator: isValidate }],
      },
      fileList: [],
    };
  },
  watch: {},
  computed: {
    ...mapState({
      tags: (state) => state.req.tags,
    }),
  },
  methods: {
    ...mapMutations(["SET_SHOW_PARAMS"]),
    // 图片上传
    handle_before(file) {
      console.log("before ---", file);
      let txt = "";
      let isType = ["image/png", "image/jpg", "image/jpeg"].some((i) => {
        return file.type == i;
      });
      txt = isType ? "" : "图片只能是 jpg/png 格式";
      if (file.size / 1024 > 1024) {
        txt += txt ? ",且图片大小不能超过1MB" : "图片大小不能超过1MB";
      }
      if (txt) {
        this.$message.error(txt);
        return false;
      }
      return true;
    },
    handle_change(file, fileList) {
      console.log("change ---", file, fileList);
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
    },
    handle_remove(file, fileList) {
      console.log("remove ---", file, fileList);
    },
    handle_success(res, file) {
      console.log("success ---", res, file);
      this.form.imgPath = res.data.url;
      this.$refs.form.clearValidate(["imgPath"]);
    },

    click_submit() {
      // this.$refs["form"].validate((valid) => {
      //   if (valid) {

      //   } else {
      //   }
      // });
      this.form.auth == "admin" ? (this.form.author = "csdd") : (this.form.author = "no name");
      this.axios
        .post("/api/submit", this.form)
        .then((res) => {
          console.log("submit res --", res);
          if (res.data.status == 200) {
            if (this.form.auth == "admin") {
              this.$message({ message: "发布成功", type: "info" });
              this.$router.push({ name: "home" });
            } else {
              this.$router.push({ name: "home" });
                this.$alert("文章会在管理员审核后24小时内发布", "", {
                  confirmButtonText: "确定",
                  callback: (action) => {
                    this.$router.push({ name: "home" });
                  },
                });
            }
            // switch (this.form.auth) {
            //   case "admin":
            //     this.$message({ message: "发布成功", type: "info" });
            //     // this.$router.push({ name: "home" });
            //     break;
            //   case "visitor":
            //     // this.$message({ message: "文章会在管理员审核后24小时内发布", type: "info" });
            //     this.$router.push({ name: "home" });
            //     this.$alert("文章会在管理员审核后24小时内发布", "", {
            //       confirmButtonText: "确定",
            //       callback: (action) => {
            //         this.$router.push({ name: "home" });
            //       },
            //     });
            //     break;
            // }
            // this.$router.push({ name: "home" });
          }
        })
        .catch(function (err) {
          console.error("submit err --", err);
        });
    },
  },
  created() {},
  mounted() {
    console.log("new mounted !!");
    console.log("auth ---", this.$route.params);
    this.form.auth = this.$route.params.auth || sessionStorage.getItem("auth");
    this.form.auth == "admin" ? (this.form.publish = 1) : (this.form.publish = -1);
    this.SET_SHOW_PARAMS([
      { key: "fabuIcon", value: false },
      { key: "backIcon", value: true },
      { key: "footer", value: false },
    ]);
  },
};
</script>

<style lang="less">
@color: rgb(128, 130, 128);
@bgColor: rgb(216, 234, 217);
input[type="file"] {
  display: none;
}
.el-message--info {
  background-color: fade(@bgColor, 60%);
  border-color: fade(@color, 50%);
}
</style>
<style lang="less" scoped>
@import url("../assets/allCss/New.less");
</style>
