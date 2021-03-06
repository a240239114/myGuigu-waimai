import Vue from 'vue';
import Vuex from 'vuex';

//导入Store参数
import state from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';


Vue.use(Vuex);

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
})
    