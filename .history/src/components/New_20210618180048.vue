<template>
  <div class="new">
    <el-form :model="form" class="demo-form-inline">
      <el-form-item label="标题" label-width="80px">
        <el-input v-model="form.title" placeholder="Type Title..."></el-input>
      </el-form-item>
      <el-form-item label="归档" label-width="80px">
        <el-select v-model="form.tag" placeholder="Select" filterable >
          <el-option v-for="i in tags" :key="i.value" :label="i.label" :value="i.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="简介" label-width="80px">
        <el-input  type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
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
    onSubmit() {
      console.log("submit!");
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="less" scoped>
@import url("../assets/allCss/New.less");
</style>
