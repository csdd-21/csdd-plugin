<template>
  <div class="new">
    <el-form  :model="formInline" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="formInline.user" placeholder="Type Title..."></el-input>
      </el-form-item>
      <el-form-item label="归档">
        <el-select v-model="formInline.region" placeholder="Select">
          <el-option v-for="i in tags" :key="i.value" :label="i.label" :value="i.value"></el-option>
        </el-select>
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
      formInline: {
        user: "",
        region: "",
      },
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
