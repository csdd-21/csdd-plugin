<template>
  <div class="new">
    <el-form :model="form" class="demo-form-inline">
      <el-form-item label="图片" label-width="80px">
        <el-upload prop="icon" action="/api/upload" :file-list="fileList" :before-upload="handle_before" :on-change="handle_change" :on-remove="handle_remove" :on-success="handle_success" v-model="form.icon" list-type="picture-card">
          <el-button prop="icon" size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="标题" label-width="80px">
        <el-input v-model="form.title" placeholder="Type Title..."></el-input>
      </el-form-item>
      <el-form-item label="归档" label-width="80px">
        <el-select v-model="form.tag" placeholder="Select" filterable>
          <el-option v-for="i in tags" :key="i.value" :label="i.label" :value="i.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="简介" label-width="80px">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="click_submit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "New",
  components: {},
  props: {},
  data() {
    return {
      tags: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      form: {
        title: "",
        tag: "选项2",
        desc: "",
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
     // 图片上传
    handle_before(file) {
      console.log("before ---", file);
      let txt = "";
      let isType = ["image/png", "image/jpg", "image/jpeg", "image/x-icon"].some((i) => {
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
      if (fileList.length == 0) {
        this.hasIcon = false;
      }
    },
    handle_success(res, file) {
      console.log("success ---", res, file);
      this.form.icon = res.data.url;
      this.hasIcon = true;
      this.$refs.form.clearValidate(["icon"]);
    },

    click_close() {
      this.$emit("close_showAdd", false);
      this.$refs["form"].resetFields();
    },
    click_submit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          switch (this.info.action) {
            case "add":
              this.axios
                .post("/api/submit", Object.assign({}, this.form, this.info))
                .then((res) => {
                  console.log("submit res --", res);
                  if (res.data.status == 200) {
                    this.$emit("close_showAdd", false);
                    this.$message({ message: "添加成功", type: "info", customClass: "infoBox" });
                  }
                })
                .catch(function (err) {
                  console.error("submit err --", err);
                });
              break;
            case "edit":
              this.axios
                .post("/api/edit", this.form)
                .then((res) => {
                  console.log("edit res --", res);
                  if (res.data.status == 200) {
                    this.$emit("close_showAdd", false);
                    this.$message({ message: "编辑成功", type: "info", customClass: "infoBox" });
                  }
                })
                .catch(function (err) {
                  console.error("edit err --", err);
                });
              break;
          }
        } else {
          switch (this.info.action) {
            case "add":
              this.$message({ message: "添加失败", type: "error" });
              break;
            case "edit":
              this.$message({ message: "编辑失败", type: "error" });
              break;
          }
        }
      });
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="less" scoped>
@import url("../assets/allCss/New.less");
</style>
