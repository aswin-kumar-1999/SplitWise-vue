<template>
  <teleport to="#backDrop">
    <BackDrop>
      <div class="card">
        <header
          class="
            d-flex
            justify-content-between
            align-items-center
            px-2
            py-1
            fs-5
            fw-bold
            rounded-top-3
            header
          "
        >
          <span>Add an expense</span>
          <i class="fas fa-times" @click="$emit('close')"></i>
        </header>

        <form
          onSubmit="{this.formHandler}"
          class="d-flex justify-content-center flex-column align-items-center"
        >
          <div class="d-flex">
            <div class="row p-1">
              <div class="col-5">With you and :</div>
              <input
                type="text"
                class="col-6"
                placeholder="Enter the name"
                @keypress.enter="nameHandler"
                @blur="nameHandler"
                @change="nameChange"
                :value="name"
              />
              <div v-if="nameErr" class="error">Enter atleast two name</div>
              <div class="d-flex flex-wrap flex-row">
                <div
                  v-for="name in nameList"
                  :key="name"
                  class="m-2 px-2 border border-2 rounded-pill"
                >
                  {{ name }}
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div class="d-flex ps-3 pe-1">
            <img
              src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
              class="category rounded-3"
              alt="img"
            />
            <div class="ps-2">
              <input
                type="text"
                class="col-9 mb-2"
                placeholder="Enter a description"
                v-model="description"
              />
              <br />
              ₹
              <input
                type="number"
                class="col-8"
                placeholder="0.00"
                @keypress.enter="amountHandler"
                @blur="amountHandler"
              />
              <div v-if="err" class="error">enter the proper amount</div>
            </div>
          </div>
          <div class="my-2 px-3">
            <div class="text-center">
              Paid by
              <span class="credit" @click="popPayer = !popPayer">
                {{ payer }}
              </span>
              and split
              <span class="credit" @click="popShare = !popShare">
                {{ share }}</span
              >
            </div>
            <div class="text-center">{{ shareamount }} / person</div>
          </div>
          <div class="btn">
            <button
              type="button"
              class="px-3 my-1 rounded-pill"
              @click="popGroup = !popGroup"
            >
              {{ group }}
            </button>
          </div>
        </form>

        <hr />
        <div>
          <div class="row d-flex justify-content-end m-2">
            <button
              type="button"
              class="btn btn-outline-secondary bg-opacity-10 col-3 me-2"
              @click="$emit('close')"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn px-3 btn-settle col-3 me-2"
              @click="addExpenseHandler"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </BackDrop>
    <Paid
      v-if="popPayer"
      :nameList="nameList"
      @onSelectPayer="payerSelector"
      heading="Choose the payer"
    />
    <Share v-if="popShare" :nameList="nameList" @close="shareHandler" />
    <Group
      v-if="popGroup"
      :nameList="Object.keys($store.state.group)"
      @onSelectPayer="groupSelector"
      heading="Choose the group"
    />
  </teleport>
</template>

<script>
import BackDrop from "../UI/BackDrop.vue";
import Paid from "./Paid.vue";
import Group from "./Paid.vue";

import Share from "./Share.vue";

export default {
  name: "Expense",
  data() {
    return {
      name: "",
      nameList: [],
      owes: "",
      share: "equally",
      group: "No group",
      amount: 0,
      description: "",
      err: false,
      payer: "you",
      groupName: [],
      popShare: false,
      popPayer: false,
      popGroup: false,
      nameErr: false,
    };
  },
  methods: {
    nameHandler(event) {
      const name = event.target.value.toLowerCase();
      if (!this.nameList.includes(name) && name.length !== 0) {
        this.nameList = [...this.nameList, name];
        this.name = "";
      } else {
        this.name = "";
      }
    },
    nameChange(event) {
      this.name = event.target.value;
    },
    amountHandler(event) {
      const amount = +event.target.value;
      if (amount !== 0) {
        this.amount = amount;
        this.err = false;
      } else {
        this.amount = 0;
        this.err = true;
      }
    },
    payerSelector(name) {
      console.log("name", name);
      if (name !== "") {
        this.payer = name;
      }
      this.popPayer = !this.popPayer;
    },
    addExpenseHandler() {
      if (this.nameList.length >= 2 && !this.err) {
        const payer = this.payer === "you" ? "aswin" : this.payer;
        this.nameErr = false;
        const owes = this.nameList.filter((name) => name !== payer);

        //Vuex
        this.$store.dispatch("addExpense", {
          amount: this.amount,
          paid_by: payer,
          owes,
          desc: this.description,
          group: this.group,
        });

        this.$emit("close");
      }
      if (this.nameList.length < 2) {
        this.nameErr = true;
      }
    },
    shareHandler(unchecked) {
      console.log(unchecked);
      const nameList = this.nameList.filter((name) => {
        if (unchecked.includes(name)) {
          return false;
        } else {
          return true;
        }
      });
      this.nameList = nameList;
      this.popShare = !this.popShare;
    },
    groupSelector(group) {
      if (group !== "") {
        const groupUser = this.$store.state.group[group].users;
        this.group = group;
        this.nameList = groupUser;
      }
      this.popGroup = !this.popGroup;
    },
  },
  computed: {
    shareamount() {
      console.log("name", this.nameList, this.amount);
      if (this.nameList.length !== 0 && this.amount > 0) {
        return (+this.amount / this.nameList.length).toFixed(2);
      } else {
        return 0;
      }
    },
  },
  components: { BackDrop, Paid, Share, Group },
  emits: ["close"],
};
</script>

<style scoped>
.category {
  width: 70px;
  height: 70px;
}
</style>