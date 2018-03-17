<template>
  <div class="container">
        <h1>Send a suggestion</h1>
        <form action="https://formspree.io/taddcrockett@gmail.com" method="POST">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter name">
              <small id="nameHelp" class="form-text text-muted">Enter your name so I can know who made the suggestion</small>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" class="form-control" id="email" placeholder="Email">
            </div>
            <div class="form-group">
                <label for="suggestion">Suggestion</label>
                <textarea type="email" class="form-control" id="suggestion" placeholder="Enter your suggestion"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
    </div>
</template>

<<script>
    export default {
        name: 'Suggestion',
    }
</script>
