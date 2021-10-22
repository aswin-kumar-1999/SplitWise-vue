<template>
  <div class="border-bottom d-flex">
    <div v-if="paid_by" className="activityBlock d-flex align-items-center justify-content-center pt-1">
      <img
        src="https://s3.amazonaws.com/splitwise/uploads/notifications/v2021/0-18.png"
        alt="%"
        class="img mx-2"
      />
      <div className=" ">
        {{ paid_by }} paid {{ (+amount).toFixed(2) }} for {{ desc }} and need to
        be shared between {{ owesPerson }},
        {{ paid_by }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExpenseCard",
  props: ["paid_by", "amount", "desc", "owes"],
  computed:{
      owesPerson(){
          return this.owes.join(', ')
      }
  }
};
</script>

<style  scoped>
.border-bottom{
    height: 80px;
}
</style>