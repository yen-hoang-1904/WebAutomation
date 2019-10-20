module.exports = {
	"parserOptions": {
		"ecmaVersion": 10,
		"sourceType": "script"
	},
	"env": {
		"browser":true,
		"mocha": true,
		"es6": true,
		"jquery": false
	},
	"extends": "eslint:recommended",
	"rules": {
		"no-multiple-empty-lines": "warn",
		"no-var": "error",
		"prefer-const": "error",
		"no-unused-vars": [
			"error",
			{ "varsIgnorePattern": "should/expect" }
	 	]	
	}
}
