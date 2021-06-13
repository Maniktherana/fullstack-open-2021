import React, { useState } from 'react'

const Heading = () => {
  return (
    <h1>give feedback</h1>
  )
}

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
) 

const Statistics = ({all, stats}) => {
  if (all === 0) {
    return <p>No feedback given</p>
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <Statistic name={stats[0].name} calculation={stats[0].calculation} />
            <Statistic name={stats[1].name} calculation={stats[1].calculation} />
            <Statistic name={stats[2].name} calculation={stats[2].calculation} />
            <Statistic name={stats[3].name} calculation={stats[3].calculation} />
            <Statistic name={stats[4].name} calculation={stats[4].calculation} />
            <Statistic name={stats[5].name} calculation={stats[5].calculation} />
          </tbody>
        </table>
    </div>
    )
  }
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.calculation}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const increaseAll = () => setAll(all + 1)

  const stats = [
    {
      name:"good",
      calculation: good
    },
    {
      name:"neutral",
      calculation: neutral
    },
    {
      name:"bad",
      calculation: bad
    },
    {
      name:"all",
      calculation: all
    },
    {
      name:"average",
      calculation: (good - bad) / all
    },
    {
      name:"positive",
      calculation: `${(good/all) * 100} %`
    }
  ]

  const handleGoodClick = () => {
    setGood(good + 1)
    increaseAll()
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    increaseAll()
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    increaseAll()
  }

  return (
    <div>
      <Heading />

      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />

      <Statistics all={all} stats={stats}/>
    </div>
  )
}

export default App