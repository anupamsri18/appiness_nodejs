var mongoose = require("mongoose");

var Products_Schemas = new mongoose.Schema(
  {
    name: String,
    category: String
  },
  { collection: "products" }
);
const products_model = mongoose.model("products", Products_Schemas);

var Categories_Schemas = new mongoose.Schema(
  {
    name: String,
  
  },
  { collection: "categories" }
);

const categories_model = mongoose.model("categories", Categories_Schemas);

module.exports = {
  products_model,
  categories_model
};
