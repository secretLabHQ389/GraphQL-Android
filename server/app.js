// /http://localhost:4000/graphql

//https://www.apollographql.com/docs/android/tutorial/01-configure-project/

const express = require('express')
const graphqlHTTP = require('express-graphql').graphqlHTTP
//const { graphqlHTTP } = require('express-graphql')
//npm i mongoose --save
// const mongoose = require('mongoose')

//connection string from mongoDB db:
// mongoose.connect('', {useNewUrlParser: true})
// mongoose.connection.once('open', () => {
//     console.log('DB connected')
// })

const cors = require('cors')
const port = process.env.PORT || 4000

const schema = require('./schema/schema')

const app = express()
app.use(cors())
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema
}))

app.listen(port, () => {
    console.log('Having fun on port 4000')
})