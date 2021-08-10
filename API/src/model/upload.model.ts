import MySQL from '../config/connection';
import fs  from "fs";
import path from "path";


export class UploadModel{
    private Query = '';

    public async img(id:string,res:any,name:string,tipe:string,err?:Error){

        if (err) {
            this.borraArchivo(name, tipe);

            return res.status(500).json({
                ok: false,
                err
            });
        }

        let ban = await this.find(id,tipe);
       if(!(ban)){
            this.borraArchivo(name, tipe);

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No existe'
                }
            });
       }

       if(ban){

            let nameViejo =  await this.findName(tipe,id);
            if(nameViejo === ''){
                await this.save(id,tipe,name,res);
            }else{
                this.borraArchivo(nameViejo, tipe);
                await this.save(id,tipe,name,res);
            }

       }

      
    }


    public async find(id:string,tipe:string){
        
        this.Query = `SELECT id FROM ${tipe} WHERE id = '${id}';`
        let result:any = await MySQL.executeQuery(this.Query);
        try {
            if(result[0].constructor.name === 'RowDataPacket' ){
        
                return true;
            }
        } catch (error) {
           
            return false;

        }
      
    }

    public async save(id:string,tipe:string, name:string,res:any){
        try {
            this.Query = `UPDATE ${tipe} SET image='${name}' WHERE id = '${id}';`;
            await MySQL.executeQuery(this.Query);

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
            this.Query = `SELECT image FROM ${tipe} WHERE id = ${id}`;
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

}