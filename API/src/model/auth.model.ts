import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import MySQL from '../config/connection';
import {transporter} from '../config/mailer';
import { UploadController } from '../controller/upload.controller';
import { UploadModel } from './upload.model';
import key from "../config/key-users";


export class AuthModel{

    static Query = '';
    static inserts =[''];

    static async login(data:any,res:any){

         const {email,password} = data;

         this.Query = `SELECT status FROM users WHERE email = '${email}'`;
         var rows:any =await MySQL.executeQuery(this.Query);
         if(rows[0].status==='disabled') return res.status(404).json({ok:false,message:'User disabled!'})


         this.Query = `SELECT * FROM users WHERE email = '${email}' AND status = 'active'`;
         rows =await MySQL.executeQuery(this.Query);



         if(!rows[0]){

            return  res.status(406).json({
                        ok:false,
                        message: 'Email or password invalid'
                     });
         }

         this.Query = `SELECT password FROM users WHERE email = '${email}' AND status = 'active'`;
         rows =  await MySQL.executeQuery(this.Query);
         const pass_hash = bcrypt.compareSync(password,rows[0].password);


         if(pass_hash==false){

            return res.status(406).json({
                        ok:false,
                        message: 'Email or password invalid'
                     });

         }else if(pass_hash == true){
            this.Query = `SELECT * FROM users WHERE email = '${email}' AND status = 'active'`;
            rows =await MySQL.executeQuery(this.Query);

            if(rows[0].role == 'admin'){

                const token = jwt.sign({userId:rows[0].id,username:rows[0].name,role:rows[0].role},key.jwtSecret,{expiresIn: '1h'});
                return res.status(200).json({
                        ok:true,
                        id: rows[0].id,
                        token
                     });

            }else if(rows[0].role == 'client'){
                const token = jwt.sign({userId:rows[0].id,username:rows[0].name,role:rows[0].role},key.jwtSecret);
                return res.status(200).json({
                        ok:true,
                        id: rows[0].id,
                        token
                     });
            }


        }

    }


    static async register(data:any,res:any){


        try {

             this.Query = `SELECT status FROM users WHERE email = '${data.email}'`;
             var rows:any =await MySQL.executeQuery(this.Query);

            if(rows[0]){
                if(rows[0].status==='disabled'){
                    return res.status(404).json({ok:false,message:'User disabled!'})
                }

             }
             

             if(!await AuthModel.valEmail(data)){
                return res.status(406).json({
                        ok:false,
                        message: 'Email exist!'
                    });
             }


             if(!await AuthModel.valTel(data)){
                return res.status(406).json({
                        ok:false,
                        message: 'Telephone exist!'
                    });
             }

            if(data.role){
                if(!(data.role == 'admin' || data.role == 'client' )){
                     return res.status(406).json({
                            ok:false,
                            message: 'Error in role!'
                        });
                }
            }
            
            //Creando una dirección
            this.Query = `INSERT INTO 

            address(
            calle, 
            country, 
            state, 
            city, 
            zip) 

            VALUES (?,?,?,?,?)`;

            
            this.inserts  = [
            `${data.calle}`,
            `${data.country}`,
            `${data.state}`,
            `${data.city}`,
            `${data.zip}`];


            this.Query = MySQL.instance.cnn.format(this.Query,this.inserts );
            rows = await MySQL.executeQuery(this.Query);

            data.password = await bcrypt.hash(data.password,10);
            this.Query =`
            INSERT INTO

            users(
            name, 
            surname, 
            gender, 
            email,
            telephone, 
            password, 
            role)

            VALUES (?,?,?,?,?,?,?)`;

            var role 
            if(!data.role){
                role = 'client';
                data.role = role;
            }else{
                role = data.role
            }


            this.inserts  = [
            `${data.name}`,
            `${data.surname}`,
            `${data.gender}`,
            `${data.email}`,
            `${data.telephone}`,
            `${data.password}`,
            `${data.role}`];



            this.Query = MySQL.instance.cnn.format(this.Query,this.inserts );
            var result:any = await MySQL.executeQuery(this.Query);

            if(result.constructor.name === "OkPacket"){
                this.Query = `SELECT * FROM users WHERE email = '${data.email}'`;
                result = await MySQL.executeQuery(this.Query);
                
                this.Query = `INSERT INTO address_users(users_id, address_id) VALUES ('${result[0].id}','${ rows.insertId}')`;
                await MySQL.executeQuery(this.Query);

                delete result[0].password;

                return res.status(200).json({
                    ok:true,
                    user: {
                        role,
                        id: result[0].id,
                        status: result[0].status,
                        name: result[0].name,
                        surname: result[0].surname,
                        email: result[0].email
                    }
                });
            }
                
        
            


        } catch (error) {
             return res.status(400).json({
                ok:false, 
                message: 'Bad query!'
            });
        }
    }

