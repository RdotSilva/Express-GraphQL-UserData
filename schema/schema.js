const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;

const UserType = new GraphQLObjectType({
	name: "User",
	fields: {
		id: { type: GraphQLString },
		firsName: { type: GraphQLString },
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
			resolve(parentValue, args) {}
		}
	}
});
