export default {
    GET_TAGS: (state, datas) => {
        state.req.tags = datas.tags
    },
    GET_DATAS: (state, datas) => {
        state.res.datas = datas.datas
        state.res.total = datas.total
        state.loading = false
    },
    SET_LOADING: (state, payload) => {
        state.loading = payload
    },
    SET_REQ_DEFAULT: (state, payload) => {
        let temp = JSON.parse(JSON.stringify(state.req.tags))
        state.req = {
            title: "",
            checkTags: [],
            page: {
                skip: 1,
                limit: 6,
            }
        }
        state.req.tags = temp
    },
    SET_REQ: (state, payload) => {
        if (payload.title) {
            state.req.title = payload.title
        } else {
            state.req.title = ""
        }
        if (payload.checkTags) {
            if (payload.checkTags.length == 0) {
                state.req.checkTags = []
            } else {
                state.req.checkTags = payload.checkTags
            }
        }
        if (payload.sort) {
            state.req.page.sort = payload.sort
        }
        if (payload.skip) {
            state.req.page.skip = payload.skip
        }
        console.log('SET_REQ payload ---', state);
    },
    SET_SHOW_FOOTER: (state, payload) => {
        state.showFooter = payload.showFooter
    },
}