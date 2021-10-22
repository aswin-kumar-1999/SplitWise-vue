<template>
  <BackDrop>
    <div class="card">
      <div v-if="isSpinner === 0">
        <header
          className="header d-flex justify-content-between align-items-center rounded-top px-2"
        >
          <h4>Settle Up</h4>
          <i className="fas fa-times" @click="$emit('onClose',true)"></i>
        </header>

        <main>
          <div>
            <div
              v-for="(settle, index) in settleUp"
              :key="index"
              class="
                d-flex
                justify-content-center
                my-1
                flex-column
                align-items-center
              "
            >
              <div v-if="settle[1] < 0">
                <span className="name"> you owe </span>
                <span className="debt">
                  {{ settle[0] }} {{ (settle[1] * -1).toFixed(2) }}
                </span>
              </div>

              <div v-if="settle[1] > 0">
                <span className="name">{{ settle[0] }} </span>
                <span className="credit">
                  owe you {{ settle[1].toFixed(2) }}</span
                >
              </div>
            </div>
            <hr />
            <h5
              class="
                d-flex
                justify-content-center
                my-1
                flex-column
                align-items-center
              "
            >
              Total Amount:
              <span v-if="total > 0" className="credit">
                {{ total.toFixed(2) }}
              </span>

              <span v-if="total < 0" className="debt">
                {{ (total * -1).toFixed(2) }}
              </span>
            </h5>
          </div>

          <div className="d-flex fs-3 justify-content-center my-1">
            <button
              type="button"
              className="btn btn-settle"
              @click="settleHandler"
            >
              Settle Up
            </button>
          </div>
        </main>
      </div>

      <div v-if="isSpinner === 1" class="d-flex justify-content-center">
        <div class="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div v-if="isSpinner === 2" className="">
        <header
          className="header d-flex justify-content-between align-items-center rounded-top px-2"
        >
          <h4 >Settle Up</h4>
          <i className="fas fa-times" @click="$emit('onClose',true)"></i>
        </header>
        <h2 class="text-center">Settled Up</h2>
      </div>
    </div>
  </BackDrop>
</template>

<script>
import BackDrop from "../UI/BackDrop.vue";
export default {
  name: "Settle",
  data() {
    return {
      settleUp: [],
      isSpinner: 0,
    };
  },
  props: ["debt", "credit", "user", "total"],
  created() {
    this.sumUpBalance();
  },
  methods: {
    sumUpBalance() {
      const settleUp = {};
      for (let debt of this.debt) {
        const sharePerson = debt[0].split(", ");
        for (let lent of sharePerson) {
          settleUp[lent] = -debt[1] - (settleUp[lent] ?? 0);
        }
      }
      for (let credit of this.credit) {
        console.log(credit[0], credit[1]);
        const sharePerson = credit[0].split(", ");
        for (let owe of sharePerson) {
          settleUp[owe] = credit[1] + (settleUp[owe] ?? 0);
        }
      }
      this.settleUp = Object.entries(settleUp);
    },
    settleHandler() {
      this.isSpinner = 1;
      this.$store.dispatch("settleUp",this.$store.state.userId)
      setTimeout(() => {
        this.isSpinner = 2;
      }, 2000);
    },
  },
  components: { BackDrop },
  emits: ["onClose"],
};
</script>

<style  scoped>
.btn-settle {
  cursor: pointer;
  background-color: #07e2b3;
  font-size: 14px;
  color: #e2fdf7;
  border: none;
  border-radius: 5px;
  padding: 8px;
}

.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #07e2b3;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>