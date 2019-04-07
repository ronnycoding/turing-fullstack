import jwt from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server-express'
import ENV from './src/config/env'

export const getMe = async (req) => {
	const token = req.headers['x-token']

	if (token) {
		try {
			return await jwt.verify(token, ENV.SECRET)
		} catch (e) {
			throw new AuthenticationError('Your session expired. Sign in again.')
		}
	}
	return null
}
