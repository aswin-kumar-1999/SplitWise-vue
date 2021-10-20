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
              <button type="button" class="btn btn-expense">
                Add an expense
              </button>
              <button type="button" class="btn btn-settle">Settle up</button>
            </div>
          </div>
          <div class="border-top border-bottom border-2">
            <div className="row py-1 fs-6 ">
              <div className="col-sm-4 border-end text-center ">
                total balance<br />
                
                <span v-show="total >= 0" class="credit">₹ {{
                  total.toFixed(2)
                }}</span>
                <span v-show="total < 0" class="debt">₹ {{
                  total.toFixed(2) * -1
                }}</span>
              </div>
              <div className="col-sm-4 border-end text-center">
                <div>
                  you owe
                  <span className="debt">
                    <br />
                    ₹ {{ owe.toFixed(2) * -1 }}
                  </span>
                </div>
              </div>
              <div className="col-sm-4 text-center">
                <div>
                  you are owed
                  <span className="credit">
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
      <div className="d-flex ">
        <span className="border-end border-1 col-6 color">
          <template v-for="(expense, index) in debt" :key="index">
            <Debt :name="expense[0]" :amount="expense[1]" />
          </template>
        </span>
        <span className="border-start border-1 col-6 color">
          <template v-for="(expense, index) in credit" :key="index">
            <Credit :name="expense[0]" :amount="expense[1]" />
          </template>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Credit from "./Credit.vue";
import Debt from "./Debit.vue";
export default {
  name: "DashBoard",
  data() {
    return {
      credit: [],
      debt: [],
      lent: 0,
      owe: 0,
    };
  },
  components: { Debt, Credit },
  created() {
    this.dataExtraction();
  },
  methods: {
    dataExtraction() {
      const user = "aswin";
      this.credit = [];
      this.debt = [];
      for (
        let index = 1;
        index <= this.$store.state.transaction.last;
        index++
      ) {
        if (this.$store.state.transaction[index]) {
          if (this.$store.state.transaction[index].paid_by === user) {
            const shareamount =
              +this.$store.state.transaction[index].amount /
              (this.$store.state.transaction[index].owes.length + 1);
            const lent =
              +this.$store.state.transaction[index].amount - shareamount;
            const owesName =
              this.$store.state.transaction[index].owes.join(", ");
            this.credit = [
              ...this.credit,
              [
                owesName,
                shareamount,
                this.$store.state.transaction[index].desc,
              ],
            ];
            this.lent += lent;
            console.log("dfas", this.lent, lent);
          }
          if (this.$store.state.transaction[index].owes.includes(user)) {
            const shareamount =
              +this.$store.state.transaction[index].amount /
              (this.$store.state.transaction[index].owes.length + 1);
            this.debt = [
              ...this.debt,
              [
                this.$store.state.transaction[index].paid_by,
                shareamount,
                this.$store.state.transaction[index].desc,
              ],
            ];
            this.owe -= shareamount;
          }
        }
      }
    },
  },
  computed: {
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
.head {
  background: rgba(236, 236, 236, 0.836);
}
.owe {
  color: grey;
  font-weight: 600;
}
.color{
    color: rgb(100, 100, 100);
}
</style>