import actions from './actions.js'
import mutations from './mutations.js'
import { createStore } from 'vuex'

export default createStore({
  state: {
    loading: false,
    req: {
      title: "",
      tags: [],
      checkTags: [],
      page: {
        skip: 1,
        limit: 6,
      }
    },
    res: {
      datas: [],
      total: 0,
    },
    show: {
      nav:false,
      footer: false,
      // 登录对话框
      fabuIcon:false,
      backIcon:false,
      dialog:false,
      admin:false,
    },
  },
  actions,
  mutations
})
