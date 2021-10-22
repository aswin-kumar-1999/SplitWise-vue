<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light col-12 p-0">
    <div class="container-fluid col-12 ">
      <div class="d-flex justify-content-between align-items-center " v-bind:style="{width:'100%'}">
        <a class="navbar-brand px-1" href="#"> Splitwise </a>
        <div class="mobile" >
            <button
              class="btn btn-primary"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <i class="fas fa-align-justify"></i>
            </button>
          </div>
      </div>
      <div class="lapview bg-transparent">
        <select
          class="form-select-md bg-transparent me-5 drop-down"
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
.headers{
  width: 100%;
  display: flex;
  justify-self: flex-end;
}
</style>