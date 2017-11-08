var app = new Vue({
  el: '#app',
  data: {
    text : '',
    re : /[a-z]/,
    word : '',
    currentW : ''
  },
  methods : {
    getLetter : function () {
      let letter = this.text[0]
      this.text = ''
      let m = letter.match(this.re)
      if (m == null) {
        console.log('Not a letter')
        return
      }
      while (this.word.indexOf(letter) >= 0 ) {
        let index = this.word.indexOf(letter)
        console.log(index)
        this.currentW[index] = this.word[index]
        this.word[index] = ''
      }
      console.log(letter)
    },
    generateWord : function () {
      text = 'aabccd'
      this.word = text
      for (i in this.word){
        this.currentW += '_'
      }
    }
  }
})
