<template>
  <div className="groupBlock d-flex justify-content-between align-items-center px-3">
    <div>
      <img
        src="https://s3.amazonaws.com/splitwise/uploads/notifications/v2021/0-18.png"
        alt="%"
        class="img mx-3"
      />
      <span className="group-display-desc-text"> {{ desc }} </span>
    </div>
    <div>{{ paidBy }} paid ₹{{ amount }} (Your Share {{share}})</div>
     <!-- {(this.props.amount / (this.props.sharedBy + 1)).toFixed(2)} -->
  </div>
</template>

<script>
export default {
  name: "UserBlock",
  data() {
    return {
      greenColor: "#07e2b3",
      redColor: "#ff4000",
    };
  },
  props: ["paidBy", "amount", "desc", "sharedBy"],
  computed:{
      share(){
          console.log(this.amount,this.sharedBy)
          return (+this.amount/(+this.sharedBy+1)).toFixed(2)
      }
  }
};
</script>

<style scoped>
.img {
  height: 50px;
  width: 50px;
}
</style>