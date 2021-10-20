<template>
  <div>
    <div>
      <div>
        <div class="p-3 head">
          <div
            class="
              d-flex
              flex-wrap
              justify-content-between
              align-items-center
              mb-2
            "
          >
            <h3>Dashboard</h3>
            <div class="d-flex justify-content-between">
              <button type="button" class="btn btn-expense">
                Add an expense
              </button>
              <button type="button" class="btn btn-settle">Settle up</button>
            </div>
          </div>
          <div class="border-top border-bottom border-2">
            <div className="row py-1 fs-6 ">
              <div className="col-sm-4 border-end text-center ">
                total balance<br />
                0
              </div>
              <div className="col-sm-4 border-end text-center">
                <div>
                  you owe
                  <span className="debt">
                    <br />
                    ₹ 0
                  </span>
                </div>
              </div>
              <div className="col-sm-4 text-center">
                <div>
                  you are owed
                  <span className="credit">
                    <br />
                    ₹ 0
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="owe d-flex justify-content-between mx-4 my-2">
          <span>YOU OWE</span>
          <span>YOU ARE OWED</span>
        </div>
      </div>
      <div className="d-flex ">
        <span className="border-end border-1 col-6">
          <Debt  name="aswin" amount="200" />
        </span>
        <span className="border-start border-1 col-6 ">
          <Credit
            name="aswin"
            amount="2000"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Credit from './Credit.vue'
import Debt from './Debit.vue'
export default {
    name:'DashBoard',
  components: {Debt,Credit},
};
</script>


<style scoped>
.btn-expense {
  cursor: pointer;
  background-color: #ff4000;
  font-size: 14px;
  color: #fff3ef;
  border: none;
  border-radius: 5px;
  padding: 8px;
  margin-right: 20px;
}

.btn-settle {
  cursor: pointer;
  background-color: #07e2b3;
  font-size: 14px;
  color: #e2fdf7;
  border: none;
  border-radius: 5px;
  padding: 8px;
}
.head {
  background: rgba(236, 236, 236, 0.836);
}
.owe {
  color: grey;
  font-weight: 600;
}
</style>