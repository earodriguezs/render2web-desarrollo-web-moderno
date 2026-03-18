/**
 * @author Eric Adalberto Rodríguez Sánchez <eazicomservicios@gmail.com>
 * Todos los derechos reservados.
 */

import App from "../app.js";
import Enviroment from "../modules/core/enviroment.config.js";
import ROUTERS from "../routers/router.js";

/**
 * @description Contiene la referencia al objeto del servidor de aplicaciones.
 * @type {App}
 */
const APP: App = new App();
APP.addRouters( ROUTERS );

APP.start( Enviroment.domain, Enviroment.port );
