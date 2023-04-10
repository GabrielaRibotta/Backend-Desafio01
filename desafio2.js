import {promises as fs} from 'fs'

const TXT_PATH = './info.txt'

class ProductManager {
    constructor(path) {
        this.path = path
        this.products = []
    }

    // Métodos
    async addProduct(product){
        //Confirmar que producto no está en el array
        if(this.products.some(el => el.code === product.code)){
            console.log("El producto ya se encuentra en el array.")
        }else{
        //Agregar producto
            this.products.push(product)
        //Escribir txt
        await fs.writeFile(this.path, JSON.stringify(this.products))
        }
    }
    async getProducts(){
        //Leer txt
        const data = await fs.readFile(this.path, 'utf-8')
        //Parse
        const productsJSON = JSON.parse(data)
        console.log(productsJSON)
    }
    async getProductById(id){
        //Leer txt
        const data = await fs.readFile(this.path, 'utf-8')
        //Parse
        const productsJSON = JSON.parse(data)
        //Buscar producto por Id
        const element = productsJSON.find(el => el.id === id)
        if(element){
            return console.log(element)
        }else{
            console.log("El elemento no existe.")
        }
    }

    async updateProduct(id, newStock){
        //Leer txt
        const data = await fs.readFile(this.path, 'utf-8')
        //Parse
        const productsJSON = JSON.parse(data)
        const element = productsJSON.find(el => el.id === id)
        if(element){
            const index = productsJSON.map(productToUpdate => {
                return productToUpdate.id
            }).indexOf(id)
            productsJSON[index].stock = newStock
            //Escribir txt
            return await fs.writeFile(this.path, JSON.stringify(productsJSON))
        }else{
            return "El elemento no existe."
        }
    }

    async deleteProduct(id){
        //Leer txt
        const data = await fs.readFile(this.path, 'utf-8')
        //Parse
        const productsJSON = JSON.parse(data)
        const element = productsJSON.find(el => el.id === id)
        if(element){
            const index = productsJSON.map(productToDelete => {
                return productToDelete.id
            }).indexOf(id)
            productsJSON.splice(index, 1)
            //Escribir txt
            return await fs.writeFile(this.path, JSON.stringify(productsJSON))
        }else{
            return "El elemento no existe."
        }
    }
}

//-----------------------

class Product {
    constructor (title = "", description = "", price = 0, thumbnail = "", code = "", stock = 0){
        this.title = title,
        this.description = description,
        this.price = price,
        this.thumbnail = thumbnail,
        this.code = code,
        this.stock = stock
        this.id = Product.incrementID()
    }

    static incrementID(){
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }
}

// fn: ficción, in: infantil
const product1 = new Product("Lord of the Rings", "Paperback", 7000, "No Image", "fn01", 10)
const product2 = new Product("Before the Coffee Gets Cold", "Paperback", 3250, "No Image", "fn02", 20)
const product3 = new Product("The Wizard of Oz", "Paperback", 7500, "No Image", "fn03", 15)
const product4 = new Product("Santa Post", "Paperback", 6500, "No Image", "in01", 8)
const product5 = new Product("The Tiger Who Came to Tea", "Paperback", 2700, "No Image", "in01", 18)
const product6 = new Product()


//Crear Product Manager

const productManager = new ProductManager(TXT_PATH)

//-------------------


//Consultar array
await productManager.getProducts()
//Agregar productos
await productManager.addProduct(product1)
await productManager.addProduct(product2)
await productManager.addProduct(product3)
await productManager.addProduct(product6)

//Buscar producto por Id
await productManager.getProductById(1)
await productManager.getProductById(7)

//Actualizar datos de producto
await productManager.updateProduct(3, 20)

//Borrar producto
await productManager.deleteProduct(6)
