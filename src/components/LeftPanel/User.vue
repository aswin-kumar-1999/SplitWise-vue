<template>
  <router-link :to="uname" class="customRoute">
    <div
      class="p-2 my-2 users-groups"
      v-bind:style="{ display: display }"
    >
      <i className="fa fa-user"></i>
      {{ uname }}
    </div>
  </router-link>
</template>

<script>
export default {
  name: "User",
  methods: {},
  props: ["uname", "display"],
};
</script>

<style scoped>
.customRoute {
  color: rgb(148, 147, 147);
  text-decoration: none;
}
.users-groups {
  font-size: 80%;
  padding: 10px;
  width: 180px;
  color: grey;
}

.users-groups:hover {
  background-color: rgb(233, 231, 231);
}
</style>