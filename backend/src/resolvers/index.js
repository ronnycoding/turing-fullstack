import { GraphQLDateTime } from 'graphql-iso-date';
import { mergeResolvers } from 'merge-graphql-schemas';

import customerResolver from './customer';
import shippingRegionResolver from './shipping_region';

const customScalarResolver = {
	Date: GraphQLDateTime
};

const types = [customScalarResolver, customerResolver, shippingRegionResolver];

export default mergeResolvers(types);
