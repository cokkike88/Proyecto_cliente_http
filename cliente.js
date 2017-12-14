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

    //  METODO DE AUTENTICACION HTTP BASIC
    autenticarBasic(user, pass){
        this.basicAuth = new Buffer(user + ":" + pass).toString("base64");
    }

    // PROCESAR HEADERS PARA MANTENER SESION -> SE REALIZA EN LA PETICION
    // REQUEST
    procesarHeaders(req){
        var headers = {
            "Accept": "*/*",
            "User-Agent": "Cliente Node.js"
        };
        if (this.basicAuth != undefined){
            headers.Authorization = "Basic " + this.basicAuth;
        }
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

        this.request(opciones, null, callback);
    }

    post(uri, data, callback){
        var opciones = {
                hostname: this.host,
                port: this.puerto,
                method: 'POST',
                path: this.protocolo + "://" + this.host + uri, // https://api.github.com/jorgevgut
                headers: this.procesarHeaders()            
        }
        
        this.request(opciones, callback);        
    }

    // REQUEST (MANEJO DE PETICIONES)
    request(opciones, data, callback){
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

        if (data != undefined && data != null){
            peticion.write(JSON.stringify(data));
        }

        peticion.end();
    }

}

module.exports = Cliente;