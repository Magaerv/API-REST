import fs from "fs";


export default class ProductManager {

  constructor (path) {
    this.path = path,
      this.products = []
  }

  getProducts = async (limit) => {
    try {
      if (fs.existsSync(this.path)) {

        const productList = await fs.promises.readFile(this.path, "utf-8");
        const productListParse = JSON.parse(productList);
        if (limit) {
          const productListLimits = productListParse.slice(0, parseInt(limit))
          return productListLimits
        } else {
          return productListParse
        }
      } else {
        return [];
      }
    } catch (error) {
      console.log("Error al obtener los productos:", error);
      throw error
    }
  }

  generateId = async () => {
    try {
      const counter = this.products.length
      if (counter === 0) {
        return 1
      }
      else {
        return (this.products[counter - 1].id) + 1
      }
    } catch (error) {
      console.log("Error al generar un nuevo ID:", error);
      throw error
    }
  }

  addProduct = async (obj) => {
    const { title, description, price, thumbnail, category, status = true, code, stock } = obj
    if (!title || !description || !price || !thumbnail || !category || !status || !code || !stock) {
      console.error("Ingrese todos los campos del producto")
      return;
    }
    else {
      const productList = await this.getProducts({});
      const filterProduct = this.products.find(e => e.code == code);
      if (filterProduct) {
        console.error("El código del producto que desea agregar ya existe.")
        return;
      } else {
        const id = await this.generateId();
        const newProduct = {
          id,
          title,
          description,
          price,
          thumbnail,
          category,
          status,
          code,
          stock,
        };
        productList.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(productList, null, 2))
      }
    }
  }

  getProductById = async (id) => {
    try {
      const allProducts = await this.getProducts();
      const productById = allProducts.find(e => e.id === id)
      return productById
    } catch (error) {
      console.log("Error al obtener el producto:", error);
      throw error
    }
  }

  updateProduct = async (objparams, objbody) => {
    const { id } = objparams;
    const { title, description, price, thumbnail, category, status = true, code, stock } = objbody;

    if (title === undefined || description === undefined || price === undefined || thumbnail === undefined || category === undefined || status === undefined || code === undefined || stock === undefined) {
      console.error("Ingrese todos los datos del producto para su actualización")
      return;
    } else {
      const productList = await this.getProducts({});
      const repetedCode = productList.find(e => e.code == code)
      if (!repetedCode) {
        console.error("El código del producto que desea actualizar ya existe.")
        return;
      } else {
        const currentProductsList = await this.getProducts({})
        const newProductsList = currentProductsList.map(e => {
          if (e.id === parseInt(id)) {
            const updateProduct = {
              ...e,
              title,
              description,
              price,
              thumbnail,
              category,
              status,
              code,
              stock,
            }
            return updateProduct
          }
          else {
            return e
          }
        })
        await fs.promises.writeFile(this.path, JSON.stringify(newProductsList, null, 2))
      }
    }
    }

  deleteProduct = async (objparams) => {
    const { id } = objparams;
    try {
      const allProducts = await this.getProducts({});
      const deleteProduct = allProducts.filter(e => e.id !== parseInt(id));
      await fs.promises.writeFile(this.path, JSON.stringify(deleteProduct, null, 2))
    } catch (error) {
      console.log("Error al eliminar el producto:", error);
      throw error
    }
  }
}

