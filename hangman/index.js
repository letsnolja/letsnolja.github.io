let app = new Vue({
  el: '#app',
  data: {
    text : '',
    word : [],
    badLetters : [],
    lifes : 0,
    started : false,
    mask : 'a'
  },
  methods : {
    getLetter : function () {
      console.log(1)
      if (this.text.length == 0) return
      this.text = this.text[this.text.length - 1]
      let letter = this.text[0].toLowerCase()
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
          if (this.lifes == 1) {
            if (this.started) {
              alert('You lost !')
              this.generateWord()
              return
            } else {
              alert('You didnt start the game !')
              return
            }
          } else this.lifes--
        }
      }
      let finished = true
      for (let i in this.word) {
        if (word[i].found == false) finished = false
      }
      if (finished == true) {
        alert("You won !")
        this.generateWord()
      }
    },
    clear : function () {
      this.text = ''
      document.getElementById('tf').value = ''
    },
    generateWord : function () {
      let item = items[Math.floor(Math.random()*items.length)];
      word = []
      for (let i in item) {
        word[i] = {found : false, letter : item[i], index : i}
      }
      this.word = word
      this.badLetters = []
      this.lifes = (Object.size(this.word)).toFixed()
      this.started = true
      console.log(item)
    }
  }
})

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
