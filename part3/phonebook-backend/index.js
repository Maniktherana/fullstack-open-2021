require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
    return Math.floor(Math.random() * 1000000)
  }

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(
        `<p>The phonebook has info for ${persons.length} people</p>
        <p>${date}</p>`
    )
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
  })

// app.get('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     console.log(id)
//     const person = persons.find(person => person.id === id)
//     if (person) {
//         response.json(person)
//       } else {
//         response.status(404).end()
//       }
// })

app.post('/api/persons', morgan(':body'), (request, response) => {
    const body = request.body
    const personExists = persons.find(person => person.name === body.name)

    if ((!body.name || !body.number)) {
        return response.status(400).json({ 
        error: 'content missing' 
        })
    }

    if (personExists) {
        return response.status(400).json({
            error: `${body.name} already exists`
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })
    
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })

    morgan.token('body', function (req) {return JSON.stringify(req.body)})

    // const person = {
    //     id: generateId(),
    //     name: body.name,
    //     number: body.number,
    // }

    // persons = persons.concat(person)
    // response.json(person)
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })

// app.delete('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id)
//   persons = persons.filter(person => person.id !== id)

//   response.status(204).end()
// })

  
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
