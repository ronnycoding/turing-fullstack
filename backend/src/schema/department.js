import { gql } from 'apollo-server-express'

export default gql`
	extend type Query {
		departments: [Department!]
		department(department_id: ID!): Department
		getDepartmentByCategoryId(category_id: ID!): Department
	}

	type Department {
		department_id: ID!
		name: String!
		description: String
	}
`
