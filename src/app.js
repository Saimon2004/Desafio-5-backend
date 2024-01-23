import express from "express"
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import viewRouter from "./routes/views.router.js"
import { Server } from "socket.io"

const app = express()

const httpServer = app.listen(8080, () => {
    console.log(`se inicio el servidor`)
})

const socketServer = new Server(httpServer)

app.use(express.urlencoded({ extended: true }))

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

app.use(express.static(__dirname + "/public"));

app.use("/socket", viewRouter)

export const productos = []


socketServer.on("connection", (socket) => {
    console.log("Cliente conectado")


    socket.on("anadir_producto", data => {

        productos.push({ id: productos.length + 1, name: data.inputName, price: data.inputPrice, stock: data.inputStock })

        socketServer.emit('producto_anadido', productos)
    })

    socket.emit('producto_anadido', productos)


    socket.on("eliminar_producto", (productoId) => {

        console.log(`Producto a eliminar con ID: ${productoId}`);

        productos.splice(productoId - 1, 1)


        productos.forEach((producto, index) => {
            producto.id = index + 1;
        });

        socketServer.emit("filtrado", productos)
    })

})