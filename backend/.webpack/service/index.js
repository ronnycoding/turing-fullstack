module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: handler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handler", function() { return handler; });
/* harmony import */ var dataloader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dataloader */ "dataloader");
/* harmony import */ var dataloader__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dataloader__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/schema */ "./src/schema/index.js");
/* harmony import */ var _src_resolvers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/resolvers */ "./src/resolvers/index.js");
/* harmony import */ var _src_config_database__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/config/database */ "./src/config/database.js");
/* harmony import */ var _src_config_env__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/config/env */ "./src/config/env.js");
/* harmony import */ var _src_config_express__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./src/config/express */ "./src/config/express.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils */ "./utils.js");








const server = new apollo_server_express__WEBPACK_IMPORTED_MODULE_1__["ApolloServer"]({
  introspection: true,
  playground: true,
  typeDefs: _src_schema__WEBPACK_IMPORTED_MODULE_2__["default"],
  resolvers: _src_resolvers__WEBPACK_IMPORTED_MODULE_3__["default"],
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message.replace('SequelizeValidationError: ', '').replace('Validation error: ', '');
    return { ...error,
      message
    };
  },
  context: async ({
    req,
    connection
  }) => {
    if (connection) {
      return {
        models: _src_config_database__WEBPACK_IMPORTED_MODULE_4__["default"],
        loaders: {
          customer: new dataloader__WEBPACK_IMPORTED_MODULE_0___default.a(keys => loaders.customer.batchCustomers(keys, _src_config_database__WEBPACK_IMPORTED_MODULE_4__["default"]))
        }
      };
    }

    if (req) {
      const me = await Object(_utils__WEBPACK_IMPORTED_MODULE_7__["getMe"])(req);
      return {
        models: _src_config_database__WEBPACK_IMPORTED_MODULE_4__["default"],
        me,
        secret: _src_config_env__WEBPACK_IMPORTED_MODULE_5__["default"].SECRET,
        loaders: {
          customer: new dataloader__WEBPACK_IMPORTED_MODULE_0___default.a(keys => loaders.customer.batchCustomers(keys, _src_config_database__WEBPACK_IMPORTED_MODULE_4__["default"]))
        }
      };
    }
  }
});
const handler = Object(_src_config_express__WEBPACK_IMPORTED_MODULE_6__["default"])(server, _src_config_database__WEBPACK_IMPORTED_MODULE_4__["sequelize"]);


/***/ }),

/***/ "./src/config/database.js":
/*!********************************!*\
  !*** ./src/config/database.js ***!
  \********************************/
/*! exports provided: sequelize, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sequelize", function() { return sequelize; });
/* harmony import */ var _relations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./relations */ "./src/config/relations.js");
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models */ "./src/config/models.js");
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./env */ "./src/config/env.js");


const Sequelize = __webpack_require__(/*! sequelize */ "sequelize");



const database = _env__WEBPACK_IMPORTED_MODULE_2__["default"].DB_DATABASE;
const username = _env__WEBPACK_IMPORTED_MODULE_2__["default"].DB_USER;
const password = _env__WEBPACK_IMPORTED_MODULE_2__["default"].DB_PASSWORD;
const sequelize = new Sequelize(database, username, password, {
  host: _env__WEBPACK_IMPORTED_MODULE_2__["default"].DB_HOST,
  dialect: _env__WEBPACK_IMPORTED_MODULE_2__["default"].DB_MACHINE,
  dialectOptions: {
    timeout: 30
  },
  define: {
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    },
    timestamps: false
  },
  pool: {
    maxIdleTime: 120000
  }
});
const models = Object(_relations__WEBPACK_IMPORTED_MODULE_0__["default"])(Object(_models__WEBPACK_IMPORTED_MODULE_1__["default"])(sequelize));
Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

/* harmony default export */ __webpack_exports__["default"] = (models);

/***/ }),

/***/ "./src/config/env.js":
/*!***************************!*\
  !*** ./src/config/env.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const {
  NODE_ENV,
  DB_HOST,
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_MACHINE,
  SECRET,
  PORT,
  DEPLOY_DB_HOST,
  DEPLOY_DB_DATABASE,
  DEPLOY_DB_USER,
  DEPLOY_DB_PASSWORD,
  DEPLOY_DB_PORT,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY
} = process.env;
const ENV = {
  development: {
    NODE_ENV,
    DB_HOST,
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD,
    DB_PORT,
    DB_MACHINE,
    SECRET,
    PORT,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY
  },
  production: {
    NODE_ENV,
    DB_HOST: DEPLOY_DB_HOST,
    DB_DATABASE: DEPLOY_DB_DATABASE,
    DB_USER: DEPLOY_DB_USER,
    DB_PASSWORD: DEPLOY_DB_PASSWORD,
    DB_PORT: DEPLOY_DB_PORT,
    DB_MACHINE,
    SECRET,
    PORT,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY
  }
};

function getEnvVars(env = '') {
  if (env === 'production') return ENV.production;
  return ENV.development || ENV.staging;
}

/* harmony default export */ __webpack_exports__["default"] = (getEnvVars("development"));

/***/ }),

/***/ "./src/config/express.js":
/*!*******************************!*\
  !*** ./src/config/express.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createHttpServer; });
/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! morgan */ "morgan");
/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(morgan__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cors */ "cors");
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var serverless_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! serverless-http */ "serverless-http");
/* harmony import */ var serverless_http__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(serverless_http__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var graphql_playground_middleware_express__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! graphql-playground-middleware-express */ "graphql-playground-middleware-express");
/* harmony import */ var graphql_playground_middleware_express__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(graphql_playground_middleware_express__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./env */ "./src/config/env.js");







function createHttpServer(server, sequelize) {
  const app = express__WEBPACK_IMPORTED_MODULE_2___default()();
  app.use(cors__WEBPACK_IMPORTED_MODULE_1___default()());
  app.use(morgan__WEBPACK_IMPORTED_MODULE_0___default()('dev'));
  server.applyMiddleware({
    app,
    path: '/graphql'
  });
  app.get('/playground', graphql_playground_middleware_express__WEBPACK_IMPORTED_MODULE_5___default()({
    endpoint: '/graphql'
  }));
  sequelize.sync({
    force: false
  }).then(async () => {
    console.log(`Apollo Server on http://localhost:${_env__WEBPACK_IMPORTED_MODULE_6__["default"].DB_PORT}/graphql`);
  });
  return serverless_http__WEBPACK_IMPORTED_MODULE_4___default()(app);
}

/***/ }),

