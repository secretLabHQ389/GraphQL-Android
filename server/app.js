const express = require('express')
const graphqlHTTP = require('express-graphql').graphqlHTTP
// const mongoose = require('mongoose')

//connection string from mongoDB db:
// mongoose.connect('')
// mongoose.connection.once('open', () => {
//     console.log('DB connected')
// })

const schema = require('./schema/schema')

const app = express()
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema
}))

app.listen(4000, () => {
    console.log('Having fun on port 4000')
})