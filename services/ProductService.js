const MongooseService = require("./MongooseService");
const ProductModel = require("../models/Product");
const asyncHandler = require("../middlewares/asyncService");
/**
 * @description Create an instance of ProductService with basic CRUD services
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
  /**
   * Get all products
   */
  get() {
    const results = asyncHandler(this.MongooseServiceInstance.find());
    return results;
  }
  
  /**
   * @param  {} chipset
   *return results
   */
  getBy(chipset) {
    const results = asyncHandler(this.MongooseServiceInstance.find({chipset: chipset}));
    console.log(results);
    return results;
  }
  /**
   * @param  {} product
   * update exisiting product in DB
   * @return success value and result
   */
  update(id, product) {
    const result = asyncHandler(
      this.MongooseServiceInstance.update(id, product)
    );
    return result;
  }
  /**
   * @param  {} id
   * return Product with given id
   */
  find(id) {
    const result = asyncHandler(this.MongooseServiceInstance.findById(id));
    return result;
  }
  /**
   * @param  {} id
   * Delete Product with given id
   */
  delete(id) {
    const result = asyncHandler(this.MongooseServiceInstance.delete(id));
    return result;
  }
}
module.exports = ProductService;
