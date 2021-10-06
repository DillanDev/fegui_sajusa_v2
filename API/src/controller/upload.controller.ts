import { Request,Response } from "express";
import { UploadModel } from "../model/upload.model";


const MODEL = new UploadModel;

export class UploadController{


    public async load(req:Request, res:Response,tipo:string,id:string, archivo:any){

        // let tipo = req.params.tipo;
        // let id = req.params.id;
    
        if (!req.files) return res.status(400).json({ok: false, message: 'No se ha seleccionado ningún archivo' });

        // Valida tipo
        let tiposValidos = ['products', 'post'];
        if (tiposValidos.indexOf(tipo) < 0) return res.status(400).json({ ok: false, emessage: 'Los tipos permitidas son ' + tiposValidos.join(', ')});
        

        let nombreCortado = archivo.name.split('.');
        let extension = nombreCortado[nombreCortado.length - 1];
    
        // Extensiones permitidas
        let extensionesValidas = ['png', 'jpg', 'jpeg'];
    
        if (extensionesValidas.indexOf(extension) < 0) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Las extensiones permitidas son ' + extensionesValidas.join(', '),
                    ext: extension
                }
            })
        }

        // Cambiar nombre al archivo
        // 183912kuasidauso-123.jpg
        let nombreArchivo = `${ id }-${ new Date().getMilliseconds()  }.${ extension }`;


        archivo.mv(`uploads/${ tipo }/${ nombreArchivo }`, (err:Error) => {

            if (err)
                return res.status(500).json({
                    ok: false,
                    message: err
                });

            // Aqui, imagen cargada
            if (tipo === 'post') {
                MODEL.img(id,res,nombreArchivo,tipo);
            } else if (tipo === 'products') {
                MODEL.img(id,res,nombreArchivo,tipo);
            } 

        });

    }

    
    public async show(req:Request, res:Response){

        try {

            await MODEL.show(req,res);

        } catch (error) {
            res.status(500).json({
                ok:false,
                message:"Error calling function"
            });
        }    
    }


    public async delete(req:Request, res:Response){

        try {

            await MODEL.delete(req,res);

        } catch (error) {
            res.status(500).json({
                ok:false,
                message:"Error calling function"
            });
        }    

    }
}