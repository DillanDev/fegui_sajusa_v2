import MySQL from '../config/connection';
import fs  from "fs";
import path from "path";


export class UploadModel{
    private Query = '';
    result:any = [''];

    public async img(id:string,res:any,name:string,tipe:string){


       // let ban = await this.find(id,tipe);
       // if(!(ban)){
       //      this.borraArchivo(name, tipe);

       //      return res.status(400).json({
       //          ok: false, message: 'Not exist!'
            
       //      });
       // }

       // if(ban){

        let nameViejo =  await this.findName(tipe,id);
        if(nameViejo === ''){
            await this.save(id,tipe,name,res);
        }else{
            this.borraArchivo(nameViejo, tipe);
            await this.save(id,tipe,name,res);
        }

       // }
    }


    // public async find(id:string,tipe:string){
        
    //     this.Query = `SELECT id FROM ${tipe}_images WHERE ${tipe}_id = '${id}';`
    //     let result:any = await MySQL.executeQuery(this.Query);
    //     try {
    //         if(result[0].constructor.name === 'RowDataPacket' ){
        
    //             return true;
    //         }
    //     } catch (error) {
           
    //         return false;

    //     }
    // }

    public async save(id:string,tipe:string, name:string,res:any){
        try {
            this.Query = `INSERT INTO images(image) VALUES ('${name}')`;
            this.result = await MySQL.executeQuery(this.Query);
            this.Query = `INSERT INTO ${tipe}_images ( ${tipe}_id, images_id) VALUES ('${id}','${this.result.insertId}')`;
            this.result = await MySQL.executeQuery(this.Query);
            return true;
                        
        } catch (error) {
            return res.status(500).json({
                ok: false,
                message: 'Error'
            });
        }
    }

    public async findName(tipe:string,id:string){
        try {
            this.Query = `SELECT images_id FROM ${tipe}_images WHERE ${tipe}_id='${id}'`;
            this.result = await MySQL.executeQuery(this.Query);
            this.Query = `SELECT image FROM images WHERE id = ${this.result[0].images_id}`;
            let result:any = await MySQL.executeQuery(this.Query);

            return result[0].image;
        } catch (error) {
            return '';
        } 
    }

    public borraArchivo(nombreImagen:string, tipo:string) {

        let pathImagen = path.resolve(__dirname, `../../uploads/${ tipo }/${ nombreImagen }`);
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }
    }

    public async show(req:any, res:any){
        let tipo = req.params.tipe;
        let img = req.params.img;

        let pathImagen = path.resolve(__dirname,`../../uploads/${tipo}/${img}`);

        if(fs.existsSync(pathImagen)){
            res.sendFile(pathImagen);
        }else{
            let noImagePath = path.resolve(__dirname,`../../uploads/no_image.jpg `)
            res.sendFile(noImagePath);
        }
    }


    public async delete(req:any,res:any){

        let tipe = req.params.tipe;
        let name = req.params.img;

        

        this.Query = `DELETE FROM images WHERE image = "${name}"`;
        let result: any = await MySQL.executeQuery(this.Query); 
        this.borraArchivo(name, tipe);

        if(result.constructor.name === 'OkPacket'){
            return res.status(200).json({
                ok:true,
                message: 'Image delete!'
            });
        }


        

    }


}