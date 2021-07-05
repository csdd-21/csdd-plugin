<template>
  <div id="app">
    <el-container id="content">
      <div class="navSm">
        <div class="nav">
          <span class="col-xs-10"><span @click="click_home">CSDD-plugin</span></span>
          <span class="col-xs-2">
            <i class="iconfont icon-daohang1" @click="show.nav = true"></i>
          </span>
        </div>
        <div class="navTabs" v-show="show.nav">
          <i class="iconfont icon-guanbi" @click="show.nav = false"></i>
          <span @click="click_sm_tab('home')">Home</span>
          <span @click="click_sm_tab('about')">About</span>
        </div>
      </div>
      <el-header>
        <div class="navLg">
          <span class="head" @click="click_home"> 前端插件库</span>
          <el-tabs v-model="tab" @tab-click="click_lg_tab">
            <el-tab-pane label="Home" name="home" key="home"></el-tab-pane>
            <el-tab-pane label="About" name="about" key="about"></el-tab-pane>
          </el-tabs>
        </div>
      </el-header>
      <el-button class="add" @click="click_add" v-show="show.fabuIcon"><i class="iconfont icon-fabu"></i></el-button>
      <el-button class="add" @click="click_back" v-show="show.backIcon"><i class="iconfont icon-fanhui"></i></el-button>
      <router-view style="min-height: 80vh; padding-bottom: 80px" :key="routerKey" />
      <el-footer v-if="show.footer"> Made with csdd - <a href="https://github.com/csdd-21?tab=repositories" target="_blank"> Click here to enter Github</a> <i class="iconfont icon-github"></i></el-footer>
    </el-container>
    <el-dialog title="提示" v-model="show.dialog" width="30%" :before-close="click_close_dialog">
      <div>
        <el-button @click="show.admin = true" v-if="!show.admin">管理员</el-button>
        <el-button @click="click_visitor" v-if="!show.admin">访客</el-button>
      </div>
      <el-form v-if="show.admin" :model="form" :rules="rules" ref="ruleForm" label-width="60px">
        <span>请输入管理员账号和密码</span>
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="text" v-model="form.password" show-password></el-input>
        </el-form-item>
        <div class="btns">
          <el-button @click="click_login">登录</el-button>
        </div>
      </el-form>
      <span>管理员可以直接发布文章，访客新增的文章需要在审核完后才会发布哦~</span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "App",
  components: {},
  data() {
    return {
      tab: "home",
      routerKey: "",
      form: {
        username: "plugins",
        password: "11",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
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
  computed: {
    ...mapState(["show"]),
  },
  components: {},
  methods: {
    ...mapMutations(["SET_SHOW_PARAMS"]),

    /* 导航tab跳转 start */
    click_home() {
      this.$router.push("/home");
      this.tab = "home";
    },
    click_sm_tab(i) {
      this.$router.push({ name: i });
      this.show.nav = false;
    },
    click_lg_tab(tab, event) {
      this.$router.push({ name: tab.props.name });
    },
    /* 导航tab跳转 end */

    /* 对话框 start */
    click_add() {
      this.SET_SHOW_PARAMS([{ key: "dialog", value: true }]);
    },
    click_back() {
      this.$router.push({ name: "home" });
    },
    click_login() {
      this.axios({ method: "post", url: "/api/login", data: JSON.parse(JSON.stringify(this.form)) })
        .then((res) => {
          if (res.data.status == 401) {
            this.$alert(res.data.message, "登录失败", {
              confirmButtonText: "确定",
              customClass: "infoBox",
            });
          }
          if (res.data.status == 200) {
            this.$message({
              message: "登录成功",
              type: "info",
              customClass: "info",
            });
            this.$router.push({ name: "new", params: { auth: "admin" } });
            this.SET_SHOW_PARAMS([{ key: "dialog", value: false }]);
            sessionStorage.setItem("auth", res.data.data.auth);
          }
          console.log("login res -", res);
        })
        .catch((err) => {
          console.log("login err ---", err);
        });
    },
    click_visitor() {
      this.$router.push({ name: "new", params: { auth: "visitor" } });
      this.SET_SHOW_PARAMS([{ key: "dialog", value: false }]);
    },
    click_close_dialog() {
      this.SET_SHOW_PARAMS([
        { key: "dialog", value: false },
        { key: "admin", value: false },
      ]);
    },
    /* 对话框 end */
  },
  created() {
    this.tab = window.sessionStorage.getItem("tab") || this.tab;
  },
  mounted() {
    console.log("app mounted !!");
  },
};
</script>

<style lang="less">
@import url("./assets/allCss/App.less");
</style>
