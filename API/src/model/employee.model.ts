import MySQL from '../config/connection';
import bcrypt from "bcrypt";
import { UploadController } from '../controller/upload.controller';
import { UploadModel } from './upload.model';


const MODEL = new UploadController;
const UPLOAD = new UploadModel;
export class EmployeeModel{
    private Query = '';
    private inserts =[''];

    public async employees(res:any){
        try {
            this.Query = `SELECT * FROM employees WHERE status='actived'`;
            let result:any = await MySQL.executeQuery(this.Query); 
            let obj:any = [];
            let i:number = 0;
            for(var value of result){
                delete value.password;
                obj[i] = value;
                i++;
            }

            return res.status(200).json({ok:true,employees:obj});

        } catch (error) {
            return res.status(404).json({ok:false,error});
            
        }
       

    }

    public async employee(id:string,res:any){
        try {
            this.Query  = `SELECT * FROM employees WHERE id='${id}' AND status = 'actived';`;
            let result:any = await MySQL.executeQuery(this.Query); 
            delete result[0].password;
            return res.status(200).json({ok:true,employee:result[0]});
        } catch (error) {
            return res.status(404).json({ok:false,error});
        }
        
    }

    public async update(id:string,body:any,res:any){
        try {   
            var i = 0;

            let escapeID = MySQL.instance.cnn.escape(id);

            for (var value in body) {
                this.inserts[i] = '';
                this.inserts[i] += value;
                i++;
                this.inserts[i] = '';
                this.inserts[i] += body[value];
                i++;
            }

            this.Query = `UPDATE employees SET ??=?`
            for (let i =1 ; i<=Object.keys(body).length-1;i++){
                this.Query +=',??=?';
            }
            this.Query += ` WHERE id = ${escapeID} AND status = 'actived' `;
            this.Query = MySQL.instance.cnn.format(this.Query,this.inserts);
            var result:any;
                await MySQL.executeQuery(this.Query).then(()=>{ 
                    if(body.password) delete body.password;
                    result = body; 
                });

            return res.status(200).json({ok:true,employee:result});
        } catch (error) {
            return res.status(404).json({ok:false,error});

        }
    }

    public async delete(id:string,res:any){

        try {
            let escapeID = MySQL.instance.cnn.escape(id);
            this.Query = `
            UPDATE employees 
            SET status='disabled' 
            WHERE id = ${escapeID}`;
            let result:any = await MySQL.executeQuery(this.Query);
            if(result.constructor.name === 'OkPacket'){
                return res.status(200).json({ok:true});
            }
        } catch (error) {
            return res.status(404).json({ok:false,error});

        }
        
    
    }


    /*POST*/

    //public post
    public async posts(res:any){
        try {
            this.Query = 'SELECT `id`, `employees_id`, `image`, `title`, `shortDesc`, `comment_count`, `like_count`, `createdAt`, `updateAt` FROM `post` ';
            
            let result:any = await MySQL.executeQuery(this.Query); 
            let obj:any = [];
            let i:number = 0;
            for(var value of result){
                delete value.password;
                obj[i] = value;
                i++;
            }

            return res.status(200).json({ok:true,posts:obj});

        } catch (error) {
            return res.status(404).json({ok:false,error});
            
        }
       

    }

    public async post(id:string,res:any){
        try {
            this.Query  = 'SELECT `id`, `employees_id`, `image`, `title`, `content`, `comment_count`, `like_count`, `createdAt`, `updateAt` FROM `post` WHERE id='+id+'';
            let result:any = await MySQL.executeQuery(this.Query); 
            delete result[0].password;
            return res.status(200).json({ok:true,post:result[0]});
        } catch (error) {
            return res.status(404).json({ok:false,error});
        }
        
    }

    //para los admins
    public async createPost(ID:string,body:any,res:any,req:any){


        try {

            this.Query =`
            INSERT INTO 
            post(employees_id, title, shortDesc, content) 
            VALUES (?,?,?,?)`;
            this.inserts = [`${ID}`,`${body.title}`,`${body.shortDesc}`,`${body.content}`];
            this.Query = MySQL.instance.cnn.format(this.Query,this.inserts);
            let result:any = await MySQL.executeQuery(this.Query); 
            this.Query = "SELECT * FROM `post` WHERE employees_id = '"+ID+"'";
            result = await MySQL.executeQuery(this.Query); 
            if(req.files!==null){
                await MODEL.load(req,res,'post',result[result.length-1].id);

            }


            return  res.status(200)
                    .json( {
                        ok:true,
                        message:'Datos guardados correctamente'
                    });

        } catch (error) {
            return res.status(404).json({ok:false,error});
            
        }
        
    }