/***/ "./src/config/models.js":
/*!******************************!*\
  !*** ./src/config/models.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getModels; });
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sequelize */ "sequelize");
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_attribute__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/attribute */ "./src/models/attribute.js");
/* harmony import */ var _models_attribute__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_models_attribute__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _models_attribute_value__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/attribute_value */ "./src/models/attribute_value.js");
/* harmony import */ var _models_attribute_value__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_models_attribute_value__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _models_category__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models/category */ "./src/models/category.js");
/* harmony import */ var _models_category__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_models_category__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _models_customer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/customer */ "./src/models/customer.js");
/* harmony import */ var _models_customer__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_models_customer__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _models_department__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../models/department */ "./src/models/department.js");
/* harmony import */ var _models_department__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_models_department__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _models_order_detail__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../models/order_detail */ "./src/models/order_detail.js");
/* harmony import */ var _models_order_detail__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_models_order_detail__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _models_orders__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../models/orders */ "./src/models/orders.js");
/* harmony import */ var _models_orders__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_models_orders__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _models_product_attribute__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../models/product_attribute */ "./src/models/product_attribute.js");
/* harmony import */ var _models_product_attribute__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_models_product_attribute__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _models_product_category__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../models/product_category */ "./src/models/product_category.js");
/* harmony import */ var _models_product_category__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_models_product_category__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _models_product__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../models/product */ "./src/models/product.js");
/* harmony import */ var _models_product__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_models_product__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _models_review__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../models/review */ "./src/models/review.js");
/* harmony import */ var _models_review__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_models_review__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _models_shipping_region__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../models/shipping_region */ "./src/models/shipping_region.js");
/* harmony import */ var _models_shipping_region__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_models_shipping_region__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _models_shipping__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../models/shipping */ "./src/models/shipping.js");
/* harmony import */ var _models_shipping__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_models_shipping__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _models_shopping_cart__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../models/shopping_cart */ "./src/models/shopping_cart.js");
/* harmony import */ var _models_shopping_cart__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_models_shopping_cart__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _models_tax__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../models/tax */ "./src/models/tax.js");
/* harmony import */ var _models_tax__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_models_tax__WEBPACK_IMPORTED_MODULE_15__);
















function getModels(sequelize) {
  return {
    Attribute: _models_attribute__WEBPACK_IMPORTED_MODULE_1___default()(sequelize, sequelize__WEBPACK_IMPORTED_MODULE_0___default.a),
    // sequelize.import('../models/attribute'),
    AttributeValue: _models_attribute_value__WEBPACK_IMPORTED_MODULE_2___default()(sequelize, sequelize__WEBPACK_IMPORTED_MODULE_0___default.a),
    // Audit: sequelize.import('../models/audit'),
    Category: _models_category__WEBPACK_IMPORTED_MODULE_3___default()(sequelize, sequelize__WEBPACK_IMPORTED_MODULE_0___default.a),
    Customer: _models_customer__WEBPACK_IMPORTED_MODULE_4___default()(sequelize, sequelize__WEBPACK_IMPORTED_MODULE_0___default.a),
    Department: _models_department__WEBPACK_IMPORTED_MODULE_5___default()(sequelize, sequelize__WEBPACK_IMPORTED_MODULE_0___default.a),
    OrderDetail: _models_order_detail__WEBPACK_IMPORTED_MODULE_6___default()(sequelize, sequelize__WEBPACK_IMPORTED_MODULE_0___default.a),
    Order: _models_orders__WEBPACK_IMPORTED_MODULE_7___default()(sequelize, sequelize__WEBPACK_IMPORTED_MODULE_0___default.a),
    ProductAttribute: _models_product_attribute__WEBPACK_IMPORTED_MODULE_8___default()(sequelize, sequelize__WEBPACK_IMPORTED_MODULE_0___default.a),
    ProductCategory: _models_product_category__WEBPACK_IMPORTED_MODULE_9___default()(sequelize, sequelize__WEBPACK_IMPORTED_MODULE_0___default.a),
    Product: _models_product__WEBPACK_IMPORTED_MODULE_10___default()(sequelize, sequelize__WEBPACK_IMPORTED_MODULE_0___default.a),
    Review: _models_review__WEBPACK_IMPORTED_MODULE_11___default()(sequelize, sequelize__WEBPACK_IMPORTED_MODULE_0___default.a),
    ShippingRegion: _models_shipping_region__WEBPACK_IMPORTED_MODULE_12___default()(sequelize, sequelize__WEBPACK_IMPORTED_MODULE_0___default.a),
    Shipping: _models_shipping__WEBPACK_IMPORTED_MODULE_13___default()(sequelize, sequelize__WEBPACK_IMPORTED_MODULE_0___default.a),
    ShoppingCart: _models_shopping_cart__WEBPACK_IMPORTED_MODULE_14___default()(sequelize, sequelize__WEBPACK_IMPORTED_MODULE_0___default.a),
    Tax: _models_tax__WEBPACK_IMPORTED_MODULE_15___default()(sequelize, sequelize__WEBPACK_IMPORTED_MODULE_0___default.a)
  };
}

/***/ }),

/***/ "./src/config/relations.js":
/*!*********************************!*\
  !*** ./src/config/relations.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setModelsRelation; });
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcrypt */ "bcrypt");
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_0__);

