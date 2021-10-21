<template>
  <div className="leftPanel d-flex flex-column">
    <router-link to="dashboard" class="route">
      <div>
        <i className="fa fa-braille p-1"></i>
        Dashboard
      </div>
    </router-link>
    <router-link to="activity" class="route">
      <div>
        <i className="fa fa-flag p-1"></i>
        Recent Activity
      </div>
    </router-link>
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">
        <i className="fa fa-search"></i>
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="Search here"
        aria-describedby="basic-addon1"
        v-model="search"
      />
    </div>
    <router-link to="expense" class="route">
      <div onClick="{this.displayRight}">
        <i className="fa fa-list-ul pe-1"></i>
        All expensives
      </div>
    </router-link>
    <div className="left-links group-user-tag">Groups</div>

    <div v-for="(gname, index) in group" :key="index" class="p-2 my-1">
      <Group
        :display="groupDisplay[index]"
        :uname="gname"
        parentCallback="{this.getChildData}"
      />
    </div>

    <div className="left-links group-user-tag">Friends</div>

    <div v-for="(uname, index) in users" :key="index" class="p-2 my-1">
      <Users
        :display="usersDisplay[index]"
        :uname="uname"
        parentCallback="this.getChildData"
      />
    </div>
  </div>
</template>

<script>
import Users from "./User.vue";
import Group from "./User.vue";

export default {
  name: "LeftPanel",
  data() {
    return {
      group: [],
      groupDisplay: [],
      users: [],
      usersDisplay: [],
      search: "",
      counter: 0,
    };
  },
  methods: {
    storeData() {
      for (let key in this.$store.state.group) {
        this.group = [...this.group, key];
        this.groupDisplay = [...this.groupDisplay, "block"];
      }
      for (let key in this.$store.state.user) {
        this.users = [...this.users, key];
        this.usersDisplay = [...this.usersDisplay, "block"];
      }
    },
  },
  created() {
    this.storeData();
  },
  components: { Users, Group },
};
</script>

<style scoped>
.route {
  color: #07e2b3;
  width: 180px;
  padding: 10px;
  text-decoration: none;
}
.input-group {
  width: 180px;
}
.group-user-tag {
  background-color: rgb(240, 239, 239);
}
</style>