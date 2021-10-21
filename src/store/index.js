import { createStore } from "vuex";
import transaction from '../data/transaction.json'
import dashTransaction from '../data/transaction.json'
import user from '../data/user.json'
import group from '../data/group.json'

export default createStore({
  state: { transaction, user, group, dashTransaction },
  mutations: {
    addNewExpense(state, { amount, paid_by, owes, desc, group: groupName }) {
      const lastTransaction = +transaction.last + 1;
      state.dashTransaction[lastTransaction] = {
        amount,
        paid_by,
        owes,
        desc
      }
      state.transaction[lastTransaction] = {
        amount,
        paid_by,
        owes,
        desc
      }
      transaction.last = lastTransaction;
      if (groupName === 'No group') {
        user[paid_by] = user[paid_by] ?? {}
        console.log("owe", owes)
        owes.forEach(name => {
          user[paid_by] = {
            ...user[paid_by],
            [name]: user[paid_by][name] ?? [],
            owes: user[paid_by].owes ?? []
          }
          user[paid_by] = {
            ...user[paid_by],
            [name]: [...user[paid_by][name], lastTransaction],
          }
          user[name] = user[name] ?? {};
          user[name] = {
            ...user[name],
            owes: user[name].owes ?? []
          }
          user[name] = {
            ...user[name],
            owes: [...user[name].owes, paid_by]
          }
        })
      }
      else {
        group[groupName] = {
          transaction: [...group[groupName].transaction, lastTransaction],
          users: [...group[groupName].users]
        }
      }
    }
  },
  actions: {
    addExpense({ commit }, { amount, paid_by, owes, desc, group }) {
      commit("addNewExpense", { amount, paid_by, owes, desc, group })
    }
  },
  modules: {},
});
