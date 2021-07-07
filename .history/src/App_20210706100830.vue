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
      <el-footer v-if="show.footer"> Made with csdd - <a href="https://github.com/csdd-21" target="_blank"> Click here to enter Github</a> <i class="iconfont icon-github"></i></el-footer>
    </el-container>
    <el-dialog title="提示" v-model="show.dialog" width="30%" :before-close="clear_form">
      <div class="btns">
        <el-button @click="show.admin = true" v-if="!show.admin">管理员</el-button>
        <el-button @click="click_visitor" v-if="!show.admin">访客</el-button>
      </div>
      <el-form v-if="show.admin" :model="form" :rules="rules" ref="formRef" label-width="65px">
        <span class="hint">请输入管理员账号和密码</span>
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="text" v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-button @click="click_login">登录</el-button>
      </el-form>
      <i class="hint" v-if="!show.admin"><i class="iconfont icon-xinghao" v-if="!show.admin"></i> 管理员可以直接发布文章，访客新增的文章需要在审核完后才会发布喔~</i>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "App",
  components: {},
  data() {
    return {
      tab: "about",
      routerKey: "",
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  watch: {
    routerKey(val) {
      return this.$route.path + Date.now();
    },
    tab(val) {
      // window.sessionStorage.setItem("tab", val);
    },
  },
  computed: {
    ...mapState(["show"]),
  },
  components: {},
  methods: {
    ...mapMutations(["SET_SHOW_PARAMS"]),

    // 导航tab跳转
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

    //  对话框
    clear_form() {
      this.$refs["formRef"] ? this.$refs["formRef"].resetFields() : "";
      this.form.username = this.form.password = "";
      this.SET_SHOW_PARAMS([
        { key: "dialog", value: false },
        { key: "admin", value: false },
      ]);
    },
    click_add() {
      this.SET_SHOW_PARAMS([{ key: "dialog", value: true }]);
    },
    click_back() {
      this.$router.push({ name: "home" });
      this.clear_form();
    },
    click_login() {
      this.$refs["formRef"].validate((valid) => {
        if (valid) {
          this.axios({ method: "post", url: "/api/login", data: this.form })
            .then((res) => {
              if (res.data.status == 401) {
                this.$alert(res.data.message, "登录失败", {
                  confirmButtonText: "确定",
                  customClass: "alertBox",
                });
              }
              if (res.data.status == 200) {
                this.$message({
                  message: "登录成功",
                  type: "info",
                  customClass: "msgBoxInfo",
                });
                this.$router.push({ name: "new", params: { auth: "admin" } });
                sessionStorage.setItem("auth", "admin");
                this.clear_form();
              }
            })
            .catch((err) => {});
        }
      });
    },
    click_visitor() {
      this.$router.push({ name: "new", params: { auth: "visitor" } });
      this.SET_SHOW_PARAMS([{ key: "dialog", value: false }]);
      sessionStorage.setItem("auth", "visitor");
    },
  },
  created() {
    // this.tab = window.sessionStorage.getItem("tab") || this.tab;
  },
};
</script>

<style lang="less">
@import url("./assets/allCss/App.less");
</style>
