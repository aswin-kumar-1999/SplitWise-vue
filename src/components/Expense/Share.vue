<template>
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
        <span>Share an expense</span>
        <i className="fas fa-times" @click="$emit('close', uncheckname)"></i>
      </header>
      <div className="px-3">
        <h4>Split equally</h4>
        <div class="form-check">
          <div v-for="name in nameList" :key="name">
            <input
              className="form-check-input"
              type="checkbox"
              :value="name"
              id="flexCheckChecked"
              defaultChecked
              @change="checkHandler"
            />
            <label className="form-check-label" for="flexCheckChecked">
              {{ name }}
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
  name: "Share",
  data() {
    return { uncheckname: [] };
  },
  methods: {
    checkHandler(event) {
      if (!event.target.checked) {
        this.uncheckname = [...this.uncheckname, event.target.value];
      }
    },
  },
  components: { BackDrop },
  props: ["nameList"],
  emits: ["close"],
};
</script>

<style lang="scss" scoped>
</style>