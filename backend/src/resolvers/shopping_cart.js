import { combineResolvers } from 'graphql-resolvers';
import { UserInputError } from 'apollo-server';
import { isAuthenticated } from './authorization';

export default {
  Query: {
    getShoppingCart: async (parent, { product_id, cart_id }, { models }) => await models.ShoppingCart.findAll({
      where: { product_id, cart_id },
    }),
  },
  Mutation: {
    createShoppingCart: combineResolvers(isAuthenticated, async (parent, args, { models, me }) => {
      const { customer_id } = me;
      return await models.ShoppingCart.create({
        ...args,
        added_on: new Date(),
      });
    }),
    updateShoppingCart: combineResolvers(
      isAuthenticated,
      async (parent, { cart_id, product_id, ...args }, { models }) => {
        const shoppingCart =					(await models.ShoppingCart.findAll({
					  limit: 1,
					  where: {
					    cart_id,
					    product_id,
					  },
        })) || false;

        if (!shoppingCart) {
          throw new UserInputError('No shopping cart found.');
        }

        return await shoppingCart[0].update({ ...args });
      },
    ),
    deleteShoppingCart: combineResolvers(
      isAuthenticated,
      async (parent, { cart_id, product_id }, { models }) => await models.ShoppingCart.destroy({
        where: { product_id, cart_id },
      }),
    ),
  },
};