function setModelsRelation(models) {
  const {
    Customer,
    ShippingRegion,
    Attribute,
    AttributeValue,
    Department,
    Category,
    Product,
    Shipping,
    Review,
    Order,
    Tax,
    OrderDetail,
    ShoppingCart
  } = models;

  Customer.associate = models => {
    models.Customer.belongsTo(ShippingRegion, {
      as: 'ShippingRegion',
      foreignKey: 'shipping_region_id'
    });
    models.Customer.hasMany(Review, {
      as: 'Reviews',
      foreignKey: 'customer_id'
    });
    models.Customer.hasMany(Order, {
      as: 'Orders',
      foreignKey: 'customer_id'
    });
  };

  Customer.findByLogin = async login => {
    let customer = await Customer.findOne({
      where: {
        name: login
      }
    });

    if (!customer) {
      customer = await Customer.findOne({
        where: {
          email: login
        }
      });
    }

    return customer;
  };

  Customer.beforeCreate(async customer => {
    customer.password = await customer.generatePasswordHash();
  });

  Customer.prototype.generatePasswordHash = async function () {
    const saltRounds = 10;
    return await bcrypt__WEBPACK_IMPORTED_MODULE_0___default.a.hash(this.password, saltRounds);
  };

  Customer.prototype.validatePassword = async function (password) {
    return await bcrypt__WEBPACK_IMPORTED_MODULE_0___default.a.compare(password, this.password);
  };

  ShippingRegion.associate = models => {
    models.ShippingRegion.hasMany(Customer, {
      foreignKey: 'shipping_region_id'
    });
    models.ShippingRegion.hasMany(Shipping, {
      as: 'Shippings',
      foreignKey: 'shipping_region_id'
    });
  };

  Attribute.associate = models => {
    models.Attribute.hasMany(AttributeValue, {
      as: 'AttributeValue',
      foreignKey: 'attribute_id'
    });
  };

  AttributeValue.associate = models => {
    models.AttributeValue.belongsTo(Attribute, {
      as: 'Attribute',
      foreignKey: 'attribute_id'
    });
  };

  Department.associate = models => {
    models.Department.hasMany(Category, {
      as: 'Category',
      foreignKey: 'department_id'
    });
  };

  Category.associate = models => {
    models.Category.belongsTo(Department, {
      as: 'Department',
      foreignKey: 'department_id'
    }); // models.Category.belongsToMany(Product, {
    // 	through: ProductCategory,
    // 	foreignKey: 'category_id',
    // 	as: 'Products'
    // });
  };

  Product.associate = models => {
    // models.Product.belongsTo(Category, {
    // 	through: ProductCategory,
    // 	foreignKey: 'product_id',
    // 	as: 'Category'
    // });
    models.Product.hasMany(Review, {
      as: 'Reviews',
      foreignKey: 'product_id'
    });
    models.Product.hasMany(OrderDetail, {
      as: 'OrderDetails',
      foreignKey: 'product_id'
    });
    models.Product.hasMany(ShoppingCart, {
      as: 'ShoppingCart',
      foreignKey: 'product_id'
    });
  };

  Shipping.associate = models => {
    models.Shipping.belongsTo(ShippingRegion, {
      as: 'ShippingRegion',
      foreignKey: 'shipping_region_id'
    });
    models.Shipping.hasMany(Order, {
      as: 'Orders',
      foreignKey: 'shipping_id'
    });
  };

  Review.associate = models => {
    models.Review.belongsTo(Customer, {
      as: 'Customer',
      foreignKey: 'customer_id'
    });
    models.Review.belongsTo(Product, {
      as: 'Product',
      foreignKey: 'product_id'
    });
  };

  Order.associate = models => {
    models.Order.belongsTo(Customer, {
      as: 'Customer',
      foreignKey: 'customer_id'
    });
    models.Order.belongsTo(Shipping, {
      as: 'Shipping',
      foreignKey: 'shipping_id'
    });
    models.Order.belongsTo(Tax, {
      as: 'Tax',
      foreignKey: 'tax_id'
    });
    models.Order.hasMany(OrderDetail, {
      as: 'OrderDetail',
      foreignKey: 'order_id'
    });
  };

  Tax.associate = models => {
    models.Tax.hasMany(Order, {
      as: 'Orders',
      foreignKey: 'tax_id'
    });
  };

  OrderDetail.associate = models => {
    models.OrderDetail.belongsTo(Order, {
      as: 'Order',
      foreignKey: 'order_id'
    });
    models.OrderDetail.belongsTo(Product, {
      as: 'Product',
      foreignKey: 'product_id'
    });
  };

  ShoppingCart.associate = models => {
    models.ShoppingCart.belongsTo(Product, {
      as: 'Product',
      foreignKey: 'product_id'
    });
  };

  return { ...models,
    Customer,
    ShippingRegion,
    Attribute,
    AttributeValue,
    Department,
    Category,
    Product,
    Review,
    Order,
    Tax,
    OrderDetail,
    ShoppingCart
  };
}

/***/ }),

/***/ "./src/models/attribute.js":
/*!*********************************!*\
  !*** ./src/models/attribute.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('attribute', {
    attribute_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'attribute'
  });
};

/***/ }),

/***/ "./src/models/attribute_value.js":
/*!***************************************!*\
  !*** ./src/models/attribute_value.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('attribute_value', {
    attribute_value_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    attribute_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    value: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'attribute_value'
  });
};

/***/ }),

/***/ "./src/models/category.js":
/*!********************************!*\
  !*** ./src/models/category.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('category', {
    category_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    department_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: true
    }
  }, {
    tableName: 'category'
  });
};

/***/ }),

/***/ "./src/models/customer.js":
/*!********************************!*\
  !*** ./src/models/customer.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('customer', {
    customer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    credit_card: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    address_1: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    address_2: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    region: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    postal_code: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    shipping_region_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    day_phone: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    eve_phone: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    mob_phone: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'customer'
  });
};

/***/ }),

/***/ "./src/models/department.js":
/*!**********************************!*\
  !*** ./src/models/department.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('department', {
    department_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: true
    }
  }, {
    tableName: 'department'
  });
};

/***/ }),

/***/ "./src/models/order_detail.js":
/*!************************************!*\
  !*** ./src/models/order_detail.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('order_detail', {
    item_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    attributes: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    product_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    unit_cost: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    tableName: 'order_detail'
  });
};

/***/ }),

/***/ "./src/models/orders.js":
/*!******************************!*\
  !*** ./src/models/orders.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('orders', {
    order_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    total_amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '0.00'
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false
    },
    shipped_on: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    comments: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    customer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    auth_code: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    reference: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    shipping_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    tax_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'orders'
  });
};

/***/ }),

/***/ "./src/models/product.js":
/*!*******************************!*\
  !*** ./src/models/product.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('product', {
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    discounted_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '0.00'
    },
    image: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    image_2: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    thumbnail: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    display: {
      type: DataTypes.INTEGER(6),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'product'
  });
};

/***/ }),

/***/ "./src/models/product_attribute.js":
/*!*****************************************!*\
  !*** ./src/models/product_attribute.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('product_attribute', {
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    attribute_value_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'product_attribute'
  });
};

/***/ }),

/***/ "./src/models/product_category.js":
/*!****************************************!*\
  !*** ./src/models/product_category.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('product_category', {
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    category_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'product_category'
  });
};

/***/ }),

/***/ "./src/models/review.js":
/*!******************************!*\
  !*** ./src/models/review.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('review', {
    review_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    customer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'review'
  });
};

/***/ }),

/***/ "./src/models/shipping.js":
/*!********************************!*\
  !*** ./src/models/shipping.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('shipping', {
    shipping_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    shipping_type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    shipping_cost: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    shipping_region_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'shipping'
  });
};

/***/ }),

/***/ "./src/models/shipping_region.js":
/*!***************************************!*\
  !*** ./src/models/shipping_region.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('shipping_region', {
    shipping_region_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    shipping_region: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'shipping_region'
  });
};

/***/ }),

/***/ "./src/models/shopping_cart.js":
/*!*************************************!*\
  !*** ./src/models/shopping_cart.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('shopping_cart', {
    item_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cart_id: {
      type: DataTypes.CHAR(32),
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    attributes: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    buy_now: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    },
    added_on: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'shopping_cart'
  });
};

/***/ }),

/***/ "./src/models/tax.js":
/*!***************************!*\
  !*** ./src/models/tax.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* jshint indent: 2 */
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tax', {
    tax_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tax_type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    tax_percentage: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    tableName: 'tax'
  });
};

/***/ }),

/***/ "./src/resolvers/attribute.js":
/*!************************************!*\
  !*** ./src/resolvers/attribute.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  Query: {
    attributes: async (parent, args, {
      models
    }) => await models.Attribute.findAll(),
    attribute: async (parent, {
      attribute_id
    }, {
      models
    }) => {
      return await models.Attribute.findById(attribute_id);
    }
  }
});

/***/ }),

