import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

import usuarioRutas from './rutas/UsuarioRutas';

class Server{
    public app: express.Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    public config(): void{
        const MONGO_URI = 'mongodb://localhost/data-base';
        mongoose.set('useFindAndModify', false);
        mongoose.connect(MONGO_URI || process.env.MONGO_URL,{
            useNewUrlParser: true,
            useCreateIndex: true
        }).then(db=>{console.log('MongoDB esta conectado')});
        this.app.set('port', process.env.PORT || 3000);

        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }

    public routes(): void{
        const router: express.Router = express.Router();
        this.app.use('/api-node/usuarios', usuarioRutas);
    }

    public start(): void{
        this.app.listen(this.app.get('port'), ()=>{
               console.log('Server escuchando en el puerto', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();