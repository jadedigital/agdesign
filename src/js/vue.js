var app = new Vue({
  el: '#portfolio',
  data: data,
  methods: {
    compiledMarkdown: function (value) {
      value = value.toString()
      return marked(value, { sanitize: true })
    }
  }
})