/***/ "./src/resolvers/attribute_value.js":
/*!******************************************!*\
  !*** ./src/resolvers/attribute_value.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  Query: {
    attribute_values: async (parent, args, {
      models
    }) => await models.AttributeValue.findAll(),
    attribute_value: async (parent, {
      attribute_value_id
    }, {
      models
    }) => {
      return await models.AttributeValue.findByPk(attribute_value_id);
    },
    getAttributeValuesByAttributeId: async (parent, {
      attribute_id
    }, {
      models
    }) => {
      const attribute = await models.Attribute.findByPk(attribute_id);
      return await attribute.getAttributeValue();
    },
    getAttributeValuesByProductId: async (parent, {
      product_id
    }, {
      models
    }) => {
      const ProductAttributeValues = (await models.ProductAttribute.findAll({
        where: {
          product_id
        }
      })) || [];
      const attributeValueIds = ProductAttributeValues.map(({
        attribute_value_id
      }) => attribute_value_id);
      return await models.AttributeValue.findAll({
        where: {
          attribute_value_id: attributeValueIds
        }
      });
    }
  }
});

/***/ }),

/***/ "./src/resolvers/authorization.js":
/*!****************************************!*\
  !*** ./src/resolvers/authorization.js ***!
  \****************************************/
/*! exports provided: isAuthenticated, isAdmin, isMessageOwner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAuthenticated", function() { return isAuthenticated; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAdmin", function() { return isAdmin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMessageOwner", function() { return isMessageOwner; });
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server */ "apollo-server");
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var graphql_resolvers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql-resolvers */ "graphql-resolvers");
/* harmony import */ var graphql_resolvers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_resolvers__WEBPACK_IMPORTED_MODULE_1__);


const isAuthenticated = (parent, args, {
  me
}) => me ? graphql_resolvers__WEBPACK_IMPORTED_MODULE_1__["skip"] : new apollo_server__WEBPACK_IMPORTED_MODULE_0__["ForbiddenError"]('Not authenticated as user.');
const isAdmin = Object(graphql_resolvers__WEBPACK_IMPORTED_MODULE_1__["combineResolvers"])(isAuthenticated, (parent, args, {
  me: {
    role
  }
}) => role === 'ADMIN' ? graphql_resolvers__WEBPACK_IMPORTED_MODULE_1__["skip"] : new apollo_server__WEBPACK_IMPORTED_MODULE_0__["ForbiddenError"]('Not authorized as admin.'));
const isMessageOwner = async (parent, {
  id
}, {
  models,
  me
}) => {
  const message = await models.Message.findById(id, {
    raw: true
  });

  if (message.userId !== me.id) {
    throw new apollo_server__WEBPACK_IMPORTED_MODULE_0__["ForbiddenError"]('Not authenticated as owner.');
  }

  return graphql_resolvers__WEBPACK_IMPORTED_MODULE_1__["skip"];
};

/***/ }),

/***/ "./src/resolvers/category.js":
/*!***********************************!*\
  !*** ./src/resolvers/category.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  Query: {
    categories: async (parent, args, {
      models
    }) => await models.Category.findAll(),
    category: async (parent, {
      category_id
    }, {
      models
    }) => {
      return await models.Category.findByPk(category_id);
    },
    getCategoriesByDeparmentId: async (parent, {
      department_id
    }, {
      models
    }) => {
      const deparment = await models.Department.findByPk(department_id);
      return await deparment.getCategory();
    },
    getCategoryByProductId: async (parent, {
      product_id
    }, {
      models
    }) => {
      const productCategory = (await models.ProductCategory.findAll({
        limit: 1,
        where: {
          product_id
        }
      })) || [];
      const {
        category_id
      } = productCategory[0] || {};
      return await models.Category.findByPk(category_id);
    }
  }
});

/***/ }),

/***/ "./src/resolvers/customer.js":
/*!***********************************!*\
  !*** ./src/resolvers/customer.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var graphql_resolvers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql-resolvers */ "graphql-resolvers");
/* harmony import */ var graphql_resolvers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_resolvers__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! apollo-server */ "apollo-server");
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(apollo_server__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _authorization__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./authorization */ "./src/resolvers/authorization.js");





const createToken = async (customer, secret, expiresIn) => {
  const {
    customer_id,
    email,
    name // role,

  } = customer;
  return await jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default.a.sign({
    customer_id,
    email,
    name // role,

  }, secret, {
    expiresIn
  });
};

/* harmony default export */ __webpack_exports__["default"] = ({
  Query: {
    customers: async (parent, args, {
      models
    }) => await models.Customer.findAll(),
    customer: async (parent, {
      customer_id
    }, {
      models
    }) => await models.Customer.findById(customer_id),
    me: async (parent, args, {
      models,
      me
    }) => {
      if (!me) {
        return null;
      }

      return await models.Customer.findById(me.customer_id);
    }
  },
  Mutation: {
    signUp: async (parent, {
      name,
      email,
      password
    }, {
      models,
      secret
    }) => {
      const customer = await models.Customer.create({
        name,
        email,
        password
      });
      return {
        token: createToken(customer, secret, '30m')
      };
    },
    signIn: async (parent, {
      login,
      password
    }, {
      models,
      secret
    }) => {
      const customer = await models.Customer.findByLogin(login);

      if (!customer) {
        throw new apollo_server__WEBPACK_IMPORTED_MODULE_2__["UserInputError"]('No customer found with this login credentials.');
      }

      const isValid = await customer.validatePassword(password);

      if (!isValid) {
        throw new apollo_server__WEBPACK_IMPORTED_MODULE_2__["AuthenticationError"]('Invalid password.');
      }

      return {
        token: createToken(customer, secret, '30m')
      };
    },
    updateCustomer: Object(graphql_resolvers__WEBPACK_IMPORTED_MODULE_1__["combineResolvers"])(_authorization__WEBPACK_IMPORTED_MODULE_3__["isAuthenticated"], async (parent, args, {
      models,
      me
    }) => {
      const customer = await models.Customer.findById(me.customer_id);
      return await customer.update({ ...args
      });
    }),
    deleteCustomer: Object(graphql_resolvers__WEBPACK_IMPORTED_MODULE_1__["combineResolvers"])(_authorization__WEBPACK_IMPORTED_MODULE_3__["isAuthenticated"], async (parent, {
      customer_id
    }, {
      models
    }) => await models.User.destroy({
      where: {
        customer_id
      }
    }))
  }
});

/***/ }),

/***/ "./src/resolvers/department.js":
/*!*************************************!*\
  !*** ./src/resolvers/department.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  Query: {
    departments: async (parent, args, {
      models
    }) => await models.Department.findAll(),
    department: async (parent, {
      department_id
    }, {
      models
    }) => {
      return await models.Department.findByPk(department_id);
    },
    getDepartmentByCategoryId: async (parent, {
      category_id
    }, {
      models
    }) => {
      const category = await models.Category.findByPk(category_id);
      return await category.getDepartment();
    }
  }
});

/***/ }),

/***/ "./src/resolvers/index.js":
/*!********************************!*\
  !*** ./src/resolvers/index.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var graphql_iso_date__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-iso-date */ "graphql-iso-date");
