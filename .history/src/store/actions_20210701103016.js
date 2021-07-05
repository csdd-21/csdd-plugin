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
        console.log('1111111111111');
        commit('SET_LOADING', true)
        return axios
            .post("/api/plugins", state.req)
            .then((res) => {
                console.log('2222222222222222');
                if (res.status == 200) {
                   
                    commit('GET_DATAS', res.data)
                    console.log('3333333333333');
                }
                console.log('getArticles ----', res.data);
            })
            .catch(function (err) { })
    },
}