<template>
  <div id="app">
    <el-container id="content">
      <div class="navSm">
        <div class="nav">
          <span class="col-xs-10"><span @click="clickHome">CSDD-plugin</span></span>
          <span class="col-xs-2">
            <i class="iconfont icon-daohang1" @click="showNav = true"></i>
          </span>
        </div>
        <div class="navTabs" v-show="showNav">
          <i class="iconfont icon-guanbi" @click="showNav = false"></i>
          <span @click="clickNavTab('home')">Home</span>
          <span @click="clickNavTab('about')">About</span>
        </div>
      </div>
      <el-header>
        <div class="navLg">
          <span class="head" @click="clickHome"> 前端插件库</span>
          <el-tabs v-model="tab" @tab-click="clickElTab">
            <el-tab-pane label="Home" name="home" key="home"></el-tab-pane>
            <el-tab-pane label="About" name="about" key="about"></el-tab-pane>
          </el-tabs>
        </div>
      </el-header>
      <div>
        <el-button class="add" id="add" @click="click_add" v-show="!showNew && !show.about"><i class="iconfont icon-fabu"></i></el-button>
        <el-button class="add" id="add" @click="click_back" v-show="showNew && !show.about"><i class="iconfont icon-fanhui"></i></el-button>
      </div>
      <router-view style="min-height: 80vh; padding-bottom: 80px" :key="routerKey" />
      <el-footer v-show="!showNew"> Made with csdd - <a href="https://github.com/csdd-21?tab=repositories" target="_blank"> Click here to enter Github</a> <i class="iconfont icon-github"></i></el-footer>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "App",
  data() {
    return {
      tab: "home",
      routerKey: "",
      showNav: false,
      showNew: false,
      show:{
        about:false,
      }
    };
  },
  watch: {
    routerKey(val) {
      return this.$route.path + Date.now();
    },
    tab(val) {
      window.sessionStorage.setItem("tab", val);
    },
  },
  computed: {},
  components: {},
  methods: {
    ...mapMutations(["SET_SHOW_FOOTER"]),
    clickHome() {
      this.$router.push("/home");
      this.tab = "home";
    },
    clickNavTab(i) {
      this.$router.push({ name: i });
      this.showNav = false;
    },
    clickElTab(tab, event) {
      if (tab.props.name == "about") {
        this.show.about = true
      }
      this.$router.push({ name: JSON.parse(JSON.stringify(this.tab)) });
    },
    click_add() {
      this.$router.push({ name: "new" });
      this.showNew = true;
    },
    click_back() {
      this.$router.push({ name: "home" });
      this.showNew = false;
    },
  },
  created() {
    this.tab = window.sessionStorage.getItem("tab") || this.tab;
  },
  mounted() {},
};
</script>

<style lang="less">
@import url("./assets/allCss/App.less");
</style>
