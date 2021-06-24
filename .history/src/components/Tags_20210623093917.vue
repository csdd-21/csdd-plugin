<template>
  <div class="tags">
    <template v-for="i of tag" :key="i">
      <span :class="i">{{ i }}</span>
    </template>
    <div :class='test'>1234</div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {
    tag: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      test:"",
      str:'node',
      colorArr:[rgba(101, 158, 100, 0.6),rgba(67, 194, 137, 0.4)],
      tagArr:['11','22']  //i
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {
    // this.test ='.'+this.str+'{background-color: rgba(101, 158, 100, 0.6)}'
  }
}
</script>

<style lang="less">
@import url("../assets/allCss/Tags.less");
</style>
