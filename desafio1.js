class ProductManager {
    constructor() {
        this.products = [];
    }

    // Métodos
    addProduct(product){
        //Confirmar que producto no está en el array
        if(productManager.products.some(el => el.code === product.code)){
            return console.log("El producto ya se encuentra en el array.")
        }else{
        //Asignar Id
        product.id = productManager.products.length+1
        //Agregar producto
        return productManager.products.push(product)
        }
    }
    static getProducts(){
        return console.log(productManager.products)
    }
    static getProductById(id){
        const element = productManager.products.find(el => el.id === id)
        if(element){
            return console.log(element)
        }else{
            return console.log("El elemento no existe.")
        }
    }
}

const productManager = new ProductManager()



class Product {
    constructor (title, description, price, thumbnail, code, stock){
        this.title = title,
        this.description = description,
        this.price = price,
        this.thumbnail = thumbnail,
        this.code = code,
        this.stock = stock
    }
}

// fn: ficción, in: infantil
const product1 = new Product("Lord of the Rings", "Paperback", 7000, "No Image", "fn01", 10)
const product2 = new Product("Before the Coffee Gets Cold", "Paperback", 3250, "No Image", "fn02", 20)
const product3 = new Product("The Wizard of Oz", "Paperback", 7500, "No Image", "fn03", 15)
const product4 = new Product("Santa Post", "Paperback", 6500, "No Image", "in01", 8)
const product5 = new Product("The Tiger Who Came to Tea", "Paperback", 2700, "No Image", "in01", 18)


//Confirmar array vacío
console.log(ProductManager.getProducts())

//Añadir productos
productManager.addProduct(product1)
productManager.addProduct(product2)
productManager.addProduct(product3)
productManager.addProduct(product4)
productManager.addProduct(product5)

//Confirmar array de productos
console.log(ProductManager.getProducts())

//Comprobar que no se puede agregar el mismo producto dos veces
productManager.addProduct(product5)

//Buscar un producto por id = no existe
ProductManager.getProductById(6)
//Buscar un producto por id = existe
ProductManager.getProductById(1)