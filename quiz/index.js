var questionFieldVue = new Vue({
  el: '#questionField',
  data: {
    qs: [],
    ingame : false
  },
  methods: {
    ctrlBtnHandler : function () {
      console.log('Started quiz !')
      let el = document.getElementById('controlBtn');
      if (el.firstChild.data == "Start") {
        this.startQ()
        el.firstChild.data = "Stop";
      } else {
        this.stopQ()
        el.firstChild.data = "Start";
      }
    },
    startQ : function () {
      console.log('Starting ...')
      this.ingame = true
      this.changeQ()
    },
    stopQ : function () {
      console.log('Stopping ...')
      this.ingame = false
    },
    changeQ : function () {
      let q = this.qs[Math.floor(Math.random()*this.qs.length)];
      console.log(q)
      document.getElementById('textField').innerHTML = q.text
      let bF = document.getElementById('btnField')
      for (i in q.possibilities) {
        let btn = document.createElement("BUTTON");        // Create a <button> element
        let txt = document.createTextNode(q.possibilities[i]);       // Create a text node
        btn.appendChild(txt);                       // Append the text to <button>
        btn.onclick = () => {
          console.log('Answered '+q.possibilities[i])
        }
        bF.appendChild(btn);
        console.log(btn)
      }
    },
  }
})
 questionFieldVue.qs = questions
