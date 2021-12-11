const graphql = require('graphql')
var _ = require('lodash')
const User = require('../models/User')
const Post = require('../models/Post')
const Hobby = require('../models/Hobby')
//mongoose relational schema: /watch?v=bgq7FRSPDpI
//also 23:50- quote referencing my explanation of async await
//as parlance for Promise rather than asynchronous code

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLList
} = graphql

var userData = [
    {id: '1', name: 'Bond', age: 36, profession: 'Landscaper'},
    {id: '2', name: 'Anna', age: 26, profession: 'Ticket Collector'},
    {id: '3', name: 'Bella', age: 16, profession: 'sandwich artist'},
    {id: '4', name: 'Gina', age: 26, profession: 'waitress'},
    {id: '5', name: 'Georgina', age: 36, profession: 'secretary'},
]

var hobbiesData = [
    {id: '1', title: 'Programming', description: 'Make useful software', userId: '1'},
    {id: '2', title: 'Weight lifting', description: 'Having fun', userId: '3'},
    {id: '3', title: 'Researching', description: 'Know the city and useful knowledge', userId: '5'}
]

var postData = [
    {id: '1', comment: 'Programming is fun', userId: '1'},
    {id: '2', comment: 'Programming is rewarding', userId: '3'},
    {id: '3', comment: 'Programming is useful', userId: '5'}
]

//Create types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Having fun',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString},
        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return _.filter(hobbiesData, {userId: parent.id})
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return _.filter(postData, {userId: parent.id})
            }
        }
    })
})

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Having fun',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(userData, {id: parent.userId})
            }
        }
    })
})

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Having fun',
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(userData, {id: parent.userId})
            }
        }
    })
})

//Root query
const RootQuery = new GraphQLObjectType({
    //use Mongoose documentation to update these:
    name: 'RootQueryType',
    description: 'Having fun',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                return _.find(userData, {id: args.id})
                //return User.find({id: args.id})
            }
        },

        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return userData
                //return User.find({})
            }
        },

        hobby: {
            type: HobbyType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                return _.find(hobbiesData, {id: args.id})
            }
        },

        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return hobbiesData
            }
        },

        post: {
            type: PostType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                return _.find(postData, {id: args.id})
            }
        },

        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return postData
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
                let user = new User({
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                })
                return user.save()
            }
        },

        UpdateUser: {
            type: UserType,
            arg: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: GraphQLInt},
                profession: {type: GraphQLString}
            },
            resolve(parent, args) {

            }
        },

        createHobby: {
            type: HobbyType,
            args: {
                // id: {type: GraphQLID}
                title: {type: GraphQLString},
                description: {type: GraphQLString},
                userId: {type: GraphQLID}
            },
            resolve(parent, args) {
                let hobby = new Hobby({
                    title: args.title,
                    description: args.description
                })
                return hobby.save()
            }

        },

        createPost: {
            type: PostType,
            args: {
                // id: {type: GraphQLID}
                comment: {type: GraphQLString},
                userId: {type: GraphQLID}
            },
            resolve(parent, args) {
                let post = new Post({
                    comment: args.title
                })
                return post.save()
            }

        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})