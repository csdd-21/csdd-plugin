import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'
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
      nav: false,
      new: false,
      about: false,
      dialog: false,
      admin: false,
      footer: false,
    },
    showFooter: false,
  },
  getters,
  actions,
  mutations
})
