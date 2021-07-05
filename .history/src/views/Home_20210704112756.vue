<template>
  <div class="home">
    <FilterCond class="filter" :tags="tags" @handleFilter="handleFilter"> </FilterCond>
    <div class="contentWrapper" v-loading="loading" element-loading-text="Loading..." element-loading-spinner="el-icon-loading">
      <span :style="datas.length == 0 ? empty.show : empty.hide"> <i class="iconfont icon-empty"></i> {{ empty.info }}</span>
      <div class="content col-xs-12 col-md-6" v-for="(i, index) of datas" :key="index">
        <!-- <img :src="require('/public/'+i.imgPath)" :alt="i.title" /> -->
        <img :src="file" />
        <div class="info">
          <b>{{ i.title }}</b>
          <Tags :tag="[i.tag]"></Tags>
          <span class="desc"> {{ i.desc }}</span>
          <el-button class="one"><a :href="i.url" target="__blank">Website</a></el-button>
        </div>
      </div>
    </div>
    <div class="page" :key="page.skip" :style="datas.length == 0 ? empty.hide : ''">
      <el-pagination layout="prev, next, jumper" :total="total" :current-page="page.skip" :page-size="page.limit" @current-change="handleCurrentPage" background> </el-pagination>
      <span class="total"> / 共 {{ Math.ceil(total / page.limit) }} 页</span>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import FilterCond from "@/components/FilterCond";
import Tags from "@/components/Tags";

export default {
  name: "Home",
  components: {
    FilterCond,
    Tags,
  },
  props: {},
  data() {
    return {
      empty: {
        info: "There is no data for this page, please check the database or network !",
        show: {
          display: "block",
          "text-align": "center",
          "margin-top": "20px",
        },
        hide: {
          display: "none",
        },
      },
      file:"",
      items: [
        { message: "one", id: "1" },
        { message: "two", id: "2" },
        { message: "three", id: "3" }
      ]

    };
  },
  watch: {},
  computed: {
    ...mapState({
      loading: (state) => state.loading,
      tags: (state) => state.req.tags,
      page: (state) => state.req.page,
      datas: (state) => state.res.datas,
      total: (state) => state.res.total,
    }),
  },
  methods: {
    ...mapMutations(["SET_SHOW_PARAMS", "SET_REQ_DEFAULT", "SET_REQ"]),
    ...mapActions(["getTags", "getDatas"]),
    handleCurrentPage(val) {
      this.SET_REQ({ skip: val });
      this.getDatas();
    },
    handleFilter(i) {
      this.SET_REQ({ title: JSON.parse(JSON.stringify(i.title)), checkTags: JSON.parse(JSON.stringify(i.tags)) });
      this.getDatas();
    },
  },
  created() {},
  mounted() {
    console.log("home mounted !!");
    this.SET_SHOW_PARAMS([{ key: "fabuIcon", value: true },{ key: "backIcon", value: false },{ key: "footer", value: true }]);
    this.getTags();
    this.getDatas();
    this.axios.post('/api/pngTest').then(res=>{
      console.log('res 0000 ---',res);
      this.file = require(res.data.file)
      // this.$set(this.items,0, {file:this.file} )
      // console.log('items ---',this.items);
      
    })
  },
  unmounted() {
    this.SET_REQ_DEFAULT();
  },
};
</script>

<style lang="less">
@import url("../assets/allCss/Home.less");
</style>
