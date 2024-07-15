import express from "express"
import { Router } from "express"
import ProductManager from "../dao/db/product-manager-db.js"
import CartManager from "../dao/db/cart-manager-db.js"

const router = express.Router()
const productManager = new ProductManager()
const cartManager = new CartManager()

router.get("/", async (req, res) => {
    const products = await productManager.getProducts()
    res.render("home", {products})
})

/* router.get("/products", async (req, res) => {
    const { page = 1, limit = 10, sort = "asc", query } = req.query
    const products = await productManager.getProducts({
        page: parseInt(page),
        limit: parseInt(limit),
        sort: sort,
        query
    })
    try {
        const listProducts = await ProductManager.paginate({ page, limit, sort, query})

        let newArrayProducts = listProducts.docs.map(product => {
            const { _id, ...rest } = product.toObject()
            return rest
        })

        res.render("products", {
            products: newArrayProducts,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            currentPage: products.page,
            totalPages: products.totalPages,
        })
    } catch (error) {
        res.status(500).json({ error: "Error al cargar los productos", error })
    }
}) */

router.get("/realtimeproducts", async (req, res) => {
    try {
        const products = await productManager.getProducts()
        res.render("realtimeproducts", { products })
    } catch (error) {
        res.status(500).json({ error: "Error al cargar los productos", error })
    }
})


export default router

