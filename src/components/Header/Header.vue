<template>
  <nav className="navbar navbar-expand-lg navbar-light bg-light col-12 p-0">
    <div className="container-fluid col-12">
      <div className="d-flex justify-content-between align-items-center ">
        <a className="navbar-brand px-1" href="#"> Splitwise </a>
        <!-- <div className="mobile">
            <button
              class="btn btn-primary"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <i class="fas fa-align-justify"></i>
            </button>
          </div> -->
      </div>
      <div className="lapview bg-transparent">
        <select
          className="form-select-md bg-transparent me-5 drop-down"
          aria-label="Default select example"
          @change="userHandler"
        >
          <option value="aswin" selected>Aswin</option>
          <option value="harsh">Harsh</option>
          <option value="pravin">Pravin</option>
        </select>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name:"Header",
  methods:{
    userHandler(event){
       const user = event.target.value;
       this.$store.commit("userId",user)
    }
  }
};
</script>

<style scoped>
.container-fluid,
.btn {
  background-color: #07e2b3;
}
.drop-down {
  border: none;
  appearance: none;
  color: white;
  cursor: pointer;
}

</style>