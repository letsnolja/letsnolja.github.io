

var app = new Vue({
  el: '#app',
  data: {
    questions: getQuestions(),
    ingame : false,
    score : 0
  },
  methods: {
    ctrlBtnHandler : function () {
      if (!this.ingame) {
        this.startQuiz()
      } else {
        this.stopQuiz()
      }
    },
    startQuiz : function () {
      console.log('[*] Started Quiz')
      let ctrlBtn = document.getElementById('controlBtn');
      ctrlBtn.firstChild.firstChild.data = "Stop";
      this.score = 0
      this.ingame = true
      this.questions = getQuestions()
      this.changeQuestion()
    },
    stopQuiz : function () {
      console.log('[*] Stopped Quiz')
      let ctrlBtn = document.getElementById('controlBtn');
      ctrlBtn.firstChild.firstChild.data = "Start";
      this.cleanTextField()
      this.cleanBtnField()
      this.questions = getQuestions()
      this.score = 0
      this.ingame = false
    },
    cleanTextField : function () {
      let tF = document.getElementById('textField')
      while (tF.firstChild) {
        tF.removeChild(tF.firstChild);
      }
    },
    cleanBtnField : function () {
      let bF = document.getElementById('btnField')
      while (bF.firstChild) {
        bF.removeChild(bF.firstChild);
      }
    },
    changeQuestion : function () {
      if (this.questions.length == 0) {
        this.finishedQuiz()
        return
      }
      let questionIndex = Math.floor(Math.random()*this.questions.length)
      let q = this.questions[questionIndex]
      this.questions.splice(questionIndex, 1)
      document.getElementById('textField').innerHTML = q.text
      // Dynamically generate buttons
      let bF = document.getElementById('btnField')
      this.cleanBtnField()
      let poss = q.possibilities
      while (poss.length > 0) {
        let i = Math.floor(Math.random()*poss.length)
        let p = poss[i]
        poss.splice(i, 1)

        let btn = this.templateBtn.cloneNode(true)
        btn.firstChild.firstChild.data = p
        btn.style.visibility = 'visible'
        btn.onclick = this.answeredWrapper(q,this)
        btn.className = 'btn btn--raised primary theme--dark deep-purple lighten-2'
        console.log(btn)

        bF.appendChild(btn);
      }
    },
    finishedQuiz : function () {
      this.cleanBtnField()
      let tF = document.getElementById('textField')
      tF.innerHTML = 'Congrats you got <b>'+this.score+'</b>'
      let ctrlBtn = document.getElementById('controlBtn');
      ctrlBtn.firstChild.firstChild.data = "Restart";
      this.ingame = false
    },
    answeredWrapper : function (q, vueInstance) {
      answered = function () {
        let text = this.firstChild.firstChild.data
        if (text == q.answer) {
          console.log(text+' is right !')
          vueInstance.score += 2
          vueInstance.changeQuestion()
        } else {
          console.log(text+' is wrong ! Right answer : '+q.answer)
          this.className = 'btn btn--disabled btn--raised primary'
          vueInstance.score --
        }
        console.log(vueInstance.score)
      }
      return answered
    }
  }
})
let templateBtn =  document.getElementById('templateBtn')
app.templateBtn = templateBtn
document.getElementById('btnField').removeChild(templateBtn)
