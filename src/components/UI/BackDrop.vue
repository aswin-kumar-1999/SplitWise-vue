<template>
  <div class="backDrop">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.backDrop {
  background-color: rgba(128, 128, 128, 0.692);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  min-height: 100vh;
}
</style>