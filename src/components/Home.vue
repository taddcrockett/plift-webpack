<template>
  <div class="container">
            <div class="jumbotron">
                <h1 class="display-4">{{welcome}}</h1>
                <p class="lead">{{message1}}</p>
                <hr class="my-4">
                <p>{{message2}}/p>
                <p class="lead">
                    <a @click="getQuote" class="btn btn-primary btn-lg" role="button">{{quote_message}}</a>
                </p>
                <blockquote v-html="quote"></blockquote>
                <p>{{ quote_title }}</p>
            </div>
        </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
        quote_title: '',
        quote: '',
        welcome: 'Welcome!',
        message1: 'This is Tadd\'s creative project.',
        message2: 'This is the makings of a fitness app. Enjoy an inspirational quote.',
        quote_message: 'Get new quote'    
    }
  },
    methods: {
        getQuote: function () {
            console.log("Getting quote")
            var self = this;
            $.ajax({
                url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
                success: function (data) {
                    var post = data.shift();
                    self.quote_title = post.title;
                    self.quote = post.content;
                },
                cache: false
            });
        }
    }
}
</script>
