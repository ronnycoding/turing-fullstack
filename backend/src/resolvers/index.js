import { GraphQLDateTime } from 'graphql-iso-date';
import { mergeResolvers } from 'merge-graphql-schemas';

import customerResolver from './customer';

const customScalarResolver = {
	Date: GraphQLDateTime
};

const types = [customScalarResolver, customerResolver];

export default mergeResolvers(types);
