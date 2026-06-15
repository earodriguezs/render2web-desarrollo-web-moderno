import compression from "compression";
import type { Application, Router } from "express";
import Express from "express";
import { engine } from "express-handlebars";
import Path from "path";
import { Enviroment, WebConfig } from './modules/core/web.config.js';

/**
 * Provee las funciones necesarias para configurar e iniciar el
 * servidor de Express.
 */
export default class WebApp {
    /**
     * Instancia a la aplicación de {@link Express}.
     */
    private app: Application = Express();

    /**
     * Crea una nueva instancia de la clase {@link WebApp}.
     * @param {Array<Router>} modules - EL arreglo de rutas para la aplicación.
     * @returns {WebApp} Una nueva instancia de la clase {@link WebApp}.
     */
    constructor(modules: Array<Router>) {
        this.config(modules);
    }

    /**
     * Realiza la configuración del servidor.
     */
    private config = (modules: Array<Router>): void => {
        const DIRNAME: string = import.meta.dirname.replace("\\dist", "");
        this.app.engine(
            "handlebars",
            engine({
                defaultLayout: "main",
                extname: ".handlebars",
                layoutsDir: Path.join(DIRNAME, "/views/layouts/"),
                partialsDir: Path.join(DIRNAME, "/views/partials/"),
            }),
        );
        this.app.set("view engine", "handlebars");
        this.app.set("views", Path.join(DIRNAME, "/views/"));

        this.app.use(compression());
        this.app.use(Express.json());

        this.app.use("/", Express.static("./public/"));
        this.app.use(
            "/css",
            Express.static("./node_modules/bootstrap/dist/css/"),
        );
        this.app.use(
            "/js",
            Express.static("./node_modules/bootstrap/dist/js/"),
        );
        this.app.use("/js", Express.static("./node_modules/htmx.org/dist/"));

        this.addRouters(modules);
    };

    /**
     * Agrega la configuración de rutas para un recurso especificado.
     * @param {Router} routers
     * @returns {void} Este método no retorna ningún valor.
     */
    private addRouters = (routers: Array<Router>): void => {
        if (routers.length > 0)
            routers.forEach((router: Router) => this.app.use(router));
    };

    /**
     * Inicia el servidor de Express en el puerto especificado.
     * @param {number} port Puerto en el que se iniciará el servidor.
     * @param {string} domain Dominio o dirección IP en la que se iniciará el servidor.
     * @returns {void} Este método no retorna ningún valor.
     */
    public start = ( config: WebConfig ): void => {

        this.app.listen( config.port, config.domain,

            ( error: Error | undefined ): void => {
                let message: string = "";
                if ( error ) {
                    message = `Error al iniciar el servidor: ${error.message}`;
                } else if ( config.enviroment === Enviroment.development ) {
                    message =
                        `Servidor de desarrollo en línea: ` +
                        `http://${config.domain}` +
                        `${config.port !== 80 ? `:${config.port}` : "" }/`;
                } else {
                    message = "Servidor en línea...";
                }
                console.clear();
                console.log( message );
            } );
    };
}
