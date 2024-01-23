const socket = io();

const nameInput = document.getElementById('nameInput');
const priceInput = document.getElementById('priceInput');
const stockInput = document.getElementById('stockInput');

const sendProductButton = document.getElementById('sendProductButton')
const productContainer = document.getElementById('productContainer')


sendProductButton.addEventListener('click', () => {
    const inputName = nameInput.value;
    const inputPrice = priceInput.value
    const inputStock = stockInput.value

    socket.emit('anadir_producto', { inputName, inputPrice, inputStock });

    nameInput.value = '';
    priceInput.value = ''
    stockInput.value = ''
})

socket.on("producto_anadido", (productos) => {

    const productoAnadidoHtml = productos.map((el) => {

        return `<div>
            <h1>id: ${el.id}</h1>
            <h1>Producto: ${el.name}</h1>
            <h1>Precio: ${el.price}</h1>
            <h1>Stock: ${el.stock}</h1>
            <button class="boton" data-id="${el.id}">Eliminar producto</button>
        </div>`
    })

    productContainer.innerHTML = productoAnadidoHtml.join('')

    const botones = document.querySelectorAll(".boton")

    botones.forEach((boton) =>
        boton.addEventListener("click", (event) => {

            const productoId = event.target.dataset.id

            socket.emit("eliminar_producto", parseInt(productoId));

        })
    )
})


socket.on("filtrado", (productos) => {

    const nuevosProductos = productos.map((el) => {
        return `<div>
          <h1>id: ${el.id}</h1>
          <h1>nombre: ${el.name}</h1>
          <h1>Precio: ${el.price}</h1>
          <h1>Stock: ${el.stock}</h1>
          <button class="boton" data-product-id="${el.id}">Eliminar producto</button>
        </div>`;
    });

    productContainer.innerHTML = nuevosProductos.join("");

    const botones = document.querySelectorAll(".boton")

    botones.forEach((boton) =>
        boton.addEventListener("click", (event) => {

            const productoId = event.target.dataset.id

            socket.emit("eliminar_producto", parseInt(productoId));

        })
    )
})