    public async updatePost(body:any,id:any,res:any,req:any){
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


            this.Query = `UPDATE post SET id=${id}`
            for (let i =1 ; i<=Object.keys(body).length;i++){

                this.Query +=',??=?';
            }
            this.Query += ` WHERE id = ${id}`; 
            this.Query = MySQL.instance.cnn.format(this.Query,this.inserts);
            await MySQL.executeQuery(this.Query);
            if(req.files!==null){
                await MODEL.load(req,res,'post',id);
            }


            return  res.status(200)
                    .json( {
                        ok:true,
                        message:'Datos actualizados correctamente'
                    });
            // result = await MySQL.executeQuery(this.Query); 
        } catch (error) {
            return  res.status(404)
                    .json( {
                        ok:true,
                        error
                    });
        }
        
    }

    public async deletePost(id:string,res:any){
        try {

            this.Query = `SELECT  image FROM post WHERE id = '${id}'`;
            let result:any = await MySQL.executeQuery(this.Query);    

            this.Query = `DELETE FROM post WHERE id = '${id}'`;
            await MySQL.executeQuery(this.Query);


            UPLOAD.borraArchivo(result[0].image,'post');
            return res.status(200)
            .json( {
                ok:true,
                message:'Datos eliminados correctamente'
            });
        } catch (error) {
            return  res.status(404)
                    .json( {
                        ok:false,
                        error
                    });
        }
        
    
    }

    
    public async comments(id:string,res:any){
        try {
            this.Query  = 'SELECT id, author, content, createdAt, updateAt FROM comments WHERE post_id='+id+'';
            let result:any = await MySQL.executeQuery(this.Query); 
            

            return res.status(200).json({ok:true,comments:result});
        } catch (error) {
            return res.status(404).json({ok:false,error});
        }
    }

    public async createComment(ID:string,id:string,res:any,body:any){
        try {

            this.Query  = 'SELECT name FROM employees WHERE id='+ID+'';
            let result:any = await MySQL.executeQuery(this.Query); 

            this.Query  = 'INSERT INTO comments(post_id, author, content) VALUES ('+id+',"'+result[0].name+'","'+body.content+'")';
            await MySQL.executeQuery(this.Query); 
        
            this.Query  = 'SELECT id, author, content, createdAt, updateAt FROM comments WHERE post_id='+id+'';
            result = await MySQL.executeQuery(this.Query); 
            
            this.Query = 'UPDATE post SET comment_count='+(result.length)+' WHERE id='+id+'';
            await MySQL.executeQuery(this.Query); 

            return res.status(200).json({ok:true,message:'Actualizado correctamente'});
        } catch (error) {
            return res.status(404).json({ok:false,error});
        }
    }

    public async updateComment(id:string,body:any,res:any){
        try {   
            var i = 0;

            let escapeID = MySQL.instance.cnn.escape(id);

            for (var value in body) {
                this.inserts[i] = '';
                this.inserts[i] += value;
                i++;
                this.inserts[i] = '';
                this.inserts[i] += body[value];
                i++;
            }

            this.Query = `UPDATE comments SET id=${escapeID}`
            for (let i =1 ; i<=Object.keys(body).length;i++){
                this.Query +=',??=?';
            }
            this.Query += ` WHERE id = ${escapeID}`;
            this.Query = MySQL.instance.cnn.format(this.Query,this.inserts);
            let result:any = await MySQL.executeQuery(this.Query); 

            if(result.constructor.name === 'OkPacket'){

                return res.status(200).json({ok:true,message:'Se actualizo correctamente'});
            }

        } catch (error) {
            return res.status(404).json({ok:false,error});
        }
    }

    public async deleteComment(ID:string,id:string,res:any){
        try {
            
            this.Query  = 'SELECT id, author, content, createdAt, updateAt FROM comments WHERE post_id='+ID+'';
            let result:any = await MySQL.executeQuery(this.Query); 
            
            this.Query = 'UPDATE post SET comment_count='+(result.length-1)+' WHERE id='+ID+'';
            await MySQL.executeQuery(this.Query);

            this.Query  = 'DELETE FROM comments WHERE id='+id+'';
            await MySQL.executeQuery(this.Query); 


            return res.status(200).json({ok:true,message:'Eliminado correctamente'});
        } catch (error) {
            return res.status(404).json({ok:false,error});
        }
    }
}