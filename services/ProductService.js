const MongooseService = require("./MongooseService");
const ProductModel = require("../models/Product");
const asyncHandler = require("../middlewares/asyncService");
/**
 * @description Create an instance of ProductService
 */
class ProductService {
  /**
   * Create instance of Data Access Layer using Product Model.
   */
  constructor() {
    this.MongooseServiceInstance = new MongooseService(ProductModel);
  }
  /**
   * @param  {} product
   * create product and insert into DB.
   * @return success value and result
   */
  create(product) {
    const result = asyncHandler(this.MongooseServiceInstance.create(product));
    return result;
  }

  get() {
    const results = asyncHandler(this.MongooseServiceInstance.find());
    return results;
  }
}
module.exports = ProductService;
