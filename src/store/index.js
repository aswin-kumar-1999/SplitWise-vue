import { createStore } from "vuex";
import transaction from '../data/transaction.json'
import user from '../data/user.json'
import group from '../data/group.json'

export default createStore({
  state: { transaction, user, group },
  mutations: {},
  actions: {},
  modules: {},
});
