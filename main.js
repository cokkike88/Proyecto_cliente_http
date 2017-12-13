var Cliente = require("./cliente");
var clienteGitHub = new Cliente("api.github.com", "443", "https");

console.log(clienteGitHub);

clienteGitHub.get("/users/jorgevgut", (respuesta) => {
    console.log(respuesta);
});