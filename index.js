var app = new Vue({
  el: '#app',
  data: {
    dialog : false
  },
  methods : {
    switchStyle : function (theme){
      let app = document.getElementById('app')
      app.className = 'application theme--' + theme
      app.setAttribute('data-app','')
      console.log(app)
      this.dialog = false
    }
  }
})
