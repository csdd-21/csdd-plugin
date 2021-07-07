<template>
  <div class="filterCond">
    <div class="search">
      <el-input v-model="checked.title" placeholder="Type title or select tag below to search..."> </el-input>
      <!-- <el-button class="one" @click="click_search" @keyup.enter='click_search'>查 询</el-button> -->
      <el-button class="two" @click="click_reset">重 置</el-button>
    </div>
    <span class="title">标签分类</span>
    <el-checkbox-group v-model="checked.tags">
      <el-checkbox-button v-for="i in tags" :value="i.value" :label="i.value" :key="i.value">{{ i.value }}</el-checkbox-button>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: "FilterCond",
  props: {
    tags: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      checked: {
        title: "",
        tags: [],
      },
    };
  },
  watch: {
    "checked.tags": function (newVal, oldVal) {
      this.$emit("handle_filter", JSON.parse(JSON.stringify(this.checked)));
    },
  },
  methods: {
    click_search() {
      this.$emit("handle_filter", JSON.parse(JSON.stringify(this.checked)));
    },
    click_reset() {
      this.checked.title = "";
      this.$emit("handle_filter", this.checked);
    },
  },
};
</script>

<style lang="less">
@import url("../assets/allCss/FilterCond.less");
</style>
