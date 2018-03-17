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
                    <li class="nav-item">
                        <router-link class="nav-link" to="/liftlogger">{{nav3}}</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/liftlog">{{nav4}}</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/reset">{{nav5}}</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/suggestion">{{nav6}}</router-link>
                    </li>
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
      nav6: "Suggestions"
    };
  }
};
</script>