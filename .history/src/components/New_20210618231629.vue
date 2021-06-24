<template>
  <div class="new">
    <el-form :model="form" ref="form" :rules="rules" class="demo-form-inline">
      <el-form-item label="图片" prop="imgPath" label-width="80px">
        <el-upload action="/api/upload" :file-list="fileList" :before-upload="handle_before" :on-change="handle_change" :on-remove="handle_remove" :on-success="handle_success" v-model="form.icon" list-type="picture-card">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="标题" prop="title" label-width="80px">
        <el-input v-model="form.title" placeholder="Type Title..."></el-input>
      </el-form-item>
      <el-form-item label="归档" prop="tag" label-width="80px">
        <el-select v-model="form.tag" placeholder="Select" filterable>
          <el-option v-for="i in tags" :key="i.value" :label="i.label" :value="i.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="说明" prop="desc" label-width="80px">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- <el-input v-model="form.author" prop="rules.author" placeholder="Sign here"></el-input> -->
        <el-button @click="click_submit" type="primary">提 交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "New",
  components: {},
  props: {},
  data() {
    const isValidate = (rule, value, callback) => {
      if (!this.form[rule.field]) {
        callback(new Error("不能为空"));
      } else {
        callback();
      }
    };
    return {
      form: { author: "", imgPath: "", title: "", tag: "animation", desc: "" },
      rules: {
        // author: [{ validator: isValidate }],
        // imgPath: [{ validator: isValidate, trigger: ["blur", "change"] }],
        // title: [{ validator: isValidate }],
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

    click_close() {},
    click_submit() {
      // this.$refs["form"].validate((valid) => {
      //   console.log("valid --", valid);
      //   if (valid) {
      //     this.axios
      //       .post("/api/submit", this.form)
      //       .then((res) => {
      //         console.log("submit res --", res);
      //         if (res.data.status == 200) {
      //           this.$message({ message: "发布成功", type: "info", duration: 10000000 });
      //         }
      //       })
      //       .catch(function (err) {
      //         console.error("submit err --", err);
      //       });
      //   } else {
      //   }
      // });
       this.$message({ message: "发布成功", type: "info",duration: 10000000 });
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang='less'>
@color: rgb(128, 130, 128);
@bgColor: rgb(216, 234, 217);
input[type="file"] {
  display: none;
}
.el-message--info {
  background-color: fade(@bgColor, 60%);
  // border-color: fade(@color, 50%);
}
</style>
<style lang="less" scoped>
@import url("../assets/allCss/New.less");
</style>
