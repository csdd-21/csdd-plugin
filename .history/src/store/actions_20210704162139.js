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
                console.log('getArticles ----', res);
                if (res.status == 200) {
                    commit('GET_DATAS', res.data)
                }
                res.data.datas.forEach(i => {
                     require('http://localhost:9003/1.png') 
                    console.log(' i.imgPath- -', i.imgPath);
                })
            })
            .catch(function (err) { })
    },
}