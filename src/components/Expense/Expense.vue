<template>
  <teleport to="#backDrop">
    <BackDrop>
      <div class="card">
        <header
          className="d-flex justify-content-between align-items-center
                             px-2 py-1 fs-5 fw-bold rounded-top-3 header"
        >
          <span>Add an expense</span>
          <i class="fas fa-times" @click="$emit('close')"></i>
        </header>

        <form onSubmit="{this.formHandler}">
          <div className="d-flex">
            <div className="row p-1">
              <div className="col-5">With you and :</div>
              <input
                type="text"
                className="col-6"
                placeholder="Enter the name"
                @keypress.enter="nameHandler"
                @blur="nameHandler"
                @change="nameChange"
                :value="name"
              />
              <div v-if="nameErr" className="error">Enter atleast two name</div>
              <div class="d-flex flex-wrap flex-row">
                <div
                  v-for="name in nameList"
                  :key="name"
                  className="m-2 px-2 border border-2 rounded-pill "
                >
                  {{ name }}
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="d-flex ps-3 pe-1">
            <img
              src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
              class="category rounded-3"
              alt="img"
            />
            <div className="ps-2">
              <input
                type="text"
                className="col-9 mb-2"
                placeholder="Enter a description"
              />
              <br />
              ₹ <input type="number" className="col-8" placeholder="0.00" />
              <div v-if="err" className="error">enter the proper amount</div>
            </div>
          </div>
          <div className="my-2 px-3">
            <div className="text-center">
              Paid by
              <span className="credit" @click="popPayer = !popPayer">
                {{ payer }}
              </span>
              and split
              <span className="credit" @click="shareHandler"> {{ share }}</span>
            </div>
            <div className="text-center">
              ({this.state.shareamount.toFixed(2)}/person)
            </div>
          </div>
          <div className="btn">
            <button
              type="button"
              className="px-3 my-1 rounded-pill"
              onClick="{this.groupHandler}"
            >
              {this.state.group}
            </button>
          </div>
        </form>

        <hr />
        <div>
          <div className="row d-flex justify-content-end m-2">
            <button
              type="button"
              className="btn btn-outline-secondary bg-opacity-10 col-3 me-2"
              onClick="{this.props.onBackDrop}"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn px-3 btn-settle col-3 me-2"
              onClick="{this.savehandler}"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </BackDrop>
    {{popPayer}}
    <Paid
      v-if="popPayer"
      :nameList="nameList"
      @onSelectPayer="payerSelector"
      heading="Choose the payer"
    />}
  </teleport>
</template>

<script>
import BackDrop from "../UI/BackDrop.vue";
import Paid from "./Paid.vue"
export default {
  name: "Expense",
  data() {
    return {
      name: "",
      nameList: [],
      owe: "",
      share: "equally",
      shareamount: 0.0,
      group: "No group",
      splitShare: false,
      amount: 0,
      description: "",
      err: false,
      payer: "you",
      groupName: [],
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
    payerSelector(name){
      console.log("name",name)
      if(name !== ''){
        this.payer=name;
      }
      this.popPayer=!this.popPayer
    },
  },
  components: { BackDrop ,Paid},
  emits:['close']
};
</script>

<style scoped>
.category {
  width: 70px;
  height: 70px;
}
</style>