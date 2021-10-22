<template>
  <div>
    <div class="d-flex head align-items-center py-2">
      <img
        src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-ruby36-100px.png"
        alt="#"
        className="rounded-circle img mx-2 "
      />
      <h3>{{ userName }}</h3>
    </div>

    <div v-if="paidBy.length === 0" class="d-flex justify-content-center flex-column align-items-center mt-5">
      <img
        src="https://assets.splitwise.com/assets/fat_rabbit/app/checkmark-circle-ae319506ad7196dc77eede0aed720a682363d68160a6309f6ebe9ce1983e45f0.png"
      />
      <h2>All settled</h2>
    </div>
    <div v-if="paidBy.length !== 0">
      <div v-for="(person, index) in paidBy" :key="index">
        <UserBlock
          :paidBy="person"
          :amount="amount[index]"
          :desc="desc[index]"
          :sharedBy="sharedBy[index]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import UserBlock from "../User/UserBlock.vue";
export default {
  name: "User",
  data() {
    return {
      userName: "",
      uname: "",
      paidBy: [],
      amount: [],
      desc: [],
      sharedBy: [],
      temp: -1,
      transactions: [],
      sort: false,
      count: 0,
    };
  },
  created() {
    this.userName = this.$route.params.id;

    this.updateData();
    this.addData();
  },
  updated() {
    this.userName = this.$route.params.id;
    this.updateData();
    if (!this.sort) {
      this.transactions = [...new Set(this.transactions)];
      this.sort = true;
    }
    if (this.transactions.length !== this.count && this.sort) {
      this.addData();
    }
  },
  methods: {
    updateData() {
      if (this.$store.state.user[this.userName]) {
        if (this.userName !== this.uname) {
          this.uname = "";
          this.paidBy = [];
          this.amount = [];
          this.desc = [];
          this.temp = -1;
          this.transactions = [];
          this.sort = false;
          this.count = 0;

          for (let key in this.$store.state.user[this.userName]) {
            if (key !== "owes") {
              this.temp = this.transactions.length;
              this.transactions = [
                ...this.transactions,
                ...this.$store.state.user[this.userName][key],
              ];
              this.uname = this.userName;
              this.sort = false;
            }
          }
          for (let element of this.$store.state.user[this.userName]["owes"]) {
            this.temp = this.transactions.length;
            this.transactions = [
              ...this.transactions,
              ...this.$store.state.user[element][this.userName],
            ];
            this.uname = this.userName;
          }
        }
      }
    },
    addData() {
      this.transactions.map((element) => {
        if (this.$store.state.dashTransaction[element]) {
          if (
            this.$store.state.dashTransaction[element]["owes"].includes(
              this.userName
            ) ||
            this.$store.state.dashTransaction[element]["paid_by"] ===
              this.userName
          ) {
            this.paidBy = [
              ...this.paidBy,
              this.$store.state.dashTransaction[element].paid_by,
            ];
            this.amount = [
              ...this.amount,
              this.$store.state.dashTransaction[element].amount,
            ];
            this.sharedBy = [
              ...this.sharedBy,
              this.$store.state.dashTransaction[element]["owes"].length,
            ];
            this.desc = [
              ...this.desc,
              this.$store.state.dashTransaction[element].desc,
            ];
            this.count = this.transactions.length;
          }
        }
      });
    },
  },
  components: { UserBlock },
};
</script>

<style scoped>
</style>