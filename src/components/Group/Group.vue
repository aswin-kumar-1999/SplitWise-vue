<template>
  <div>
    <div class="head  py-1 d-flex align-items-center">
      <img
        src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-ruby36-100px.png"
        alt="#"
        className="rounded-circle img mx-2"
      />
      <h3 class="ms-3">{{ groupName }}</h3>
    </div>

    <div v-if="paidBy.length === 0">
      <img
        src="https://assets.splitwise.com/assets/fat_rabbit/app/checkmark-circle-ae319506ad7196dc77eede0aed720a682363d68160a6309f6ebe9ce1983e45f0.png"
      />
      <h2>All settled</h2>
    </div>

    <div v-if="paidBy.length !== 0">
      <div v-for="(person, index) in paidBy" :key="index">
        <GroupBlock
          :paidBy="person"
          :amount="amount[index]"
          :desc="desc[index]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GroupBlock from "./GroupBloack.vue";
export default {
  name: "Group",
  data() {
    return {
      groupName: this.$route.params.id,
      gname: "",
      paidBy: [],
      amount: [],
      desc: [],
      temp: 0,
      status: true,
    };
  },
  props: [],
  components: { GroupBlock },
  created() {
    this.updateData();
  },
  methods: {
    updateData() {
      if (this.$store.state.group[this.groupName]) {
        if (this.groupName !== this.gname && this.status) {
          this.gname = "";
          this.paidBy = [];
          this.amount = [];
          this.desc = [];
          this.temp = 0;
          this.status = false;

          for (
            let index = 1;
            index <= this.$store.state.transaction["last"] + 1;
            index++
          ) {
            if (
              this.$store.state.group[this.groupName].transaction.includes(
                index
              ) &&
              index !== this.temp
            ) {
              if (this.$store.state.transaction[index]) {
                this.paidBy = [
                  ...this.paidBy,
                  this.$store.state.transaction[`${index}`].paid_by,
                ];
                this.amount = [
                  ...this.amount,
                  this.$store.state.transaction[`${index}`].amount,
                ];
                this.desc = [
                  ...this.desc,
                  this.$store.state.transaction[`${index}`].desc,
                ];
                this.temp = index;
                this.gname = this.groupName;
                this.status = true;
              } else {
                this.status = false;
              }
            }
          }
        }
      }
    },
  },
  updated() {
    if (this.groupName !== this.$route.params.id) {
      this.groupName = this.$route.params.id;
      this.updateData();
    }
  },
};
</script>

<style lang="scss" scoped>
</style>