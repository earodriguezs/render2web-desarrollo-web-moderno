/**
 * @author Eric Adalberto Rodríguez Sánchez <eazicomservicios@gmail.com>
 * Todos los derechos reservados.
 */

import WebApp from "../app.js";
import { WEB_CONFIG } from "../modules/core/web.config.js";
import ROUTERS from "../routers/router.js";

/**
 * @description Contiene la referencia al objeto del servidor de aplicaciones.
 * @type {WebApp}
 */
const WEB_APP: WebApp = new WebApp( ROUTERS );
WEB_APP.start( WEB_CONFIG );
