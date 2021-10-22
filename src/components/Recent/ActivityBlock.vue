<template>
  <div
    className="activityBlock d-flex justify-content-start align-items-center px-3"
  >
    <img
      src="https://s3.amazonaws.com/splitwise/uploads/notifications/v2021/0-18.png"
      alt="%"
      class="img"
    />
    <div className="text-center px-3 col-12">
      <div v-if="type === 'credit'">
        <div>
          you paid for {{ desc }}
          <span className="credit text-wrap">
            {{ lentTo }} lent {{ amount.toFixed(2) }} from you
          </span>
        </div>
        <div>{{ date }}</div>
      </div>

      <div v-if="type === 'debt'">
        <div>
          {{ lentTo }} paid for {{ desc }}
          <span className="debt">you owe {{ amount.toFixed(2) }} from you</span>
        </div>
        <div>{{ date }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActivityBlock",
  props: ["date", "lentTo", "desc", "amount", "type"],
};
</script>

<style  scoped>
.img {
  width: 50px;
  height: 50px;
}
.activityBlock {
  width: 100%;
  height: 80px;
  border-bottom: 1px solid rgb(175, 173, 173);
}
/* .text-center{
    width: 100%;
} */
</style>