<template>
  <div className="leftPanel d-flex flex-column me-2">
    <router-link :to="{ name: 'DashBoard' }" class="route">
      <div>
        <i className="fa fa-braille p-1"></i>
        Dashboard
      </div>
    </router-link>
    <router-link :to="{ name: 'Recent' }" class="route">
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
        @keyup="searchHandler"
      />
    </div>
    <router-link :to="{ name: 'AllExpense' }" class="route">
      <div onClick="{this.displayRight}">
        <i className="fa fa-list-ul pe-1"></i>
        All expensives
      </div>
    </router-link>
    <div className="left-links group-user-tag p-2">Groups</div>

    <div v-for="(gname, index) in group" :key="index" class="d-flex">
      <Group :display="groupDisplay[index]" :uname="gname" portal="group" />
    </div>

    <div className="left-links group-user-tag p-2">Friends</div>

    <div v-for="(uname, index) in users" :key="index" class="d-flex">
      <Users :display="usersDisplay[index]" :uname="uname" portal="user" />
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
    searchHandler() {
      let newGroupDisplay = this.groupDisplay.map((display, index) => {
        if (
          this.group[index].toLowerCase().includes(this.search.toLowerCase())
        ) {
          return "block";
        } else {
          return "none";
        }
      });
      let newUsersDisplay = this.usersDisplay.map((display, index) => {
        if (
          this.users[index].toLowerCase().includes(this.search.toLowerCase())
        ) {
          return "block";
        } else {
          return "none";
        }
      });
      if (
        JSON.stringify(newUsersDisplay) !== JSON.stringify(this.usersDisplay) ||
        JSON.stringify(newGroupDisplay) !== JSON.stringify(this.groupDisplay)
      ) {
        this.usersDisplay = newUsersDisplay;
        this.groupDisplay = newGroupDisplay;
      }
    },
    updateNewUser() {
      for (let key in this.$store.state.user) {
        if (!this.users.includes(key)) {
          this.users = [...this.users, key];
          this.usersDisplay = [...this.usersDisplay, "block"];
        }
      }
    },
  },
  created() {
    this.storeData();
  },
  updated() {
    this.updateNewUser();
  },
  components: { Users, Group },
};
</script>

<style scoped>
.input-group {
  width: 180px;
}
.group-user-tag {
  background-color: rgb(240, 239, 239);
}
</style>