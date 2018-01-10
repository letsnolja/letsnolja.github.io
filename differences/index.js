var app = new Vue({
  el: '#app',
  data: {
    dialog : false,
    dialog2 : false,
    dialog3 : false,
    dialog4 : false,
    dialog5 : false,
    dialog6 : false,
    showMenu : false,
    x : 0,
    y : 0
  },
  methods: {
      show (e) {
        e.preventDefault()
        this.showMenu = false
        this.x = e.clientX
        this.y = e.clientY
        this.$nextTick(() => {
          this.showMenu = true
        })
      }
    }
})
