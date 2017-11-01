

var questionFieldVue = new Vue({
  el: '#questionField',
  data: {
    questions: getQuestions(),
    ingame : false,
    score : 0
  },
  methods: {
    ctrlBtnHandler : function () {
      let el = document.getElementById('controlBtn');
      if (!this.ingame) {
        this.startQuiz()
        el.firstChild.data = "Stop";
      } else {
        this.stopQuiz()
        el.firstChild.data = "Start";
      }
    },
    startQuiz : function () {
      console.log('[*] Started Quiz')
      this.score = 0
      this.ingame = true
      this.changeQuestion()
    },
    stopQuiz : function () {
      console.log('[*] Stopped Quiz')
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
      questionIndex = Math.floor(Math.random()*this.questions.length)
      let q = this.questions[questionIndex]
      this.questions.splice(questionIndex, 1)
      document.getElementById('textField').innerHTML = q.text
      // Dynamically generate buttons
      let bF = document.getElementById('btnField')
      this.cleanBtnField()
      for (i in q.possibilities) {
        let btn = document.createElement("BUTTON");
        let txt = document.createTextNode(q.possibilities[i]);
        btn.appendChild(txt);
        // Set up onclick with custom generated functions (currying)
        btn.id = 'choice_'+i
        btn.className = 'class="btn btn--raised'
        btn.style.position = 'relative'
        btn.onclick = this.answeredWrapper(q,this)
        console.log(btn)
        bF.appendChild(btn);
        bF.appendChild(document.createElement("BR"))
      }
    },
    finishedQuiz : function () {
      this.cleanBtnField()
      let tF = document.getElementById('textField')
      tF.innerHTML = 'Congrats you got <b>'+this.score+'</b>'
    },
    answeredWrapper : function (q, vueInstance) {
      answered = function () {
        if (this.textContent == q.answer) {
          console.log(this.textContent+' is right !')
          vueInstance.score ++
          vueInstance.changeQuestion()

        } else {
          console.log(this.textContent+' is wrong !')
          this.style.visibility = 'hidden';
          vueInstance.score --
        }
        console.log(vueInstance.score)
      }
      return answered
    }
  }
})
