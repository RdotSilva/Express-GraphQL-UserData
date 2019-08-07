const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;
const axios = require("axios");

const UserType = new GraphQLObjectType({
	name: "User",
	fields: {
		id: { type: GraphQLString },
		firstName: { type: GraphQLString },
		age: { type: GraphQLInt }
	}
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		// If looking for a user
		user: {
			// Will give you back a User
			type: UserType,
			// Give me an ID
			args: { id: { type: GraphQLString } },
			// Resolve reaches out and grabs the data.
			resolve(parentValue, args) {
				// Wait for promise to resolve (after it hits API) for data and return it as a response.
				return (
					axios
						.get(`http://localhost:3000/users/${args.id}`)
						// .then(res => console.log(res));  {data : { firstName: 'bill' }}
						.then(res => res.data)
				);
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
