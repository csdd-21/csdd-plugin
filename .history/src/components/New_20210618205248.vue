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
      <el-form-item label="说明" label-width="80px">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item class='submit'>
        <el-input v-model="form.author" placeholder="Sign here"></el-input>
        <el-button  @click="click_submit" type="primary" >提 交</el-button>
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
        author:"",
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
},

    click_close() {},
    click_submit() { },
  },
  created() {},
  mounted() {},
};
</script>

<style>
input[type="file"] {
  display: none;
}
</style>
<style lang="less" scoped>
@import url("../assets/allCss/New.less");
</style>
