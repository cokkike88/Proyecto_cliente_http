//  CLIENTE HTTP/HTTPS

class Cliente {

    constructor(host, puerto, protocolo){
        this.host = host;
        this.puerto = puerto;
        this.protocolo = protocolo;
        if (protocolo != "http" && protocolo != "https"){
            console.log("ERROR!!!!!");
        }
    }

    // PROCESAR HEADERS PARA MANTENER SESION -> SE REALIZA EN LA PETICION
    // REQUEST
    procesarHeaders(req){
        var headers = {
            "Accept": "*/*",
            "User-Agent": "Cliente Node.js",
        };
        return headers;
    }

    // REALIZAR PETICIONES HTTP TIPO GET (PARA OBTENER INFORMACION)
    get(uri, callback){
        var opciones = {
            hostname: this.host,
            port: this.puerto,
            method: 'GET',
            path: this.protocolo + "://" + this.host + uri, // https://api.github.com/jorgevgut
            headers: this.procesarHeaders()
        };

        this.request(opciones, callback);
    }

    post(uri, data){

    }

    // REQUEST (MANEJO DE PETICIONES)
    request(opciones, callback){
        // HTTP O HTTPS
        var http = require(this.protocolo); 
        var respuesta = {
            status: null,
            body: "",
            headers: null
        };
        var peticion = http.request(opciones, (canalRespuesta) => {
            canalRespuesta.on('data', (chunk) =>{
                respuesta.body += chunk;
            });
            canalRespuesta.on('end', () => {
                respuesta.status = canalRespuesta.statusCode;
                respuesta.headers = canalRespuesta.headers;
                callback(respuesta);
            });
        });
        peticion.end();
    }

}

module.exports = Cliente;