/* harmony import */ var graphql_iso_date__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_iso_date__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! merge-graphql-schemas */ "merge-graphql-schemas");
/* harmony import */ var merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _customer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./customer */ "./src/resolvers/customer.js");
/* harmony import */ var _shipping_region__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shipping_region */ "./src/resolvers/shipping_region.js");
/* harmony import */ var _attribute__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./attribute */ "./src/resolvers/attribute.js");
/* harmony import */ var _attribute_value__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./attribute_value */ "./src/resolvers/attribute_value.js");
/* harmony import */ var _department__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./department */ "./src/resolvers/department.js");
/* harmony import */ var _category__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./category */ "./src/resolvers/category.js");
/* harmony import */ var _product__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./product */ "./src/resolvers/product.js");
/* harmony import */ var _shipping__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./shipping */ "./src/resolvers/shipping.js");
/* harmony import */ var _review__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./review */ "./src/resolvers/review.js");
/* harmony import */ var _order__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./order */ "./src/resolvers/order.js");
/* harmony import */ var _tax__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./tax */ "./src/resolvers/tax.js");
/* harmony import */ var _order_detail__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./order_detail */ "./src/resolvers/order_detail.js");
/* harmony import */ var _shopping_cart__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./shopping_cart */ "./src/resolvers/shopping_cart.js");















const customScalarResolver = {
  Date: graphql_iso_date__WEBPACK_IMPORTED_MODULE_0__["GraphQLDateTime"]
};
const types = [customScalarResolver, _customer__WEBPACK_IMPORTED_MODULE_2__["default"], _shipping_region__WEBPACK_IMPORTED_MODULE_3__["default"], _attribute__WEBPACK_IMPORTED_MODULE_4__["default"], _attribute_value__WEBPACK_IMPORTED_MODULE_5__["default"], _department__WEBPACK_IMPORTED_MODULE_6__["default"], _category__WEBPACK_IMPORTED_MODULE_7__["default"], _product__WEBPACK_IMPORTED_MODULE_8__["default"], _shipping__WEBPACK_IMPORTED_MODULE_9__["default"], _review__WEBPACK_IMPORTED_MODULE_10__["default"], _order__WEBPACK_IMPORTED_MODULE_11__["default"], _tax__WEBPACK_IMPORTED_MODULE_12__["default"], _order_detail__WEBPACK_IMPORTED_MODULE_13__["default"], _shopping_cart__WEBPACK_IMPORTED_MODULE_14__["default"]];
/* harmony default export */ __webpack_exports__["default"] = (Object(merge_graphql_schemas__WEBPACK_IMPORTED_MODULE_1__["mergeResolvers"])(types));

/***/ }),

/***/ "./src/resolvers/order.js":
/*!********************************!*\
  !*** ./src/resolvers/order.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var graphql_resolvers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-resolvers */ "graphql-resolvers");
/* harmony import */ var graphql_resolvers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_resolvers__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _authorization__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authorization */ "./src/resolvers/authorization.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  Query: {
    getOrdersByCustomerId: async (parent, {
      customer_id
    }, {
      models
    }) => {
      const order = await models.Customer.findByPk(customer_id);
      if (!order) return null;
      return await order.getOrders();
    },
    getOrdersByShippingId: async (parent, {
      shipping_id
    }, {
      models
    }) => {
      const shipping = await models.Shipping.findByPk(shipping_id);
      if (!shipping) return null;
      return await shipping.getOrders();
    }
  },
  Mutation: {
    createOrder: Object(graphql_resolvers__WEBPACK_IMPORTED_MODULE_0__["combineResolvers"])(_authorization__WEBPACK_IMPORTED_MODULE_1__["isAuthenticated"], async (parent, {
      status = 0,
      ...args
    }, {
      models,
      me
    }) => {
      const {
        customer_id
      } = me;
      return await models.Order.create({ ...args,
        status,
        customer_id,
        created_on: new Date()
      });
    }),
    updateOrder: Object(graphql_resolvers__WEBPACK_IMPORTED_MODULE_0__["combineResolvers"])(_authorization__WEBPACK_IMPORTED_MODULE_1__["isAuthenticated"], async (parent, {
      created_on,
      order_id,
      status,
      ...args
    }, {
      models
    }) => {
      const order = await models.Order.findByPk(order_id);
      const s = status || order.status;
      return await order.update({ ...args,
        status: s
      });
    }),
    deleteOrder: Object(graphql_resolvers__WEBPACK_IMPORTED_MODULE_0__["combineResolvers"])(_authorization__WEBPACK_IMPORTED_MODULE_1__["isAuthenticated"], async (parent, {
      order_id
    }, {
      models,
      me
    }) => {
      const {
        customer_id
      } = me;
      return await models.Order.destroy({
        where: {
          customer_id,
          order_id
        }
      });
    })
  }
});

/***/ }),

/***/ "./src/resolvers/order_detail.js":
/*!***************************************!*\
  !*** ./src/resolvers/order_detail.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var graphql_resolvers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-resolvers */ "graphql-resolvers");
/* harmony import */ var graphql_resolvers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_resolvers__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _authorization__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authorization */ "./src/resolvers/authorization.js");
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! apollo-server */ "apollo-server");
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(apollo_server__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = ({
  Query: {
    getOrdersDetailByOrderId: Object(graphql_resolvers__WEBPACK_IMPORTED_MODULE_0__["combineResolvers"])(_authorization__WEBPACK_IMPORTED_MODULE_1__["isAuthenticated"], async (parent, {
      order_id
    }, {
      models,
      me
    }) => {
      return await models.OrderDetail.findAll({
        where: {
          order_id
        }
      });
    })
  },
  Mutation: {
    createOrderDetail: Object(graphql_resolvers__WEBPACK_IMPORTED_MODULE_0__["combineResolvers"])(_authorization__WEBPACK_IMPORTED_MODULE_1__["isAuthenticated"], async (parent, args, {
      models
    }) => {
      const {
        product_id
      } = args;
      const product = await models.Product.findByPk(product_id);

      if (!product) {
        throw new apollo_server__WEBPACK_IMPORTED_MODULE_2__["UserInputError"](`No product found with product_id ${product_id}.`);
      }

      const {
        name: product_name,
        price: unit_cost
      } = product;
      return await models.OrderDetail.create({ ...args,
        product_name,
        unit_cost
      });
    }),
    updateOrderDetail: Object(graphql_resolvers__WEBPACK_IMPORTED_MODULE_0__["combineResolvers"])(_authorization__WEBPACK_IMPORTED_MODULE_1__["isAuthenticated"], async (parent, {
      item_id,
      ...args
    }, {
      models
    }) => {
      const orderDetails = await models.OrderDetail.findByPk(item_id);

      if (!orderDetails) {
        throw new apollo_server__WEBPACK_IMPORTED_MODULE_2__["UserInputError"]('No order detais found.');
      }

      return await orderDetails.update({ ...args
      });
    }),
    deleteOrderDetail: Object(graphql_resolvers__WEBPACK_IMPORTED_MODULE_0__["combineResolvers"])(_authorization__WEBPACK_IMPORTED_MODULE_1__["isAuthenticated"], async (parent, {
      item_id
    }, {
      models
    }) => {
      return await models.OrderDetail.destroy({
        where: {
          item_id
        }
      });
    })
  }
});

/***/ }),

