<template>
  <div>
    <div className="activity head">
      <h3 className="activityHead p-3">All Expense</h3>
    </div>
    <div v-for="item in transactionData" :key="item">
      <ExpenseCards
        :paid_by="item.paid_by"
        :amount="item.amount"
        :desc="item.desc"
        :owes="item.owes"
      />
    </div>
  </div>
</template>

<script>
import ExpenseCards from "./ExpenseCards.vue";
export default {
  name: "AllExpense",
  data() {},
  components: { ExpenseCards },
  computed: {
    transactionData() {
      return Object.values(this.$store.state.transaction);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>