<template>
  <div className="activity">
    <div class="head p-3">
      <h3>Recent Activity</h3>
    </div>
    <div v-for="credits in $store.state.credit" :key="credits">
      <ActivityBlock
        date="Oct 22, 2021"
        :lentTo="credits[0]"
        :desc="credits[2]"
        :amount="credits[1]"
        type="credit"
      />
    </div>

    <div
      v-if="$store.state.credit.length === 0"
      class="d-flex justify-content-center align-items-center my-5 flex-column"
    >
      <img
        src="https://assets.splitwise.com/assets/fat_rabbit/app/checkmark-circle-ae319506ad7196dc77eede0aed720a682363d68160a6309f6ebe9ce1983e45f0.png"
      />
      <h2>All settled</h2>
    </div>
    <div v-for="credits in $store.state.debt" :key="credits">
      <ActivityBlock
        date="Oct 22, 2021"
        :lentTo="credits[0]"
        :desc="credits[2]"
        :amount="credits[1]"
        type="debt"
      />
    </div>
  </div>
</template>

<script>
import ActivityBlock from "./ActivityBlock.vue";
export default {
  name: "Recent",
  components: { ActivityBlock },
};
</script>

<style lang="scss" scoped>
</style>