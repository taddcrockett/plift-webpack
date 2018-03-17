<template>
  <div class="container">
        <h1>View Lift Logs</h1>
        <br/>
        <form v-on:submit.prevent="viewLiftLog">
            <div class="form-group">
                <label for="lift-dropdown">Select a lift:</label>
                <select class="form-control" id="lift-dropdown" v-model="selectedLift">
                    <option v-for="lift in liftOptions" v-bind:key="lift">{{lift}}</option>
                </select>
            </div>
            <button class="btn btn-primary" type="submit">View Log</button>
            <label style="padding-left: 10px">{{ update_message }}</label>
        </form>
        <ul>
            <li v-for="lift in lifts" v-bind:key="lift.id">
                <form v-on:submit.prevent="updateLog(lift.id, lift.weight, lift.reps)">
                    <label> Id: {{ lift.id }}</label>
                    <label> Weight: </label>
                    <input v-model="lift.weight" type="number">
                    <label> Reps: </label>
                    <input v-model="lift.reps" type="number">
                    <label> Date: {{new Date(lift.date)}} </label>
                    <button type="submit" class="btn btn-success">Update</button>
                </form>
            </li>
        </ul>
    </div>
</template>

<script>
 import axios from 'axios';
export default {
  name: "ViewLiftLog",
  data() {
      return {
          selectedLift: 'Bench',
          liftOptions: ['Bench', 'Squat', 'Deadlift'],
          lifts: [],
          update_message: ""
      };
  },
    methods: {
      viewLiftLog: function() {
        axios.get("/api/liftlog/" + this.selectedLift).then(response => {
        this.lifts = response.data;
        return true;
      }).catch(err => {
      });
      },
      updateLog: function(id, weight, reps) {
        axios.put("/api/liftlog/" + this.selectedLift + "/" + id, {
            weight: weight,
            reps: reps
        }).then(response => {
            this.lifts = response.data;
            this.update_message = "Update for " + id + " succeeded."; 
            return true;
      }).catch(err => {
          this.update_message = "Update for " + id + " failed.";
      });
      }, 
  }
}
</script>

<style>
li {
    margin: 0 0 10px 0;
}
</style>


