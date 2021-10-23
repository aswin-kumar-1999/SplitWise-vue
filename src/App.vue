<template>
  <div class="d-flex align-items-center justify-content-center flex-column">
    <Header />
    <div class="d-flex col-md-8 panel">
      <div class="mobile">
        <div
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
          v-bind:style="{ width: '200px' }"
        >
          <div class="offcanvas-header">
            <button
              type="button"
              class="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <LeftPanel />
          </div>
        </div>
      </div>
      <div class="left">
        <div className="lapview">
          <LeftPanel />
        </div>
      </div>
      <div class="center shadow bg-body rounded containers">
        <router-view />
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>







<script>
import Header from "./components/Header/Header.vue";
import LeftPanel from "./components/LeftPanel/LeftPanel";
export default {
  name: "App",
  data() {
    return {
      userCount: 0,
    };
  },
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
.left,
.right {
  width: 200px;
}
.center {
  width: 800px;
}
.route {
  color: #07e2b3;
  width: 180px;
  padding: 10px;
  text-decoration: none;
}
.head {
  background: rgba(236, 236, 236, 0.836);
  color: grey;
}
.img {
  width: 50px;
  height: 50px;
}
.groupBlock {
  height: 80px;
  border-bottom: 1px solid rgb(175, 173, 173);
  color: grey;
}
.mobile {
  display: none;
}
.lapview {
  display: block;
}
.mb {
  width: 200px;
}

@media screen and (max-width: 1000px) {
  .containers {
    width: 100vw;
    margin: 0;
    padding: 0;
  }
  .centerPanel {
    min-width: 350px;
  }
  .mobile {
    display: block;
  }
  .lapview {
    display: none;
  }
  .right,
  .left {
    display: none;
  }
}
</style>
