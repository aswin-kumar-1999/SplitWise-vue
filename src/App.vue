<template>
  <div class="d-flex align-items-center justify-content-center flex-column">
    <Header />
    <div class="d-flex col-md-8 panel">
      <div class="left">
        <!-- <router-link to="/">Dashboard</router-link> -->    
          <LeftPanel />
      </div>
      <div class="center shadow bg-body rounded">
        <router-view />
      </div>
      <div class="right">dsfghbkl;''</div>
    </div>
  </div>
</template>







<script>
import Header from "./components/Header/Header.vue";
import LeftPanel from "./components/LeftPanel/LeftPanel";
export default {
  components: { Header, LeftPanel },
};
</script>






<style>
.router-link-active {
  background: rgba(236, 236, 236, 0.836);
  border-left: 8px solid #07e2b3;
  width: 180px;
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
.panel {
  min-height: 100vh;
}
.left, .right{
  width: 200px;
}
.center{
  width: 800px;
}
</style>
