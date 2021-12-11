const graphql = require('graphql')
var _ = require('lodash')

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLNonNull
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
    {id: '2', title: 'Weight lifting', description: 'Having fun'},
    {id: '3', title: 'Researching', description: 'Know the city and useful knowledge'}
]

//Create types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Having fun',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString}
    })
})

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Having fun',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString}
    })
})

//Root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Having fun',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                return _.find(userData, {id: args.id})
            }
        },

        // users: {
        //     type: UserType,
        //     args: {}
        // },

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

//Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                // id: {type: GraphQLID}
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
                profession: {type: GraphQLString}
            },
            resolve(parent, args) {
                let user = {
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                }
                return user
            }
        },

        createHobby: {
            type: HobbyType,
            args: {
                // id: {type: GraphQLID}
                title: {type: GraphQLString},
                description: {type: GraphQLString}
            },
            resolve(parent, args) {
                let hobby = {
                    title: args.title,
                    description: args.description
                }
                return hobby
            }

        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})