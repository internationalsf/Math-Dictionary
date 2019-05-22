'use strict'

//const apiUrl = 'https://api.myjson.com/bins/1bfvwm'
//const apiUrl = "https://api.myjson.com/bins/15la2i"
 const apiUrl = "./data.json"
class MathDictionary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      words: [],
      search: "",
      obj: "",
      language: "french",
      view: "list"
    }


  }

  componentWillMount = ()  => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(result => this.setState({
        words: result
      }))
      .catch(error => error)
  }

  listView = () => {
    let wordsToShow = this.getWords().filter(
      (word) => {
        return word.indexOf(this.state.search) !== -1
      }
    )
    return <div>
            {this.showTitle()}
            {this.showLanguageButtons()}
            {this.showSearch()}
            {this.showListOfWords(wordsToShow)}
          </div>
  }

  getWords = () => {
    let words, yesWords

    yesWords = this.state.words.filter(item => item.verified !== null)

    if (this.state.language === 'french') {
      words = yesWords.map(item => item.frenchword.toLowerCase())
    } else if (this.state.language === 'english') {
      words = yesWords.map(item => item.englishword.toLowerCase())
    }

    words = words.sort(function (a, b) {
      return a.localeCompare(b);
    })

    return words;
  }

  showTitle = () => {
    if(this.state.language === 'english') {
      return <h1 className="titleArea">Math Dictionary</h1>
    } else if (this.state.language === 'french') {
      return <h1 className="titleArea">Dictionnaire de maths</h1>
    }
  }

  showLanguageButtons = () => {
    return <div className='buttonArea'>
      <button className='languageButton1' onClick={this.clickFrench}>Français</button>
      <button className='languageButton2' onClick={this.clickEnglish}>English</button>
    </div>

  }

  clickFrench = () => {
    this.setState(state => ({
      language: "french"
    }))
  }

  clickEnglish = () => {
    this.setState(state => ({
      language: "english"
    }))
  }

  showSearch = () => {
    let searchWord
    if (this.state.language === 'english') {
      searchWord = 'Search...'
    } else if (this.state.language === 'french') {
      searchWord = 'Chercher...'
    }
    return <div>
            <input id='searchBox' placeholder={searchWord} value={this.state.search} onChange={this.updateSearch}/>
          </div>
  }

  updateSearch = (event) => {
    this.setState({
      search: event.target.value
    })
  }

  showListOfWords = (wordsToShow) => {
    return <div id= 'wordBackground'>
      {wordsToShow.map((word, index) => <input type="button" className="wordButton" key={index} value={word} onClick={this.clickWord}></input>)}
    </div>
  }

  clickWord = (event) => {
    const word = event.target.value
    const data = this.state.words
    let object

    if(this.state.language === 'french') {
      for (let i = 0; i < data.length; i = i + 1) {
        if (this.state.words[i].frenchword.toLowerCase() == word) {
          object = data[i].objID
        }
      }
    }


    if(this.state.language === 'english') {
      for (let i = 0; i < data.length; i++) {
        if (this.state.words[i].englishword.toLowerCase() == word) {
          object = data[i].objID
        }
      }
    }

    this.setState(state => ({
      search: "",
      obj: object,
      view: "definition"
    }))
  }

  wordView = () => {
    return <div>
      {this.showTitle()}
      {this.showHomeButton()}
      {this.showWords()}
      {this.showImage()}
      {this.showDefinition()}

    </div>
  }

showDefinition = () => {
  let fDef, eDef
  const data = this.state.words
  console.log(data)
  for (let i = 0; i < data.length; i++){
    if (data[i].objID === this.state.obj) {
      fDef = data[i].frenchdefinition
      eDef = data[i].englishdefinition
    }
  }

if (this.state.language === "french") {
     return <div id="definitions">
       <div className="fDefinition">{fDef}</div>
       <div className="eDefinition">{eDef}</div>
     </div>
   } else if (this.state.language === "english") {
     return <div id="definitions">
       <div className="eDefinition">{eDef}</div>
       <div className="fDefinition">{fDef}</div>
     </div>
   }
 }
  showWords = () => {
      let fWord, eWord
      const data = this.state.words
      const lang = this.state.language
      for (let i = 0; i < data.length; i++) {
        if (data[i].objID === this.state.obj) {
          fWord = data[i].frenchword
          eWord = data[i].englishword
        }
      }
      if (lang === 'french') {
        return <h3 id='wordTitle'>{fWord + "/" + eWord}</h3>
      } else if (lang === 'english') {
        return <h3 id='wordTitle'>{eWord + "/" + fWord}</h3>
      }
    }



   showImage = () => {
        let img
        const data = this.state.words
        for (let i = 0; i < data.length; i++) {
          if (data[i].objID === this.state.obj) {
            img = "/assets/" + data[i].image //+ ".png"
          }
        }
        return <img id="wordImage" src={img}></img>
      }
  showButtons = () => {
    return <div id= "navArea">
      {this.showBackButton()}
      {this.showHomeButton()}
      {this.showNextButton()}
    </div>
  }
prevWord = () =>{
  const data = this.state.wordsToShow
  let prevWord = this.state.obj - 1
  if (prevWord < 1){
    prevWord = data.length
  }
  this.setState(state => ({
    obj: prevWord
  }))
}

goHome =() => {
  this.setState({
    view: "list"
  })
}


nextWord = () => {
  const data = this.sate.words
  let nextWord = this.state.obj + 1
  if (nextWord > data.lengh){
    nextWord = 1
  }
  this.setSate(state => ({
    obj: nextWord
  }))
}

  showBackButton = ()  => {
      return < button className = "navButton" onClick={this.preWord}> <img className = "backButton" src= "assets/elsaBack2.png"/> </button>
  }
  showHomeButton = () => {
      return < button className = "navButton" onClick={this.goHome}> <img className = "homeButton" src= "assets/elsaHome1.png"/> </button>
  }
  showNextButton = () => {
      return < button className = "navButton" onClick={this.nextWord}> <img className = "nextButton" src= "assets/elsaNext3.png"/> </button>
  }

  render() {
   if (this.state.view === 'list') {
     return this.listView() //show the list of words
   } else if (this.state.view === 'definition') {
     return this.wordView()
   }
 }
}



ReactDOM.render(
  <MathDictionary />,
  document.getElementById('dictionaryArea')
);
