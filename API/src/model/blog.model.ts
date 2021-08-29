import MySQL from '../config/connection';
import { UploadController } from '../controller/upload.controller';
import { UploadModel } from './upload.model';
import { DataI, ResponseI } from './../interface/data.interface'


const MODEL = new UploadController;
const UPLOAD = new UploadModel;



export class BlogModel{

	static Query = '';
    static inserts =[''];
    static result:any = '';
    static aux: any = '';
    static cont = 0;


	    // Menú + Contenido
    static async post(req:any, res:ResponseI){
        try{

            let page = Number(req.query.page);
            let limit = Number(req.query.limit);
            let _page = page*limit-limit

            // const startIndex = (page - 1)*limit;
            // const endIndex = page * limit;

            this.Query = `SELECT * FROM post`;
            this.result = await MySQL.executeQuery(this.Query); 
            let cont = 0
            for(let _ in this.result ) cont = cont + 1;


            this.Query = `
            SELECT * FROM post 
            LIMIT ${limit} OFFSET ${_page}`;


            this.result = await MySQL.executeQuery(this.Query); 
            let post = this.result


            this.Query = `SELECT * FROM images`;
            this.result = await MySQL.executeQuery(this.Query);
            let images: any = new Array(this.result.length-1);

            for(let _ in post){
                this.Query = `SELECT images_id FROM post_images WHERE post_id = '${post[_].id}'`;
                this.result = await MySQL.executeQuery(this.Query);


                for(let __ in this.result){
                    this.Query = `SELECT id,image FROM images WHERE id = '${this.result[__].images_id}'`;
                    this.aux = await MySQL.executeQuery(this.Query);
                    //Insertando el dato
                    images[this.cont-1] =  { post_id: post[_].id, id: this.aux[0].id, image: this.aux[0].image};

                    this.cont = this.cont + 1


                }


            }


            return res.status(200).json({
                ok:true,
                page,
                totalItems: cont,
                post,
                post_images:images
            });
                
            
            
        }catch(error){
            return res.status(400).json({
                    ok:false,
                    message: 'Something goes wrong!'
                });
        }
    }

        // Producto especifico
    static async Byid(id:string,res:any){

        try{
            this.Query = "SELECT * FROM `post` WHERE id='"+id+"'";
            this.result = await MySQL.executeQuery(this.Query); 
            let _post:any = this.result;

            if(this.result.length>0){

                let post:any = this.result;

                this.Query = `SELECT * FROM images`;
                this.result = await MySQL.executeQuery(this.Query);
                

                this.Query = `SELECT images_id FROM post_images WHERE post_id = '${post[0].id}'`;
                this.result = await MySQL.executeQuery(this.Query);
                let images: any = new Array(this.result.length);

                for(let _ in this.result){
                    this.Query = `SELECT id,image FROM images WHERE id = '${this.result[_].images_id}'`;
                    this.aux = await MySQL.executeQuery(this.Query);
                    //Insertando el dato
                    images[this.cont] =  { post_id: post[0].id, id: this.aux[0].id, image: this.aux[0].image};
                    this.cont = this.cont + 1

                }

                return res.status(200).json({
                    ok:true,
                    post:_post,
                    images: images
                });
            }else{
                return res.status(404).json({
                    ok:false,
                    message: 'Product not found!'
                });
            }
        }catch(error){
             return res.status(400).json({
                    ok:false,
                    message: 'Something goes wrong!'
                });
        }
    }


    //===================
    //       ADMIN      |
    //===================


    static async createPost(req:any,res:any){

        this.Query =`
            INSERT INTO 
            post(users_id, title, content) 
            VALUES (?,?,?)`;

        this.inserts = [`${req.params.ID}`,`${req.body.title}`,`${req.body.content}`];
        this.Query = MySQL.instance.cnn.format(this.Query,this.inserts);
        this.result = await MySQL.executeQuery(this.Query); 

        this.Query = `SELECT id FROM post WHERE id = '${this.result.insertId}'`;
        this.result= await MySQL.executeQuery(this.Query); 

        const post_id:string = this.result[0].id;


        if(req.files){
        	if(req.files.files.length){
	            for(let __ in req.files.files){
	                await MODEL.load(req,res,'post',post_id,req.files.files[__]);

		            }
	         }else{   

	            await MODEL.load(req,res,'post',post_id,req.files.files);

	        }
        }

        return  res.status(200)
                .json( {
                    ok:true,
                    message:'Datos guardados correctamente'
                });
    }

    static async updatePost(req:any,res:any){
        //await ProductModel.updateProduct(req.body,req.params.id,req.params.name,res,req);
        //public async updateProduct(body:any,id:any,name:string,res:any,req:any){

        var body = req.body;
        var id = req.params.id;

        try {


            var i = 0;
            for (var value in body) {
                this.inserts[i] = '';
                this.inserts[i] += value;
                i++;
                this.inserts[i] = '';
                this.inserts[i] += body[value];
                i++;
            }
            this.Query =` UPDATE post SET users_id='${req.params.ID}'`;
            for (let i =1 ; i<=Object.keys(body).length;i++){
                this.Query +=',??=?';
            }

            this.Query += ` WHERE id = '${id}'`; 
            this.Query = MySQL.instance.cnn.format(this.Query,this.inserts);
            await MySQL.executeQuery(this.Query);


            if(req.files){
                if(req.files.files.length){
                    for(let __ in req.files.files){
                        await MODEL.load(req,res,'post',id,req.files.files[__]);

                    }
                }else{   

                    await MODEL.load(req,res,'post',id,req.files.files);

                }
            }


            return  res.status(200).json( {
                        ok:true,
                        message:'Datos actualizados correctamente'
                    });

        } catch (error) {
            return  res.status(400)
                    .json( {
                        ok:false,
                        message:'Something goes wrong!'
                    });
        }
    }

    static async deletePost(id:string,res:any){
        try {

            //Seleccionando todas las imagenes
            this.Query = `SELECT images_id FROM post_images WHERE post_id = '${id}'`;
            this.result = await MySQL.executeQuery(this.Query); 
            let images_id:any =this.result


            //Borrando imagenes de la tabla images!
            for(let _ in images_id){
                this.Query = `SELECT image FROM images WHERE id = '${images_id[_].images_id}'`;
                this.result = await MySQL.executeQuery(this.Query); 
                UPLOAD.borraArchivo(this.result[0].image,'post');
                this.Query = `DELETE FROM images WHERE id = '${images_id[_].images_id}'`;
                await MySQL.executeQuery(this.Query); 

            }

            this.Query = `DELETE FROM post WHERE id = '${id}'`;
            await MySQL.executeQuery(this.Query);

            return res.status(200)
            .json( {
                ok:true,
                message:'Datos eliminados correctamente'
            });
        } catch (error) {
            return  res.status(400)
                    .json( {
                        ok:false,
                        message:'Something goes wrong!'
                    });
        }
    }
}