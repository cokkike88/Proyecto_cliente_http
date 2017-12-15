var Cliente = require("./cliente");
var clienteGitHub = new Cliente("api.github.com", "443", "https");

console.log(clienteGitHub);

clienteGitHub.autenticarBasic("cokkike88", "enrique8");

// clienteGitHub.get("/users/cokkike88", (respuesta) => {
//     console.log(respuesta);
// });

clienteGitHub.post("/cokkike88/Proyecto_cliente_http/issue_comments", {
    "body": "esta es una prueba"
}, (respuesta) => console.log(respuesta));