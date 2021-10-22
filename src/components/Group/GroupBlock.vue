<template>
  <div className="groupBlock d-flex justify-content-between align-items-center">
    <div>
      <img
        src="https://s3.amazonaws.com/splitwise/uploads/notifications/v2021/0-18.png"
        alt="%"
        class="img mx-3"
      />
      <span className="group-display-desc-text"> {{desc}} </span>
    </div>
    <div class="px-2">{{paidBy}} paid ₹ {{amount}}</div>
  </div>
</template>

<script>
export default {
  name: "GroupBlock",
  data() {
    return {
      greenColor: "#07e2b3",
      redColor: "#ff4000",
    };
  },
  props: ["paidBy", "amount", "desc"],
};
</script>

<style scoped>
.img {
  height: 50px;
  width: 50px;
}
</style>