import { gql } from 'apollo-server-express';

export default gql`
	type ProductCategory {
		product_id: Int!
		category_id: Int!
	}
`;
