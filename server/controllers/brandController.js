const { Brand } = require("../models/models");
const ApiError = require("../error/ApiError");
class BrandController {
  async create(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.json(brand);
  }
  async getAll(req, res) {
    const token = req.headers.authorization.split(" ")[1];
    const brand = await Brand.findAll();
    return res.json(brand);
  }
}

module.exports=new BrandController()
