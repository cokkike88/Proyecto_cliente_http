var Cliente = require("./cliente");
var clienteGitHub = new Cliente("api.github.com", "443", "https");

console.log(clienteGitHub);

clienteGitHub.autenticarBasic("cokkike88", "enrique8");

clienteGitHub.get("/users/cokkike88", (respuesta) => {
    console.log(respuesta);
});

// clienteGitHub.post("/repos/jorgevgut/uuid/issues/2/comments", {
//     "body": "esta es una prueba"
// }, (respuesta) => console.log(respuesta));