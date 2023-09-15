import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
import cart from './modules/cart';
import menu from './modules/menu'
import user from './modules/user'
import editor from './modules/editor';
var ls = new SecureLS({ isCompression: false });

Vue.use(Vuex)
const dataState = createPersistedState({
  key: ['x'],
  paths: ['user.currentUser'],
  storage: {
    getItem: (key) => ls.get(key),
    setItem: (key, value) => ls.set(key, value),
    removeItem: (key) => ls.remove(key),
  },
  
})
export default new Vuex.Store({
  state: {
  },
  mutations: {

  },
  actions: {

  },
  modules: {
    menu,
    user,
    cart,
    editor
  },
  plugins: [dataState]
})