/***/ "./src/resolvers/product.js":
/*!**********************************!*\
  !*** ./src/resolvers/product.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  Query: {
    products: async (parent, args, {
      models
    }) => await models.Product.findAll(),
    product: async (parent, {
      product_id
    }, {
      models
    }) => {
      return await models.Product.findByPk(product_id);
    },
    getProductsByCategoryId: async (parent, {
      category_id
    }, {
      models
    }) => {
      const categoryProducts = (await models.ProductCategory.findAll({
        where: {
          category_id
        }
      })) || [];
      const productIds = categoryProducts.map(({
        product_id
      }) => product_id);
      return await models.Product.findAll({
        where: {
          product_id: productIds
        }
      });
    },
    getProductsByAttributeValueId: async (parent, {
      attribute_value_id
    }, {
      models
    }) => {
      const attributeValueProducts = (await models.ProductAttribute.findAll({
        where: {
          attribute_value_id
        }
      })) || [];
      const productIds = attributeValueProducts.map(({
        product_id
      }) => product_id);
      return await models.Product.findAll({
        where: {
          product_id: productIds
        }
      });
    }
  }
});

/***/ }),

/***/ "./src/resolvers/review.js":
/*!*********************************!*\
  !*** ./src/resolvers/review.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var graphql_resolvers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-resolvers */ "graphql-resolvers");
/* harmony import */ var graphql_resolvers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_resolvers__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _authorization__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authorization */ "./src/resolvers/authorization.js");
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! apollo-server */ "apollo-server");
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(apollo_server__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = ({
  Query: {
    review: async (parent, {
      review_id
    }, {
      models
    }) => {
      return await models.Review.findByPk(review_id);
    },
    getReviewsByProductId: async (parent, {
      product_id
    }, {
      models
    }) => {
      const product = await models.Product.findByPk(product_id);

      if (!product) {
        throw new apollo_server__WEBPACK_IMPORTED_MODULE_2__["UserInputError"]('No product found.');
      }

      return await product.getReviews();
    },
    getReviewsByCustomerId: async (parent, {
      customer_id
    }, {
      models
    }) => {
      const customer = await models.Customer.findByPk(customer_id);

      if (!customer) {
        throw new apollo_server__WEBPACK_IMPORTED_MODULE_2__["UserInputError"]('No customer found.');
      }

      return await customer.getReviews();
    }
  },
  Mutation: {
    createReview: Object(graphql_resolvers__WEBPACK_IMPORTED_MODULE_0__["combineResolvers"])(_authorization__WEBPACK_IMPORTED_MODULE_1__["isAuthenticated"], async (parent, args, {
      models,
      me
    }) => {
      const {
        customer_id
      } = me;
      return await models.Review.create({
        customer_id,
        created_on: new Date(),
        ...args
      });
    }),
    updateReview: Object(graphql_resolvers__WEBPACK_IMPORTED_MODULE_0__["combineResolvers"])(_authorization__WEBPACK_IMPORTED_MODULE_1__["isAuthenticated"], async (parent, {
      review_id,
      ...args
    }, {
      models
    }) => {
      const review = await models.Review.findByPk(review_id);

      if (!review) {
        throw new apollo_server__WEBPACK_IMPORTED_MODULE_2__["UserInputError"]('No review found.');
      }

      return await review.update({ ...args
      });
    }),
    deleteReview: Object(graphql_resolvers__WEBPACK_IMPORTED_MODULE_0__["combineResolvers"])(_authorization__WEBPACK_IMPORTED_MODULE_1__["isAuthenticated"], async (parent, {
      review_id
    }, {
      models,
      me
    }) => {
      const {
        customer_id
      } = me;
      return await models.Review.destroy({
        where: {
          customer_id,
          review_id
        }
      });
    })
  }
});

/***/ }),

/***/ "./src/resolvers/shipping.js":
/*!***********************************!*\
  !*** ./src/resolvers/shipping.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server */ "apollo-server");
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  Query: {
    shippings: async (parent, args, {
      models
    }) => await models.Shipping.findAll(),
    shipping: async (parent, {
      shipping_id
    }, {
      models
    }) => {
      return await models.Shipping.findByPk(shipping_id);
    },
    getShippingsByShippingRegionId: async (parent, {
      shipping_region_id
    }, {
      models
    }) => {
      const shippingRegion = await models.ShippingRegion.findByPk(shipping_region_id);

      if (!shippingRegion) {
        throw new apollo_server__WEBPACK_IMPORTED_MODULE_0__["UserInputError"]('No shipping region found.');
      }

      return await shippingRegion.getShippings();
    }
  }
});

/***/ }),

/***/ "./src/resolvers/shipping_region.js":
/*!******************************************!*\
  !*** ./src/resolvers/shipping_region.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server */ "apollo-server");
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  Query: {
    shippingRegions: async (parent, args, {
      models
    }) => await models.ShippingRegion.findAll(),
    shippingRegion: async (parent, {
      shipping_region_id
    }, {
      models
    }) => {
      return await models.ShippingRegion.findByPk(shipping_region_id);
    },
    getShippingRegionByCustomerId: async (parent, {
      customer_id
    }, {
      models
    }) => {
      const customer = await models.Customer.findByPk(customer_id);

      if (!customer) {
        throw new apollo_server__WEBPACK_IMPORTED_MODULE_0__["UserInputError"]('No customer found.');
      }

      return await customer.getShippingRegion();
    },
    getShippingRegionByShippingId: async (parent, {
      shipping_id
    }, {
      models
    }) => {
      const shipping = await models.Shipping.findByPk(shipping_id);

      if (!shipping) {
        throw new apollo_server__WEBPACK_IMPORTED_MODULE_0__["UserInputError"]('No shipping found.');
      }

      return await shipping.getShippingRegion();
    }
  }
});

/***/ }),

/***/ "./src/resolvers/shopping_cart.js":
/*!****************************************!*\
  !*** ./src/resolvers/shopping_cart.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var graphql_resolvers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-resolvers */ "graphql-resolvers");
/* harmony import */ var graphql_resolvers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_resolvers__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! apollo-server */ "apollo-server");
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(apollo_server__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _authorization__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./authorization */ "./src/resolvers/authorization.js");



/* harmony default export */ __webpack_exports__["default"] = ({
  Query: {
    getShoppingCart: async (parent, {
      product_id,
      cart_id
    }, {
      models
    }) => await models.ShoppingCart.findAll({
      where: {
        product_id,
        cart_id
      }
    })
  },
  Mutation: {
    createShoppingCart: Object(graphql_resolvers__WEBPACK_IMPORTED_MODULE_0__["combineResolvers"])(_authorization__WEBPACK_IMPORTED_MODULE_2__["isAuthenticated"], async (parent, args, {
      models,
      me
    }) => {
      const {
        customer_id
      } = me;
      return await models.ShoppingCart.create({ ...args,
        added_on: new Date()
      });
    }),
    updateShoppingCart: Object(graphql_resolvers__WEBPACK_IMPORTED_MODULE_0__["combineResolvers"])(_authorization__WEBPACK_IMPORTED_MODULE_2__["isAuthenticated"], async (parent, {
      cart_id,
      product_id,
      ...args
    }, {
      models
    }) => {
      const shoppingCart = (await models.ShoppingCart.findAll({
        limit: 1,
        where: {
          cart_id,
          product_id
        }
      })) || false;

      if (!shoppingCart) {
        throw new apollo_server__WEBPACK_IMPORTED_MODULE_1__["UserInputError"]('No shopping cart found.');
      }

      return await shoppingCart[0].update({ ...args
      });
    }),
    deleteShoppingCart: Object(graphql_resolvers__WEBPACK_IMPORTED_MODULE_0__["combineResolvers"])(_authorization__WEBPACK_IMPORTED_MODULE_2__["isAuthenticated"], async (parent, {
      cart_id,
      product_id
    }, {
      models
    }) => await models.ShoppingCart.destroy({
      where: {
        product_id,
        cart_id
      }
    }))
  }
});

