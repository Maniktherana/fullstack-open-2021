import ReactDOM from 'react-dom'
import App from './App'

const names = [
  {
    content: 'Arto Hellas',
    number: '+1 234-567-8910'
  },
  {
    content: 'Kiko Maveric',
    number: '+1 234-567-8922'
  }
]

ReactDOM.render(<App names={names}/>, document.getElementById('root'))