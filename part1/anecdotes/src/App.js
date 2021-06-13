import React, { useState } from 'react'

const Anecdote = (props) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[props.selected]}
    </div>
  )
}

const Votes = (props) => {
  return (
    <div>
      has {props.votes[props.selected]} votes
    </div>
    )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const MostVotes = (props) => {
  const mostVote = Math.max(...props.votes)
  const newV = [...props.votes]
  const indexMostVote = (element) => element === mostVote
  if (mostVote !== 0) {
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        {props.anecdotes[newV.findIndex(indexMostVote)]}
      </div>
    )
  }
  return (<h1>Anecdote with most votes</h1>)
}

const MaxVotes = (props) => {
  const mostVote = Math.max(...props.votes)
  if (mostVote === 0) {
    return (
      <div>
        no votes yet
      </div>
    )
  } else {
    return (
      <div>
        has {mostVote} votes
      </div>
      )
  }
  
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]

  const next = 'next anecdote'
  const voteText = 'vote'
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const randomSelected = () => {
    setSelected(Math.floor(Math.random()*anecdotes.length))
  }

  const addVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <Anecdote anecdotes={anecdotes} selected={selected}/>
      <Votes votes={votes} selected={selected}/>

      <Button handleClick={addVote} text={voteText}/>
      <Button handleClick={randomSelected} text={next}/>

      <MostVotes anecdotes={anecdotes} selected={selected} votes={votes}/>
      <MaxVotes votes={votes}/>
    </div>
  )
}

export default App