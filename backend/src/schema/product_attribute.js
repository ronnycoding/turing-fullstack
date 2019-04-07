import { gql } from 'apollo-server-express'

export default gql`
	type ProductAttribute {
		product_id: Int!
		attribute_value_id: Int!
	}
`