    static async valEmail(data:any){


        this.Query= `SELECT email FROM users WHERE email= '${data.email}'`;
        let result:any = await MySQL.executeQuery(this.Query);
         
        if(result[0]==undefined) {
            return true;
        }else if(result[0].constructor.name == 'RowDataPacket'){

            return false;
        }

    }

    static async valTel(data:any){

        this.Query= `SELECT telephone FROM users WHERE telephone= '${data.telephone}'`;
        let resultT:any = await MySQL.executeQuery(this.Query);
       if(resultT[0] == undefined){
            return true;
       }else if(resultT[0].constructor.name == 'RowDataPacket'){
            return false;
       }
    }

    static async changePassword(oldPass:string,newPass:string,res:any){
        const { userId } = res.locals.jwtPayload;

        this.Query = `SELECT password FROM users WHERE id = '${userId}'`;
        let result:any = await MySQL.executeQuery(this.Query);
        const pass_hash = bcrypt.compareSync(oldPass,result[0].password);

        if(!pass_hash){
            return res.status(406).json({
                        ok:false,
                        message: 'Password incorrect!'
                    }); 
        }

        let  _newPass = await bcrypt.hash(newPass,10);


        this.Query = `UPDATE users SET password ='${ _newPass}' WHERE id='${userId}' AND status = 'active'`;
        result = await MySQL.executeQuery(this.Query);

        if(result.constructor.name === 'OkPacket'){

            return res.status(200).json({
                        ok:true,
                        message: 'Success!'
                    }); 
        }
        
    }

    static async forgortPassword(email:string,res:any){
        
        const message = 'Check your email for a link to reset your password';

        let verificationLink;

        try{

            this.Query= `SELECT id,name FROM users WHERE email= '${email}' AND status = 'active'`;
            let result:any = await MySQL.executeQuery(this.Query);
            const {id,name } = result[0];

            const token = jwt.sign({userId: id, username: name }, key.jwtSecretReset, {expiresIn: '10m'} )
            verificationLink = `http://localhost:4200/fegui_sajusa/api/v2/new-password/${token}`;
            this.Query = `UPDATE users SET resetToken='${token}' WHERE id='${id}'`;

        }catch(error){
            return res.status(400).json({
                ok:false, 
                message
            });
        }


        try{
            await MySQL.executeQuery(this.Query);
        }catch(error){
            return res.status(400).json({
                ok:false, 
                message:  'Something goes wrong!'
            });
        }


        try{

              // send mail with defined transport object
              await transporter.sendMail({
                from: '"Team FeguiSajusa"', // sender address
                to: email, // list of receivers
                subject: `Forgort Password `, // Subject line
                html: `
                <p>Expires in 10m</p> 
                <p>Please click in link, or paste this into your browser to complete the process:  </p> 
                <a href="${verificationLink}">${verificationLink}</a>
                `
              });


        }catch(error){
            return res.status(400).json({
                ok:false, 
                message:  'Something goes wrong!'
            });
        }

       
        return res.status(200).json({
            ok:true,
            message
        });
    }

    static async createNewPassword(resetToken:string, newPassword: string,res:any){


        try{
            let jwtPayload = jwt.verify(resetToken,key.jwtSecretReset);
            // this.Query =  `SELECT password FROM users WHERE resetToken = '${resetToken}'`;
            // var result:any = await MySQL.executeQuery(this.Query);

            let  _newPassword = await bcrypt.hash(newPassword,10);

            this.Query = `UPDATE users SET password ='${_newPassword}' WHERE resetToken='${resetToken}' AND status = 'active'`;
            var result:any = await MySQL.executeQuery(this.Query);

            if(result.constructor.name === 'OkPacket'){

                return res.status(200).json({
                            ok:true,
                            message: 'Password change!'
                        }); 
            }

        }catch(error){
             return res.status(401).json({
                ok:false, 
                message:  'Something goes wrong!'
            });
        }

      
    }
   
}