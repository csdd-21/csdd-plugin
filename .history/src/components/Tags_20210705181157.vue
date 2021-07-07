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
          name: "UI框架",
          class: "animation",
        });
      }
      if (i == "动画库") {
        this.datas.push({
          name: "动画库",
          class: "vscode",
        });
      }
      if (i == "JavaScript") {
        this.datas.push({
          name: "JavaScript",
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
