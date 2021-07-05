import axios from "axios";

export default {
    getTags({ state, commit }, payload) {
        return axios
            .get("/api/tags", state.req)
            .then((res) => {
                if (res.status == 200) {
                    commit('GET_TAGS', res.data)
                }
                console.log('getTags ----', res.data);
            })
            .catch(function (err) { })
    },
    getDatas({ state, commit }, payload) {
        commit('SET_LOADING', true)
        return axios
            .post("/api/plugins", state.req)
            .then((res) => {
                if (res.status == 200) {
                    // commit('GET_DATAS', res.data)
                }
                // res.data.datas.forEach(i => {
                //     i.imgPath = require('C:/Users/86138/Desktop/csdd-server/csdd-plugins-server/' + i.imgPath)
                //     // console.log('j --',require('/public/'+i.imgPath));
                // })
                // // this.axios.get('/api/imgPaths').then(res => {
                //     console.log('res 0000 ---', res);
                //     this.file = require(res.data.imgPaths)
                //     commit('GET_DATAS', res.data)
                // })
                console.log('getArticles ----', res.data);
            })
            .catch(function (err) { })
    },
}