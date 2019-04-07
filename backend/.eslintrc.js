module.exports = {
	parser: 'babel-eslint',
	extends: ['airbnb'],
	env: {
		mocha: true
	},
	globals: {
		__DEV__: true
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js'],
				moduleDirectory: ['node_modules', 'src']
			}
		}
	},
	rules: {
		// @TODO: remove next two lines when https://github.com/babel/babel-eslint/issues/530
		// gets fixed.
		'template-curly-spacing': 0,
		indent: 0,
		semi: ['error', 'never'],
		'no-alert': 0,
		'import/prefer-default-export': 0,
		'global-require': 0,
		'no-useless-escape': 0,
		'template-curly-spacing': 0,
		indent: 0,
		'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
		'no-tabs': 0,
		camelcase: 0,
		'max-len': 0
	}
};
