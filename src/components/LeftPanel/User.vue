<template>
  <router-link :to="url" class="customRoute">
    <span
      :class="
        display == 'block'
          ? 'p-1 my-2 d-flex float-left'
          : 'p-1 my-2 d-flex float-left d-none'
      "
    >
      <i className="fa fa-user p-1 me-1"></i>
      {{ uname }}
    </span>
  </router-link>
</template>

<script>
export default {
  name: "User",
  methods: {},
  props: ["uname", "display", "portal"],
  computed: {
    url() {
      return `/${this.portal}/${this.uname}`;
    },
  },
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