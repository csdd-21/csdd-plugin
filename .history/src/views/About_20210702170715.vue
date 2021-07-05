<template>
  <div class="about col-xs-12 col-md-4">
    <div class="one">
      <img src="../../public/about.jpg" alt="about.jpg" />
      <div class="contact">
        <a href="https://github.com/csdd-21" target="_blank"><i class="iconfont icon-github"></i></a>
        <a href="https://github.com/csdd-21/csdd-blog" target="_blank"><i class="iconfont icon-blog"></i></a>
      </div>
    </div>
    <div class="col-xs-12 col-md-4"></div>
    <div class="two col-xs-12 col-md-7">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="INTRODUCTION" name="1">
          <div class="txt" v-html="postAbout"></div>
        </el-collapse-item>
        <el-collapse-item title="OTHER" name="2">
          <div class="txt" v-html="postOther"></div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import MarkdownIt from "markdown-it";
export default {
  components: {
    name: "About",
  },
  props: {},
  data() {
    return {
      activeNames: ["2"],
      postAbout: "",
      postOther: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    ...mapMutations(["SET_SHOW_PARAMS"]),
    handleChange(val) {
      console.log(val);
    },
  },
  created() {},
  mounted() {
    this.SET_SHOW_PARAMS([{ key: "fabuIcon", value: false },{ key: "backIcon", value: false },{ key: "footer", value: false }]);
    
    this.axios.get("about/about.md").then((res) => {
        this.postAbout = new MarkdownIt({ html: true }).render(res.data);
      }).catch(function (err) {})

    this.axios .get("about/other.md").then((res) => {
        this.postOther = new MarkdownIt({ html: true }).render(res.data);
      }).catch(function (err) {})
  },
};
</script>

<style lang="less">
@import url("../assets/allCss/About.less");
</style>
