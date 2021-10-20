<template>
  <div class="d-flex align-items-center justify-content-center flex-column">
    <!-- <Header /> -->
    <div class="d-flex col-md-8 border border-primary">
      <div class="col-2 border border-success">
        <router-link to="/">Dashboard</router-link>
      </div>
      <div class="col-8 border border-primary">
        <router-view />
      </div>
      <div class="col-2 border border-success">dsfghbkl;''</div>
    </div>
  </div>
</template>







<script>
// import LeftPanel from './components/LeftPanel/LeftPanel'
export default {
  components: {},
};
</script>






<style>
#nav a.router-link-exact-active {
  color: #42b983;
}
.debt {
    color: #ff4000
}
.credit{
    color: #07e2b3;
}
</style>
