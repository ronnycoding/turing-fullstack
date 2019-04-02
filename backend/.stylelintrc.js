module.exports = {
	processors: ['stylelint-processor-styled-components'],
	extends: ['stylelint-config-standard', 'stylelint-config-styled-components'],
	plugins: ['stylelint-order'],
	rules: {
		'order/properties-alphabetical-order': true
	}
};
