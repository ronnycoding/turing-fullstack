import jwt from 'jsonwebtoken'
import { combineResolvers } from 'graphql-resolvers'
import { AuthenticationError, UserInputError } from 'apollo-server'

import { isAuthenticated } from './authorization'

const createToken = async (customer, secret, expiresIn) => {
	const {
		customer_id,
		email,
		name, // role,
	} = customer
	return jwt.sign(
		{
			customer_id,
			email,
			name,
			// role,
		},
		secret,
		{
			expiresIn,
		},
	)
}

export default {
	Query: {
		customers: async (parent, args, { models }) => models.Customer.findAll(),
		customer: async (parent, { customer_id }, { models }) => models.Customer.findById(customer_id),
		me: async (parent, args, { models, me }) => {
			if (!me) {
				return null
			}

			return models.Customer.findById(me.customer_id)
		},
	},

	Mutation: {
		signUp: async (parent, { name, email, password }, { models, secret }) => {
			const customer = await models.Customer.create({
				name,
				email,
				password,
			})

			return { token: createToken(customer, secret, '30m') }
		},

		signIn: async (parent, { login, password }, { models, secret }) => {
			const customer = await models.Customer.findByLogin(login)

			if (!customer) {
				throw new UserInputError('No customer found with this login credentials.')
			}

			const isValid = await customer.validatePassword(password)

			if (!isValid) {
				throw new AuthenticationError('Invalid password.')
			}

			return { token: createToken(customer, secret, '30m') }
		},

		updateCustomer: combineResolvers(isAuthenticated, async (parent, args, { models, me }) => {
			const customer = await models.Customer.findById(me.customer_id)
			return customer.update({ ...args })
		}),

		deleteCustomer: combineResolvers(isAuthenticated, async (parent, { customer_id }, { models }) => models.User.destroy({
				where: { customer_id },
			})),
	},
}
