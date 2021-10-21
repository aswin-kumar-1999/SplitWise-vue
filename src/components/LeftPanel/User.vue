<template>
  <div className="users-groups" onClick="{this.clickHandeler}">
    <i className="fa fa-user"></i>
    {{uname}}
  </div>
</template>

<script>
export default {
  name: "User",
  methods: {},
  props: ["uname", "display"],
};
</script>

<style scoped>
</style>