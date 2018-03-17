<template>
  <div class="container">
      <h1>Reset Logs</h1>
      <form v-on:submit.prevent="resetLogs">
        <button type="submit" class="btn btn-danger">Reset Logs</button>
        <label style="padding-left: 10px">{{reset_message}}</label>
      </form>
  </div>
</template>

<script>
 import axios from 'axios';
export default {
  name: "ClearLogs",
  data() {
    return {
      reset_message: ""
    };
  },
  methods: {
    resetLogs: function() {
      axios.delete("/api/liftlog").then(response => {
	     this.reset_message = "Reset successful."
	     return true;
       }).catch(err => {
         "Reset failed."
       });
    }
  }
}
</script>

