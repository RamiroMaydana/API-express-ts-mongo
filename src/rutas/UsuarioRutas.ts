import { Request, Response, NextFunction, Router} from 'express';
import Usuario from '../modelos/Usuario';

class UserRouter {
    router: Router;

    constructor(){
        this.router = Router();
        this.routes();

    }
    async obtenerUsuarios(req: Request, res: Response){
        const usuarios = await Usuario.find();
        res.json(usuarios);
    }
    async obtenerUsuario(req: Request, res: Response){
        //const usuario = await Usuario.findById(req.params.id).populate('posts');
        const usuario = await Usuario.findById(req.params.id);
        res.json(usuario);
    }

    async crearUsuario(req: Request, res: Response){
        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();
        res.json({ status: 200, nuevoUsuario});
    }

    async actualizarUsuario(req: Request, res: Response){
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndUpdate(id, req.body, {new:
        true } );        
        res.json(usuario);
    }

    async eliminarUsuario(req: Request, res: Response){
        const { id } = req.params;
        const usuario=await Usuario.findByIdAndRemove(id);
        res.json(usuario);
    }

    routes(){
        this.router.get('/', this.obtenerUsuarios);
        this.router.get('/:id', this.obtenerUsuario);
        this.router.post('/', this.crearUsuario);
        this.router.put('/:id', this.actualizarUsuario);
        this.router.delete('/:id', this.eliminarUsuario);
    }
}
const userRouter = new UserRouter();
export default userRouter.router;

