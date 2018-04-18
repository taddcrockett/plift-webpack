<template>
  <div class="container">
    <h1>Register</h1>
    <h2>So you can see your lifts</h2>
    <form v-on:submit.prevent="register">
      <div class="form-group">
      <p>1. Choose a user name</p>
      <input class="form-control" v-model="username" placeholder="User Name">
      <p>2. Create an account.</p>
      <input class="form-control" v-model="name" placeholder="First and Last Name"><br/>
      <input class="form-control" v-model="email" placeholder="Email Address">
      <input class="form-control" type="password" v-model="password" placeholder="Password">
      <br/>
      <button class="btn btn-primary" type="submit">Register</button>
      </div>
    </form>
    <p class="error">{{registerError}}</p>
  </div>
</template>

<script>
 export default {
   name: 'WelcomePage',
   data () {
     return {
       username: '',
       email: '',
       password: '',
       name: '',
     }
   },
   computed: {
     registerError: function() {
       return this.$store.getters.registerError;
     },
   },
   methods: {
     register: function() {
       this.$store.dispatch('register',{
	     username: this.username,
         email: this.email,
         password: this.password,
	     name: this.name,
       });
     }
   }
 }
</script>
