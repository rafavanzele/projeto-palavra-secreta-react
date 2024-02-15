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

//variável pra quantidade de palpites
const guessesQtd = 3

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
  const [guesses, setGuesses] = useState(guessesQtd)
  const [score, setScore] = useState(0)

  

  
  const pickWordAndCategory = useCallback(() => {
    //escolha a category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    


    //escolha a word
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    
    return {word, category}
  }, [words])

  
  //Começano o Palavra Secreta
  const startGame = useCallback(() => {
    //limpar todas as letras
    clearLetterStates()

    //função para pick word e pick category
     const {word, category} = pickWordAndCategory()

     //criando array de letras
      let wordLetters = word.split('')

      wordLetters = wordLetters.map((l) => l.toLowerCase())

    

     // fill states
     setPickedCategory(category)
     setPickedword(word)
     setLetters(wordLetters)

    
    
    setGameStage(stages[1].name)
  }, [pickWordAndCategory])


  //Processando a Letra no input
  const verifyLetter = (letter) => {
    
    const normalizeLetter = letter.toLowerCase()

    //checando se a letra já foi utilizada
    if (guessedLetters.includes(normalizeLetter) || wrongLetters.includes(normalizeLetter)) {
      return
    }

    // imprimir letra adivinhada ou remover uma tentativa
    if (letters.includes(normalizeLetter)) {
      setGuessedLetters((actualGuestLetters) => [
        ...actualGuestLetters,
        normalizeLetter
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizeLetter
      ])

      setGuesses((actualGuesses) => actualGuesses-1)

    }


  }


  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }


  //Checar se as chances/palpites acabaram
  useEffect(() => {
    if (guesses <= 0) {
      //resetar states do jogo
      clearLetterStates()


      setGameStage(stages[2].name)
    }
  }, [guesses])



  //checar win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]

    //win condition
    if (guessedLetters.length === uniqueLetters.length) {
      //score
      setScore((actualScore) => actualScore += 100)

      //restart game com palavra nova
      startGame()

    }

  }, [guessedLetters, letters, startGame])


  //Retry jogo
  const retry = () => {
    setScore(0)
    setGuesses(guessesQtd)

    setGameStage(stages[0].name)
  }
  
  
  return (
    <div>
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      
      {gameStage === 'game' && <Game verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score}/>}
      
      {gameStage === 'end' && <GameOver retry={retry} score={score}/>}
    </div>
  )
}

export default App
