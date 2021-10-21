<template>
  <BackDrop>
    <div class="card">
      <header
        className="d-flex justify-content-between 
           align-items-center px-2 py-1 fs-5 fw-bold
            rounded-top-3 header"
      >
        <span>{{ heading }}</span>
        <i className="fas fa-times" @click="$emit('onSelectPayer', name)"></i>
      </header>
      <div className="px-3">
        <div class="form-check">
          <div v-for="name in nameList" :key="name">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              @change="payerhandler"
              :value="name"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              {{name}}
            </label>
          </div>
        </div>
      </div>
    </div>
  </BackDrop>
</template>

<script>
import BackDrop from "../UI/BackDrop.vue";

export default {
  name: "Paid",
  data() {
    return { name: "" };
  },
  components: { BackDrop },
  props: ["nameList", "heading"],
  methods: {
    payerhandler(event) {
      if (event.target.checked) {
        this.name = event.target.value;
      }
    },
  },
  emits: ["onSelectPayer"],
};
</script>

<style scoped>
</style>