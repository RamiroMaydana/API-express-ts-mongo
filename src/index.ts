// express framework de node
import express from 'express';
//Mongoose libreria para conectar a la base de datos de Mongo
import mongoose from 'mongoose';
//Morgan funcion para dar formato de salida
import morgan from 'morgan';
//Helmet te ayuda a proteger tus aplicaciones Express configurando varios encabezados HTTP.
import helmet from 'helmet';
// Compression  El middleware intentará comprimir los cuerpos de respuesta para todas las solicitudes que atraviesen el middleware
import compression from 'compression';
import cors from 'cors';

// rutas para el crud
import usuarioRutas from './rutas/UsuarioRutas';

class Server{
    public app: express.Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    public config(): void{
        // MONGO_URI servidor de localizacion de bd 
        // data-base -> nombre de la base de datos
        const MONGO_URI = 'mongodb://localhost/data-base';
        mongoose.set('useFindAndModify', false);
        // connect -> conexion a base de datos
        mongoose.connect(MONGO_URI || process.env.MONGO_URL,{
            // parsear mediante URL
            useNewUrlParser: true,
            // indice automatico en la db
            useCreateIndex: true
        }).then(db=>{console.log('MongoDB esta conectado')});
        this.app.set('port', process.env.PORT || 3000);
        
        // habilitar los middleware
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }

    public routes(): void{
        // rutas de express
        const router: express.Router = express.Router();
        // rutas especificadas en la carpeta rutas/UsuarioRutas.ts
        this.app.use('/api-node/usuarios', usuarioRutas);
    }

    public start(): void{
        // habilitar servidor
        this.app.listen(this.app.get('port'), ()=>{
               console.log('Server escuchando en el puerto', this.app.get('port'));
        });
    }
}
// instanciar la clase Server
const server = new Server();
// Iniciar el servidor
server.start();
