<template>
  <div class="d-flex align-items-center justify-content-center flex-column">
    <Header />
    <div class="d-flex col-md-8 center-panel">
      <div class="col-2 ">
        <router-link to="/">Dashboard</router-link>
      </div>
      <div class="col-8 shadow bg-body rounded">
        <router-view />
      </div>
      <div class="col-2">dsfghbkl;''</div>
    </div>
  </div>
</template>







<script>
import Header from './components/Header/Header.vue'
// import LeftPanel from './components/LeftPanel/LeftPanel'
export default {
  components: {Header},
};
</script>






<style>
#nav a.router-link-exact-active {
  color: #42b983;
}
.debt {
  color: #ff4000;
}
.credit {
  color: #07e2b3;
}
.header {
  background: #07e2b3;
  color: white;
}
.card {
  z-index: 2;
  background: white;
  width: 350px;
  border-radius: 5px;
  margin-top: 10vh;
}
.center-panel {
  min-height: 100vh;
}
</style>