/***/ }),

/***/ "./src/resolvers/tax.js":
/*!******************************!*\
  !*** ./src/resolvers/tax.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server */ "apollo-server");
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = ({
  Query: {
    taxes: async (parent, args, {
      models
    }) => await models.Tax.findAll(),
    tax: async (parent, {
      tax_id
    }, {
      models
    }) => {
      return await models.Tax.findByPk(tax_id);
    },
    getTaxByOrderId: async (parent, {
      order_id
    }, {
      models
    }) => {
      const order = await models.Order.findByPk(order_id);

      if (!order) {
        throw new apollo_server__WEBPACK_IMPORTED_MODULE_0__["UserInputError"]('No order found.');
      }

      return await order.getTax();
    }
  }
});

/***/ }),

/***/ "./src/schema/attribute.js":
/*!*********************************!*\
  !*** ./src/schema/attribute.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"]`
	extend type Query {
		attributes: [Attribute!]
		attribute(attribute_id: ID!): Attribute
	}

	type Attribute {
		attribute_id: ID!
		name: String!
	}
`);

/***/ }),

/***/ "./src/schema/attribute_value.js":
/*!***************************************!*\
  !*** ./src/schema/attribute_value.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"]`
	extend type Query {
		attribute_values: [AttributeValue!]
		attribute_value(attribute_value_id: ID!): AttributeValue
		getAttributeValuesByAttributeId(attribute_id: ID!): [AttributeValue]
		getAttributeValuesByProductId(product_id: ID!): [AttributeValue]
	}

	type AttributeValue {
		attribute_value_id: ID!
		attribute_id: ID!
		value: String!
	}
`);

/***/ }),

/***/ "./src/schema/category.js":
/*!********************************!*\
  !*** ./src/schema/category.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"]`
	extend type Query {
		categories: [Category!]
		category(category_id: ID!): Category
		getCategoriesByDeparmentId(department_id: ID!): [Category!]
		getCategoryByProductId(product_id: ID!): Category
	}

	type Category {
		category_id: ID!
		department_id: ID!
		name: String!
		description: String
	}
`);

/***/ }),

/***/ "./src/schema/customer.js":
/*!********************************!*\
  !*** ./src/schema/customer.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"]`
	extend type Query {
		customers: [Customer!]
		customer(customer_id: ID!): Customer
		me: Customer
	}

	extend type Mutation {
		signUp(name: String!, email: String!, password: String!): Token!
		signIn(login: String!, password: String!): Token!
		updateCustomer(
			name: String
			email: String
			password: String
			credit_card: String
			address_1: String
			address_2: String
			city: String
			region: String
			postal_code: String
			country: String
			day_phone: String
			eve_phone: String
			mob_phone: String
		): Customer!
		deleteCustomer(customer_id: ID!): Boolean!
	}

	type Token {
		token: String!
	}

	type Customer {
		customer_id: ID!
		name: String!
		email: String!
		password: String!
		credit_card: String
		address_1: String
		address_2: String
		city: String
		region: String
		postal_code: String
		country: String
		shipping_region_id: ID!
		day_phone: String
		eve_phone: String
		mob_phone: String
	}
`);

/***/ }),

/***/ "./src/schema/department.js":
/*!**********************************!*\
  !*** ./src/schema/department.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"]`
	extend type Query {
		departments: [Department!]
		department(department_id: ID!): Department
		getDepartmentByCategoryId(category_id: ID!): Department
	}

	type Department {
		department_id: ID!
		name: String!
		description: String
	}
`);

/***/ }),

/***/ "./src/schema/index.js":
/*!*****************************!*\
  !*** ./src/schema/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _customer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./customer */ "./src/schema/customer.js");
/* harmony import */ var _shipping_region__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shipping_region */ "./src/schema/shipping_region.js");
/* harmony import */ var _attribute__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./attribute */ "./src/schema/attribute.js");
/* harmony import */ var _attribute_value__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./attribute_value */ "./src/schema/attribute_value.js");
/* harmony import */ var _department__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./department */ "./src/schema/department.js");
/* harmony import */ var _product_category__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./product_category */ "./src/schema/product_category.js");
/* harmony import */ var _category__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./category */ "./src/schema/category.js");
/* harmony import */ var _product__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./product */ "./src/schema/product.js");
/* harmony import */ var _product_attribute__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./product_attribute */ "./src/schema/product_attribute.js");
/* harmony import */ var _shipping__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./shipping */ "./src/schema/shipping.js");
/* harmony import */ var _review__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./review */ "./src/schema/review.js");
/* harmony import */ var _order__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./order */ "./src/schema/order.js");
/* harmony import */ var _tax__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./tax */ "./src/schema/tax.js");
/* harmony import */ var _order_detail__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./order_detail */ "./src/schema/order_detail.js");
/* harmony import */ var _shopping_cart__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./shopping_cart */ "./src/schema/shopping_cart.js");
















const linkSchema = apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"]`
	scalar Date

	type Query {
		_: Boolean
	}

	type Mutation {
		_: Boolean
	}

	type Subscription {
		_: Boolean
	}
