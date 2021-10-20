<template>
  <div>
    <div
      className="d-flex flex-wrap align-items-center justify-content-center px-4 py-3"
    >
      <img
        src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-ruby36-100px.png"
        alt="Avatar"
        class="rounded-circle avatar"
      />

      <div class="px-3 my-1">
        {{ name }}
        <div class="debt">you owe INR {{ amount }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Debt",
  props: ["name", "amount"],
};
</script>

<style scoped>
.avatar {
  width: 50px;
  height: 50px;
}
</style>