<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">{{nav1}}</router-link>
                    </li>
                    <li class="nav-item" v-if="loggedIn">
                        <router-link class="nav-link" to="/liftlogger">{{nav3}}</router-link>
                    </li>
                    <li class="nav-item" v-if="loggedIn">
                        <router-link class="nav-link" to="/liftlog">{{nav4}}</router-link>
                    </li>
                    <li class="nav-item" v-if="loggedIn">
                        <router-link class="nav-link" to="/reset">{{nav5}}</router-link>
                    </li>
                    <li class="nav-item" v-if="loggedIn">
                        <router-link class="nav-link" to="/suggestion">{{nav6}}</router-link>
                    </li>
                    <li class="nav-item" v-if="loggedIn"><a class="btn btn-success" @click="logout" href="#">Logout</a></li>
                    <li class="nav-link" v-if="loggedIn">{{user.username}}</li>
                    <form v-else v-on:submit.prevent="login">
                        <input v-model="email" placeholder="Email Address">
                        <input v-model="password" placeholder="Password">
                        <button class="btn" type="submit">Login</button>
                    </form>
                </ul>
            </div>
        </nav>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      app_name: "PLift",
      nav1: "Home",
      nav3: "Log Lifts",
      nav4: "View Lift Logs",
      nav5: "Clear Logs",
      nav6: "Suggestions",
      email: '',
      password: '',
    };
  },
     computed: {
     user: function() {
       return this.$store.getters.user;
     },
     loggedIn: function() {
       return this.$store.getters.loggedIn;
     },
     loginError: function() {
       return this.$store.getters.loginError;
     },
   },
   methods: {
     login: function() {
       this.$store.dispatch('login',{
         email: this.email,
         password: this.password,
       }).then(user => {
	 this.email = '';
	 this.password = '';
       });
     },
     logout: function() {
       this.$store.dispatch('logout');
     }
   }
};
</script>