`;
/* harmony default export */ __webpack_exports__["default"] = ([linkSchema, _customer__WEBPACK_IMPORTED_MODULE_1__["default"], _shipping_region__WEBPACK_IMPORTED_MODULE_2__["default"], _attribute__WEBPACK_IMPORTED_MODULE_3__["default"], _attribute_value__WEBPACK_IMPORTED_MODULE_4__["default"], _department__WEBPACK_IMPORTED_MODULE_5__["default"], _product_category__WEBPACK_IMPORTED_MODULE_6__["default"], _category__WEBPACK_IMPORTED_MODULE_7__["default"], _product__WEBPACK_IMPORTED_MODULE_8__["default"], _product_attribute__WEBPACK_IMPORTED_MODULE_9__["default"], _shipping__WEBPACK_IMPORTED_MODULE_10__["default"], _review__WEBPACK_IMPORTED_MODULE_11__["default"], _order__WEBPACK_IMPORTED_MODULE_12__["default"], _tax__WEBPACK_IMPORTED_MODULE_13__["default"], _order_detail__WEBPACK_IMPORTED_MODULE_14__["default"], _shopping_cart__WEBPACK_IMPORTED_MODULE_15__["default"]]);

/***/ }),

/***/ "./src/schema/order.js":
/*!*****************************!*\
  !*** ./src/schema/order.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"]`
	extend type Query {
		getOrdersByCustomerId(customer_id: ID!): [Order]
		getOrdersByShippingId(shipping_id: ID!): [Order]
	}

	extend type Mutation {
		createOrder(
			total_amount: Float
			shipped_on: Date
			status: Int
			comments: String
			auth_code: String
			reference: String
			shipping_id: ID
			tax_id: ID
		): Order!
		updateOrder(
			order_id: ID!
			total_amount: Float
			shipped_on: Date
			status: Int
			comments: String
			auth_code: String
			reference: String
			shipping_id: ID
			tax_id: ID
		): Order!
		deleteOrder(order_id: ID!): Boolean!
	}

	type Order {
		order_id: ID!
		total_amount: Float
		created_on: Date!
		shipped_on: Date
		status: Int!
		comments: String
		customer_id: ID
		auth_code: String
		reference: String
		shipping_id: ID
		tax_id: ID
	}
`);

/***/ }),

/***/ "./src/schema/order_detail.js":
/*!************************************!*\
  !*** ./src/schema/order_detail.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"]`
	extend type Query {
		getOrdersDetailByOrderId(order_id: ID!): [OrderDetail]
	}

	extend type Mutation {
		createOrderDetail(order_id: ID!, product_id: ID!, attributes: String!, quantity: Int!): OrderDetail!
		updateOrderDetail(item_id: ID!, attributes: String, quantity: Int): OrderDetail!
		deleteOrderDetail(item_id: ID!): Boolean!
	}

	type OrderDetail {
		item_id: ID!
		order_id: ID!
		product_id: ID!
		attributes: String!
		product_name: String!
		quantity: Int!
		unit_cost: Float!
	}
`);

/***/ }),

/***/ "./src/schema/product.js":
/*!*******************************!*\
  !*** ./src/schema/product.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"]`
	extend type Query {
		products: [Product!]
		product(product_id: ID!): Product
		getProductsByCategoryId(category_id: ID!): [Product]
		getProductsByAttributeValueId(attribute_value_id: ID!): [Product]
	}

	type Product {
		product_id: ID!
		name: String!
		description: String!
		price: Float!
		discounted_price: Float!
		image: String
		image_2: String
		thumbnail: String
		display: Int!
	}
`);

/***/ }),

/***/ "./src/schema/product_attribute.js":
/*!*****************************************!*\
  !*** ./src/schema/product_attribute.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"]`
	type ProductAttribute {
		product_id: Int!
		attribute_value_id: Int!
	}
`);

/***/ }),

/***/ "./src/schema/product_category.js":
/*!****************************************!*\
  !*** ./src/schema/product_category.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"]`
	type ProductCategory {
		product_id: Int!
		category_id: Int!
	}
`);

/***/ }),

/***/ "./src/schema/review.js":
/*!******************************!*\
  !*** ./src/schema/review.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"]`
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
`);

/***/ }),

/***/ "./src/schema/shipping.js":
/*!********************************!*\
  !*** ./src/schema/shipping.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"]`
	extend type Query {
		shippings: [Shipping]
		shipping(shipping_id: ID!): Shipping
		getShippingsByShippingRegionId(shipping_region_id: ID!): [Shipping]
	}

	type Shipping {
		shipping_id: ID!
		shipping_type: String!
		shipping_cost: Float!
		shipping_region_id: ID!
	}
`);

/***/ }),

/***/ "./src/schema/shipping_region.js":
/*!***************************************!*\
  !*** ./src/schema/shipping_region.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"]`
	extend type Query {
		shippingRegions: [ShippingRegion!]
		shippingRegion(shipping_region_id: ID!): ShippingRegion
		getShippingRegionByCustomerId(customer_id: ID!): ShippingRegion
		getShippingRegionByShippingId(shipping_id: ID!): ShippingRegion
	}

	type ShippingRegion {
		shipping_region_id: ID!
		shipping_region: String!
	}
`);

/***/ }),

/***/ "./src/schema/shopping_cart.js":
/*!*************************************!*\
  !*** ./src/schema/shopping_cart.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"]`
	extend type Query {
		getShoppingCart(product_id: ID!, cart_id: String!): ShoppingCart
	}

	extend type Mutation {
		createShoppingCart(
			product_id: ID!
			cart_id: String!
			attributes: String!
			quantity: Int!
			buy_now: Int
		): ShoppingCart
		updateShoppingCart(
			cart_id: String!
			product_id: ID!
			attributes: String
			quantity: Int
			buy_now: Int
		): ShoppingCart
		deleteShoppingCart(cart_id: ID!, product_id: ID!): Boolean!
	}

	type ShoppingCart {
		item_id: ID!
		cart_id: String!
		product_id: ID!
		attributes: String!
		quantity: Int!
		buy_now: Int!
		added_on: Date!
	}
`);

/***/ }),

/***/ "./src/schema/tax.js":
/*!***************************!*\
  !*** ./src/schema/tax.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (apollo_server_express__WEBPACK_IMPORTED_MODULE_0__["gql"]`
	extend type Query {
		taxes: [Tax!]
		tax(tax_id: ID!): Tax!
		getTaxByOrderId(order_id: ID!): Tax
	}

	type Tax {
		tax_id: ID!
		tax_type: String!
		tax_percentage: Float!
	}
`);

/***/ }),

/***/ "./utils.js":
/*!******************!*\
  !*** ./utils.js ***!
  \******************/
/*! exports provided: getMe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMe", function() { return getMe; });
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src_config_env__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/config/env */ "./src/config/env.js");



const getMe = async req => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default.a.verify(token, _src_config_env__WEBPACK_IMPORTED_MODULE_2__["default"].SECRET);
    } catch (e) {
      throw new apollo_server_express__WEBPACK_IMPORTED_MODULE_1__["AuthenticationError"]('Your session expired. Sign in again.');
    }
  }
};

/***/ }),

/***/ "apollo-server":
/*!********************************!*\
  !*** external "apollo-server" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server");

/***/ }),

/***/ "apollo-server-express":
/*!****************************************!*\
  !*** external "apollo-server-express" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server-express");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "dataloader":
/*!*****************************!*\
  !*** external "dataloader" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dataloader");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "graphql-iso-date":
/*!***********************************!*\
  !*** external "graphql-iso-date" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-iso-date");

/***/ }),

/***/ "graphql-playground-middleware-express":
/*!********************************************************!*\
  !*** external "graphql-playground-middleware-express" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-playground-middleware-express");

/***/ }),

/***/ "graphql-resolvers":
/*!************************************!*\
  !*** external "graphql-resolvers" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-resolvers");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "merge-graphql-schemas":
/*!****************************************!*\
  !*** external "merge-graphql-schemas" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("merge-graphql-schemas");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),

/***/ "serverless-http":
/*!**********************************!*\
  !*** external "serverless-http" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("serverless-http");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map