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
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      datas: [],
    };
  },
  created() {},
  mounted() {},
};
</script>

<style lang="less">
@import url("../assets/allCss/Tags.less");
</style>
