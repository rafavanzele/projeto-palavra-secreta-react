//CSS
import './App.css'

//REACT
import { useCallback, useEffect, useState } from 'react'

//DATA
import { wordList } from './data/words'

//COMPONENTS
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'



const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'},
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordList)

  
  //Declarando variáveis para o Start Game
  const [pickedWord, setPickedword] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')
  const [letters, setLetters] = useState([])

// variáveis para começar o jogo
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(4)
  const [score, setScore] = useState(0)

  
  const pickWordAndCategory = () => {
    //escolha a category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    console.log(category)


    //escolha a word
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    console.log(word)
    return {word, category}
  }

  
  //Começano o Palavra Secreta
  const startGame = () => {
    //função para pick word e pick category
     const {word, category} = pickWordAndCategory()

     //criando array de letras
      let wordLetters = word.split('')

      wordLetters = wordLetters.map((l) => l.toLowerCase())

     console.log(word, category)
     console.log(wordLetters)

     // fill states
     setPickedCategory(category)
     setPickedword(word)
     setLetters(wordLetters)

    
    
    setGameStage(stages[1].name)
  }


  //Processando a Letra no input
  const verifyLetter = () => {
    setGameStage(stages[2].name)
  }


  //Retry jogo
  const retry = () => {
    setGameStage(stages[0].name)
  }
  
  
  return (
    <div>
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      
      {gameStage === 'game' && <Game verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score}/>}
      
      {gameStage === 'end' && <GameOver retry={retry}/>}
    </div>
  )
}

export default App
