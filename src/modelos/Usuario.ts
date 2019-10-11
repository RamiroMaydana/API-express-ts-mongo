import {Schema, model} from 'mongoose';

const UsuarioSchema = new Schema({
nombre:{ type: String, required: true},
email: { type: String, required: true, unique: true},
password: {type: String, required: true },
login:{type: String, required: true, lowercase: true},
createdAt: {type: Date, default: Date.now()}
})

export default model('Usuario', UsuarioSchema);



