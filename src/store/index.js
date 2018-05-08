import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
// es6语法规范，通过import * as actions，便可以直接使用actions.XXX直接获取里面的exportg后的值，以免多次利用{}
import createLogger from 'vuex/dist/logger'
// 每次修改 mutations 时会在 console 打印出修改记录

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'// 线下调试

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug, // 开启debug严格模式,检测mutations修改,开启会消耗性能，不适合线上使用
  plugins: debug ? [createLogger()] : []
})