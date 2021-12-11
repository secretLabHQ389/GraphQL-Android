const graphql = require('graphql')
var _ = require('lodash')

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql

var userData = [
    {id: '1', name: 'Bond', age: 36, profession: 'Landscaper'},
    {id: '2', name: 'Anna', age: 26, profession: 'Ticket Collector'},
    {id: '3', name: 'Bella', age: 16, profession: 'sandwich artist'},
    {id: '4', name: 'Gina', age: 26, profession: 'waitress'},
    {id: '5', name: 'Georgina', age: 36, profession: 'secretary'},
]

var hobbiesData = [
    {id: '1', title: 'Programming', description: 'Make useful software'},
    {id: '2', title: 'Weight lifting', description: 'Making muscle without blowing out organs'},
    {id: '3', title: 'Researching', description: 'Know the city and useful knowledge'}
]

//Create types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: '_/UU\_',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString}
    })
})

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: '/UU',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString}
    })
})

//Root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: '|^U',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                return _.find(userData, {id: args.id})
                //get and return data
                // let user = {
                //     id: '987',
                //     age: '33',
                //     name: 'George'
                // }

                // return user;
            }
        },

        hobby: {
            type: HobbyType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                //return data for our hobby
                return _.find(hobbiesData, {id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})