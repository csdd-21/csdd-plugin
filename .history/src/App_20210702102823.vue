<template>
  <div id="app">
    <el-container id="content">
      <div class="navSm">
        <div class="nav">
          <span class="col-xs-10"><span @click="clickHome">CSDD-plugin</span></span>
          <span class="col-xs-2">
            <i class="iconfont icon-daohang1" @click="show.nav = true"></i>
          </span>
        </div>
        <div class="navTabs" v-show="show.nav">
          <i class="iconfont icon-guanbi" @click="show.nav = false"></i>
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
      <el-button class="add" @click="click_add" v-show="!show.new && !show.about"><i class="iconfont icon-fabu"></i></el-button>
      <el-button class="add" @click="click_back" v-show="show.new && !show.about"><i class="iconfont icon-fanhui"></i></el-button>

      <el-dialog title="提示" v-model="show.dialog" width="30%" :before-close="handleClose">
        <div>
           <el-button @click="dialogVisible = false">管理员</el-button>
            <el-button @click="dialogVisible = false">访客</el-button>
        </div>
        <span>管理员可以直接发布文章，访客新增的文章需要在审核完后才会发布哦~</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="show.dialog = false">取 消</el-button>
          </span>
        </template>
      </el-dialog>

      <router-view style="min-height: 80vh; padding-bottom: 80px" :key="routerKey" />
      <el-footer v-show="!show.new"> Made with csdd - <a href="https://github.com/csdd-21?tab=repositories" target="_blank"> Click here to enter Github</a> <i class="iconfont icon-github"></i></el-footer>
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
      show: {
        nav: false,
        new: false,
        about: false,
        dialog:true,
      },
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
      this.show.new = false;
      this.show.about = false;
    },
    clickNavTab(i) {
      this.$router.push({ name: i });
      this.show.nav = false;
    },
    clickElTab(tab, event) {
      if (tab.props.name == "about") {
        this.show.new = false;
        this.show.about = true;
      } else {
        this.show.about = false;
      }
      this.$router.push({ name: JSON.parse(JSON.stringify(this.tab)) });
    },
    click_add() {
      // this.$router.push({ name: "new" });
      this.show.new = true;
    },
    click_back() {
      this.$router.push({ name: "home" });
      this.show.new = false;
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
