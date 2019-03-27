import { gql } from 'apollo-server-express';

export default gql`
	extend type Query {
		review(review_id: ID!): Review
		getReviewsByProductId(product_id: ID!): [Review]
		getReviewsByCustomerId(customer_id: ID!): [Review]
	}

	extend type Mutation {
		createReview(product_id: ID!, review: String!, rating: Int!): Review!
		updateReview(review_id: ID!, review: String, rating: Int): Review!
		deleteReview(review_id: ID!): Boolean!
	}

	type Review {
		review_id: ID!
		customer_id: ID!
		product_id: ID!
		review: String!
		rating: Int!
		created_on: Date!
	}
`;
