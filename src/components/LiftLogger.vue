<template>
    <div class="container">
        <h1>Lift Logger</h1>
        <br/>
        <form v-on:submit.prevent="logLift">
            <div class="form-group">
                <label for="lift-dropdown">Select a lift:</label>
                <select class="form-control" id="lift-dropdown" v-model="selectedLift">
                    <option v-for="lift in liftOptions" v-bind:key="lift">{{lift}}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="weight">Enter the weight:</label>
                <input v-model="weight" type="number" class="form-control" id="weight"/>
            </div>
            <div class="form-group">
                <label for="reps">Enter the number of reps:</label>
                <input type="number" class="form-control" id="reps" v-model="reps"/>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" type="submit">Log</button>
                <label v-bind:class="response_class" style="padding-left: 10px">{{response_message}}</label>
            </div>
        </form>
    </div>
</template>

<script>
 import axios from 'axios';
export default {
  name: 'LiftLogger',
  data() {
      return {
          selectedLift: 'Bench',
          liftOptions: ['Bench', 'Squat', 'Deadlift'],
          weight: 0,
          reps: 0,
          response_message: "",
            response_class: {
                'text-danger': false
            }
      };

  },
  methods: {
      logLift: function() {
        this.$store.dispatch('addLift', {
        lift: this.selectedLift,
        weight: this.weight,
        reps: this.reps
      }).then(response => {
        this.weight = 0;
        this.reps = 0;
        this.response_message = "Logged successfully";
        this.response_class["text-danger"] = false;
        return true;
      }).catch(err => {
        this.response_message = "Log failed"
        this.response_class["text-danger"] = true;
      });
      }
  }
}
</script>

