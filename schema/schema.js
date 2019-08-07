const graphql = require("graphql");
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList
} = graphql;
const axios = require("axios");

const CompanyType = new GraphQLObjectType({
	name: "Company",
	fields: {
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		users: {
			type: new GraphQLList(UserType),
			resolve(parentValue, args) {
				console.log("Ryan Debug: resolve -> parentValue", parentValue);
				return axios
					.get(`http://localhost:3000/companies/${parentValue.id}`)
					.then(res => res.data);
			}
		}
	}
});

const UserType = new GraphQLObjectType({
	name: "User",
	fields: {
		id: { type: GraphQLString },
		firstName: { type: GraphQLString },
		age: { type: GraphQLInt },
		company: {
			type: CompanyType,
			resolve(parentValue, args) {
				return axios
					.get(`http://localhost:3000/companies/${parentValue.companyId}`)
					.then(res => res.data);
			}
		}
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
		},
		company: {
			type: CompanyType,
			args: { id: { type: GraphQLString } },
			resolve(parentValue, args) {
				return axios
					.get(`http://localhost:3000/companies/${args.id}`)
					.then(res => res.data);
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
