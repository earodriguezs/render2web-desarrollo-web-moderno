import compression from "compression";
import type { Application, Router } from "express";
import Express from "express";
import { engine } from "express-handlebars";
import Path from "path";

/**
 * Provee las funciones necesarias para configurar e iniciar el
 * servidor de Express.
 */
export default class App {
    /**
     * Instancia a la aplicación de {@link Express}.
     */
    private app: Application = Express();

    /**
     * @description Crea una nueva instancia de la clase {@link App}.
     */
    constructor() {
        this.config();
    }

    /**
     * Realiza la configuración del servidor.
     */
    private config = (): void => {
        const DIRNAME: string = import.meta.dirname.replace( '\\dist', '' );
        this.app.engine(
            "handlebars",
            engine( {
                defaultLayout: "main",
                extname: ".handlebars",
                layoutsDir: Path.join( DIRNAME, '/views/layouts/' ),
                partialsDir: Path.join( DIRNAME, "/views/partials/" ),
            } ),
        );
        this.app.set( "view engine", "handlebars" );
        this.app.set( "views", Path.join( DIRNAME, "/views/" ) );

        this.app.use( compression() );
        this.app.use( Express.json() );

        this.app.use( "/", Express.static( "./public/" ) );
        this.app.use( "/css", Express.static( "./node_modules/bootstrap/dist/css/" ) );
        this.app.use( "/js", Express.static( "./node_modules/bootstrap/dist/js/" ) );
    };

    /**
     * Agrega la configuración de rutas para un recurso especificado.
     * @param {Router} routers
     */
    public addRouters( routers: Array<Router> ): void {
        routers.forEach( ( router: Router ) => this.app.use( router ) );
    }

    /**
     * Inicia el servidor de Express en el puerto especificado.
     * @param {number} port Puerto en el que se iniciará el servidor.
     * @returns {void} Este método no retorna ningún valor.
     */
    public start( domain: string, port: number ): void {
        this.app.listen( port, domain, ( error: Error | undefined ): void => {
            let message: string = "";
            if ( error ) {
                message = `Error al iniciar el servidor: ${error.message}`;
            } else if ( "localhost" === domain ||
                "127.0.0.1" === domain ||
                "::1" === domain ||
                domain.startsWith( "192.168." ) ) {
                message = `Servidor local en línea: `
                    + `http://${domain}${port !== 80 ? `:${port}` : ''}/`;
            } else {
                message = "Servidor en línea, en espera de solicitudes...";
            }
            console.clear();
            console.log( message );
        } );
    }
}
