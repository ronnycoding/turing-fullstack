``
query {
  customers {
    customer_id
    name
    email
    shipping_region_id
  }
}

query {
  shippingRegions {
    shipping_region_id
    shipping_region
  }
}

query {
  getShippingRegionByCustomerId(customer_id: 1) {
    shipping_region_id
    shipping_region
  }
}

query {
  attributes {
    attribute_id
    name
  }
}

query {
  attribute_values {
    attribute_id
    attribute_value_id
    value
  }
}

query {
  getAttributeValuesByAttributeId(attribute_id: 1) {
    value
  }
}

query {
  departments {
    department_id
    name
    description
  }
}

query {
  categories {
    category_id
    department_id
    name
    description
  }
}

query {
  department(department_id: "2") {
    name
    description
  }
}

query {
  getCategoriesByDeparmentId(department_id: "1") {
    category_id
    name
    description
  }
}

query {
  getDepartmentByCategoryId(category_id: "2") {
    department_id
    name
    description
  }
}

query {
  products {
    product_id
    name
    description
  }
}

query {
  product(product_id: 1) {
    name
    description
    price
    discounted_price
  }
}

query {
  getProductsByCategoryId(category_id: 1) {
    product_id
    name
  }
}

query {
  getCategoryByProductId(product_id: 1) {
    category_id
    name
    description
  }
}

query {
  getAttributeValuesByProductId(product_id: "1") {
    value
    attribute_id
  }
}

query {
  getProductsByAttributeValueId(attribute_value_id: 1) {
    name
    thumbnail
    image
    image_2
    description
    price
    discounted_price
    display
  }
}

query {
  getShippingsByShippingRegionId(shipping_region_id: "2") {
    shipping_id
    shipping_type
    shipping_cost
    shipping_region_id
  }
}

query {
  getShippingRegionByShippingId(shipping_id: "6") {
    shipping_region
    shipping_region_id
  }
}

query {
  getReviewsByProductId(product_id: 1) {
    review
    rating
    created_on
    customer_id
  }
}

query {
  getReviewsByCustomerId(customer_id: 1) {
    review
    rating
    created_on
    customer_id
  }
}


mutation {
  createReview(
    product_id: "1"
    rating: 4
    review: "beautifull t-shirt!!"
  ) {
    review_id
    rating
    review
  }
}

mutation {
  createReview(
    product_id: "1"
    rating: 4
    review: "beautifull t-shirt!!"
  ) {
    review_id
    rating
    review
  }
}

mutation {
  updateReview(
    review_id: 1
    rating: 5
  ) {
    rating
    review
  }
}

mutation {
  deleteReview(review_id: 2)
}

query {
  getOrdersByCustomerId(customer_id: 1) {
    status
    auth_code
    tax_id
    created_on
    total_amount
  }
}

query {
  getOrdersByShippingId(shipping_id: 1) {
    order_id
    comments
    status
    auth_code
    tax_id
    created_on
    total_amount
  }
}

query {
  me {
    name
  }
}

query {
  getTaxByOrderId(order_id: 1) {
    tax_id
    tax_type
    tax_percentage
  }
}

query {
  getOrdersByCustomerId(customer_id: 1) {
    comments
    order_id
  }
}

mutation {
  createOrder(commets: "my first order") {
    order_id
    customer_id
  }
}

mutation {
  updateOrder(order_id: 1, comments: "my first order updated!", shipping_id: 1, tax_id: 2) {
    comments
    order_id
    created_on
    auth_code
    shipping_id
    tax_id
  }
}

mutation {
  deleteOrder(order_id: 1)
}

query {
  getOrdersDetailByOrderId(order_id: 2) {
    product_id
    attributes
    quantity
    product_name
    order_id
    item_id
  }
}

mutation {
  createOrderDetail(
    order_id: 2
    quantity: 1
    product_id: 1
    attributes: "size M"
  ) {
    product_name
    unit_cost
    quantity
  }
}

mutation {
  updateOrderDetail(
    item_id: 1
    attributes: "size XXL"
  ) {
    product_id
    product_name
    quantity
    attributes
  }
}

mutation {
  deleteOrderDetail(item_id: 1)
}

mutation {
  createShoppingCart(
    product_id: 1
    attributes: "size M"
    quantity: 1
    cart_id: "123456789012345678901234567890"
  ) {
    cart_id
    product_id
    attributes
    added_on
  }
}

mutation {
  updateShoppingCart(
    cart_id: "123456789012345678901234567890"
    product_id: 1
    quantity: 3
  ) {
    cart_id
    product_id
    quantity
  }
}

mutation {
  deleteShoppingCart(
    product_id: 1
    cart_id: "123456789012345678901234567890"
  )
}

mutation {
  signUp(
    name: "Ronny"
    email: "test@test.dev"
    password: "admin123"
  ) {
    token
  }
}

mutation {
  signIn(
    login: "test@test.dev"
    password: "admin123"
  ) {
    token
  }
}
``