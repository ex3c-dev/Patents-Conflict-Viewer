<template>
  <div class="card text-center m-3">
    <h5 class="card-header">Test GET Request</h5>
    <div class="card-body">Response: {{testRequest}}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "TestComponent",

  data() {
    return {
      testRequest: null
    };
  },
  async created() {
    await axios.get("http://84.252.122.16:3000/tls209?appln_id=eq.45732519")
    .then(response => this.testRequest = response.data[0].id)
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
  }
};
</script>

<style scoped>

</style>