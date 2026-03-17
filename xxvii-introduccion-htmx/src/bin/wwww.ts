/**
 * Desarrollo Web moderno con HTML5, CSS3 y JavaScript 2026.
 * Sección 27: Introducción completa a HTMX.
 * @author Eric Adalberto Rodríguez Sánchez <eazicomservicios@gmail.com>
 * @license MIT
 */

import Enviroment from '../config/env.config.js';
import Server from '../server.js';

const SERVER = new Server();
SERVER.addRoutes( [] );
SERVER.start( Enviroment.serverConfig );
