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

      <Login class='login' />

      <router-view style="min-height: 80vh; padding-bottom: 80px" :key="routerKey" />
      <el-footer v-show="!show.new"> Made with csdd - <a href="https://github.com/csdd-21?tab=repositories" target="_blank"> Click here to enter Github</a> <i class="iconfont icon-github"></i></el-footer>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Login from "./components/Login.vue";
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
        // dialog: true,
        // pass:false
      },
      form: {
        username: "test_01",
        password: "11",
      },
    };
  },
  components:{
    Login,
  },
  watch: {
    routerKey(val) {
      return this.$route.path + Date.now();
    },
    tab(val) {
      window.sessionStorage.setItem("tab", val);
    },
  },
  computed: {
    ...mapState(['show'])
  },
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
      this.show.dialog = true
    },
    click_back() {
      // this.$router.push({ name: "home" });
      this.show.new = false;
    },
    click_login(){

    }
  },
  created() {
    this.tab = window.sessionStorage.getItem("tab") || this.tab;
  },
  mounted() {},
};
</script>

<style lang="less">
@import url("./assets/allCss/App.less");
.login{
  position: absolute;
  left: 50%;
  top:50%;
  transform:translate(-50%,-50%);
  z-index:1000;
}
</style>
