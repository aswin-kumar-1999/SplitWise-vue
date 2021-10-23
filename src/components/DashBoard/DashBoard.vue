<template>
  <div>
    <div>
      <div>
        <div class="p-3 head">
          <div
            class="
              d-flex
              flex-wrap
              justify-content-between
              align-items-center
              mb-2
            "
          >
            <h3>Dashboard</h3>
            <div class="d-flex justify-content-between">
              <button
                type="button"
                class="btn btn-expense"
                @click="popExpense = !popExpense"
              >
                Add an expense
              </button>
              <button
                type="button"
                class="btn btn-settle"
                @click="popSettleUp = !popSettleUp"
              >
                Settle up
              </button>
            </div>
          </div>
          {{ userChange }}
          <div class="border-top border-bottom border-2">
            <div class="row py-1 fs-6">
              <div class="col-sm-4 border-end text-center">
                total balance<br />

                <span v-show="total >= 0" class="credit"
                  >₹ {{ total.toFixed(2) }}</span
                >
                <span v-show="total < 0" class="debt"
                  >₹ {{ total.toFixed(2) * -1 }}</span
                >
              </div>
              <div class="col-sm-4 border-end text-center">
                <div>
                  you owe
                  <span class="debt">
                    <br />
                    ₹ {{ owe.toFixed(2) * -1 }}
                  </span>
                </div>
              </div>
              <div class="col-sm-4 text-center">
                <div>
                  you are owed
                  <span class="credit">
                    <br />
                    ₹ {{ lent.toFixed(2) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="owe d-flex justify-content-between mx-4 my-2">
          <span>YOU OWE</span>
          <span>YOU ARE OWED</span>
        </div>
      </div>
      <div
        v-if="debt.length === 0 && credit.length === 0"
        class="
          d-flex
          justify-content-center
          align-items-center
          my-5
          flex-column
        "
      >
        <img
          src="https://assets.splitwise.com/assets/fat_rabbit/app/checkmark-circle-ae319506ad7196dc77eede0aed720a682363d68160a6309f6ebe9ce1983e45f0.png"
        />
        <h2>All settled</h2>
      </div>
      <div class="d-flex">
        <span class="border-end border-1 col-6 color">
          <template v-for="(expense, index) in debt" :key="index">
            <Debt :name="expense[0]" :amount="expense[1]" />
          </template>
        </span>
        <span class="border-start border-1 col-6 color">
          <template v-for="(expense, index) in credit" :key="index">
            <Credit :name="expense[0]" :amount="expense[1]" />
          </template>
        </span>
      </div>
    </div>
  </div>
  <div v-if="popExpense">
    <Expense @close="addExpense" />
  </div>
  <Settle
    v-if="popSettleUp"
    :debt="debt"
    :credit="credit"
    :user="this.$store.state.userId"
    :total="lent + owe"
    @onClose="settleUpHandler"
  />
</template>

<script>
import Credit from "./Credit.vue";
import Debt from "./Debit.vue";
import Expense from "../Expense/Expense.vue";
import Settle from "../Settle/Settle.vue";

export default {
  name: "DashBoard",
  data() {
    return {
      credit: [],
      debt: [],
      lent: 0,
      owe: 0,
      user: "",
      popExpense: false,
      popSettleUp: false,
    };
  },
  components: { Debt, Credit, Expense, Settle },
  created() {
    this.dataExtraction();
  },
  updated() {
    // if (this.user !== this.$store.state.userId) {
    //   this.dataExtraction();
    // }
  },
  methods: {
    dataExtraction() {
      const user = this.$store.state.userId;
      this.user = user;
      this.credit = [];
      this.debt = [];
      this.lent = 0;
      this.owe = 0;
      for (
        let index = 1;
        index <= this.$store.state.dashTransaction.last;
        index++
      ) {
        if (this.$store.state.dashTransaction[index]) {
          if (this.$store.state.dashTransaction[index].paid_by === user) {
            const shareamount =
              +this.$store.state.dashTransaction[index].amount /
              (this.$store.state.dashTransaction[index].owes.length + 1);
            const lent =
              +this.$store.state.dashTransaction[index].amount - shareamount;
            const owesName =
              this.$store.state.dashTransaction[index].owes.join(", ");
            this.credit = [
              ...this.credit,
              [
                owesName,
                shareamount,
                this.$store.state.dashTransaction[index].desc,
              ],
            ];
            this.lent += lent;
          }
          if (this.$store.state.dashTransaction[index].owes.includes(user)) {
            const shareamount =
              +this.$store.state.dashTransaction[index].amount /
              (this.$store.state.dashTransaction[index].owes.length + 1);
            this.debt = [
              ...this.debt,
              [
                this.$store.state.dashTransaction[index].paid_by,
                shareamount,
                this.$store.state.dashTransaction[index].desc,
              ],
            ];
            this.owe -= shareamount;
          }
        }
      }
      this.$store.commit("settlement", {
        credit: this.credit,
        debt: this.debt,
      });
    },
    addExpense() {
      this.popExpense = !this.popExpense;
      this.dataExtraction();
    },
    settleUpHandler(bool) {
      if (bool) {
        this.popSettleUp = !this.popSettleUp;
        this.dataExtraction();
      }
    },
  },
  computed: {
    userChange() {
      if (this.user !== this.$store.state.userId) {
        this.dataExtraction();
      }
      return "";
    },
    total() {
      return this.lent + this.owe;
    },
  },
};
</script>


<style scoped>
.btn-expense {
  cursor: pointer;
  background-color: #ff4000;
  font-size: 14px;
  color: #fff3ef;
  border: none;
  border-radius: 5px;
  padding: 8px;
  margin-right: 20px;
}

.btn-settle {
  cursor: pointer;
  background-color: #07e2b3;
  font-size: 14px;
  color: #e2fdf7;
  border: none;
  border-radius: 5px;
  padding: 8px;
}

.owe {
  color: grey;
  font-weight: 600;
}
.color {
  color: rgb(100, 100, 100);
}
</style>