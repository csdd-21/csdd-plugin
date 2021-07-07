<template>
  <div class="tags">
    <template v-for="i of datas" :key="i.name">
      <span :class="i.class">{{ i.name }}</span>
    </template>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    tags: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      datas: [],
    };
  },
  created() {
    
  },
  mounted(){
this.tags.forEach((i) => {
      if (i == "UI框架") {
        this.datas.push({
          name: i,
          class: "animation",
        });
      }
      if (i == "动画库") {
        this.datas.push({
          name: i,
          class: "vscode",
        });
      }
      if (i == "JavaScript") {
        this.datas.push({
          name: i,
          class: "vue",
        });
      }
      if (i == "轮播") {
        this.datas.push({
          name: i,
          class: "vue",
        });
      }
      if (i == "Chrome") {
        this.datas.push({
          name: i,
          class: "vue",
        });
      }
    });
  }
};
</script>

<style lang="less">
@import url("../assets/allCss/Tags.less");
</style>
