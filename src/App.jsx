import { useState } from 'react'
import './App.css'
import './index.css'

  const turns ={
    X : 'x',
    O : 'o'
  }
  const Square = ({children, isSelected, updateBoard, index}) =>{
    const className = `square ${isSelected ? 'is-selected' : ''}`
 
   const handleClick = () =>{
    updateBoard(index)
   }
      return(
      <div onClick={handleClick} className={className}>
      {children}
    </div>)
    }

    const WinnerCombos =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [6,4,2],
    [0,4,8],
    ]


  function App() {
    const [board, setBoard] = useState(Array(9).fill(null))
    console.log(board)
    const [turn, setTurn] = useState(turns.X)
  
    const [winner, setWinner] = useState(null)

    const resetGame = () => {
      setBoard(Array(9).fill(null))
      setTurn(turns.X)
      setWinner(null)
  
      resetGameStorage()
    }

   const checkWinner = (boardCheck) =>{
    for (const combo of WinnerCombos){
    const [a, b, c] = combo
    if (boardCheck [a] &&
       boardCheck[a]===boardCheck[b] &&
       boardCheck[a]===boardCheck[c]
    )
    //ganador
    {
      return(boardCheck[a])
    }
  }
  //si no hay ganador
      return null
    
   }

    const updateBoard = (index) =>{
      //si tiene algo no se sobreescribe
      if (board[index] || winner) return
      //actualizar tablero 
      const newBoard = [...board]
      newBoard[index] = turn
      setBoard(newBoard)
      //cambiar turno
      const newTurn = turn === turns.X ? turns.O : turns.X
      setTurn(newTurn)
      //hay ganador?
      const newWinner = checkWinner(newBoard)
      if(newWinner){
      setWinner(newWinner)
      }
    }
return(
  <main className='board'>
    <h1>TA TE TI</h1>
    <button onClick={resetGame}>Reset del juego</button>
    <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === turns.X}>
          {turns.X}
        </Square>
        <Square isSelected={turn === turns.O}>
          {turns.O}
        </Square>
      </section>

      {
        winner !== null && (
          <section className= 'winner' >
            <div className='text'>
              <h2>
                {
                winner === false
                ? 'empate'
                : 'gano'
                }
              </h2>
              <header className='win'>
                {winner && <Square>{winner}</Square>}
        
              </header>

              <footer>
                <button onClick={resetGame}>volver a jugar</button>
              </footer>
            </div>

          </section>
        )
      }

  </main>
 
  )}


  export default App