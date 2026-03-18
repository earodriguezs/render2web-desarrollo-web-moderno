/**
 * @author Eric Adalberto Rodríguez Sánchez <eazicomservicios@gmail.com>
 * Todos los derechos reservados.
 */

import WebApp from "../app.js";
import Enviroment from "../modules/core/enviroment.config.js";
import ROUTERS from "../routers/router.js";

/**
 * @description Contiene la referencia al objeto del servidor de aplicaciones.
 * @type {WebApp}
 */
const WEB_APP: WebApp = new WebApp( ROUTERS );
WEB_APP.start( Enviroment.domain, Enviroment.port );
