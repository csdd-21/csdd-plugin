<template>
  <div class="login">
      <el-dialog title="提示" v-model="show.dialog" width="30%">
        <div>
          <el-button @click="show.pass=true">管理员</el-button>
          <el-button @click="dialogVisible = false">访客</el-button>
        </div>

        <el-form :model="form" v-if='show.pass' :rules="rules" ref="ruleForm" label-width="60px">
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
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="show.dialog = false">取 消</el-button>
          </span>
        </template>
      </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {},
  props: {},
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style lang='less' scoped>
.login{
}
</style>