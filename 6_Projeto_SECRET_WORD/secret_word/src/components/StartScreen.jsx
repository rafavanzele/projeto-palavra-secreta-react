import './StartScreen.css'

const StartScreen = ({startGame}) => {
  return (
    <div className='start'>
        <h1>Palavra Secreta</h1>
        <p>Clique abaixo para começar o jogo</p>
        <button onClick={startGame}>Começar o jogo</button>
    </div>
  )
}

export default StartScreen