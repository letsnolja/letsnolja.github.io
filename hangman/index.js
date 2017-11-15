var app = new Vue({
  el: '#app',
  data: {
    text : '',
    re : /[a-zA-Z]/,
    word : '',
    badLetters : [],
    lifes : 0
  },
  methods : {
    formatWord : function () {
      let out = ''
      for (let i in this.word) {
        out += (this.word[i].found) ? this.word[i].letter : '_'
        out += '  '
      }
      return out
    },
    getLetter : function () {
      let letter = this.text[0].toLowerCase()
      this.text = ''
      let m = letter.match(this.re)
      if (m == null) {
        console.log('Not a letter')
        return
      }
      let found = false
      for (let i in this.word){
          if(this.word[i].letter == letter) {
            this.word[i].found = true
            found = true
          }
      }
      if (!found) {
        if (!this.badLetters.includes(letter)) {
          this.badLetters.push(letter)
          if (this.lifes == 0) {
            alert('You lost !')
            this.generateWord()
          } else this.lifes--
        }
      }
    },
    generateWord : function () {
      let item = items[Math.floor(Math.random()*items.length)];
      word = {}
      for (let i in item) {
        word[i] = {found : false, letter : item[i]}
      }
      this.word = word
      this.badLetters = []
      this.lifes = 5
      console.log(item)
    },
    badLetter : function () {
      return this.badLetters.join(' - ')
    }
  }
})
