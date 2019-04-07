import { gql } from 'apollo-server-express'

export default gql`
	extend type Query {
		categories: [Category!]
		category(category_id: ID!): Category
		getCategoriesByDeparmentId(department_id: ID!): [Category!]
		getCategoryByProductId(product_id: ID!): Category
	}

	type Category {
		category_id: ID!
		department_id: ID!
		name: String!
		description: String
	}
`
