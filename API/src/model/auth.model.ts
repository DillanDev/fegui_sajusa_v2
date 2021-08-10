import MySQL from '../config/connection';
import * as jwt from 'jsonwebtoken';
import keyCustomer from "../config/key-customer";
import keyAdmin from "../config/key-admin";
import bcrypt from 'bcrypt';

export class AuthModel{

    private Query = '';
    private inserts =[''];


    public async login(email:string,password:string, name:string){

        var b: boolean = false;
        let SQL = `SELECT password FROM ${name} WHERE email = '${email}'`;
        let rows:any =  await MySQL.executeQuery(SQL);
        const pass_hash = bcrypt.compareSync(password,rows[0].password);

        if(pass_hash==false){

            return b;

        }else if(pass_hash == true){
            SQL = `SELECT * FROM ${name} WHERE email = '${email}'`;
            const rows2:any =await MySQL.executeQuery(SQL);
            if(name == 'employees'){
                const token = jwt.sign({userId:rows2[0].id,username:rows2[0].name},keyAdmin.jwtSecret,{expiresIn: '1h'});
                b = true;
                return {b, token};
            }else if(name == 'customers'){
                const token = jwt.sign({userId:rows2[0].id,username:rows2[0].name},keyCustomer.jwtSecret);
                b = true;
                return {b, token};
            }
        }

    }

    public async customer(body:any){
        try {
            body.password = await bcrypt.hash(body.password,10);
            this.Query =`
            INSERT INTO
            customers(name, surname, gender, email,telephone, password, city, region, zip)
            VALUES (?,?,?,?,?,?,?,?,?)`;
            this.inserts = [`${body.name}`,`${body.surname}`,`${body.gender}`,`${body.email}`,`${body.telephone}`,`${body.password}`,`${body.city}`,`${body.city}`,`${body.region}`];
            this.Query = MySQL.instance.cnn.format(this.Query,this.inserts);
            let result:any = await MySQL.executeQuery(this.Query);
            if(result.constructor.name === "OkPacket") return true;
        } catch (error) {
            console.log('Query failed');
        }
    }


    public async employee(body:any){

       

        try {
            body.password = await bcrypt.hash(body.password,10);
            this.Query =`
            INSERT INTO
            employees(name, surname, gender, email,telephone, password, role, city, region, zip)
            VALUES (?,?,?,?,?,?,?,?,?,?)`;
            this.inserts = [`${body.name}`,`${body.surname}`,`${body.gender}`,`${body.email}`,`${body.telephone}`,`${body.password}`,`${body.role}`,`${body.city}`,`${body.city}`,`${body.region}`];
            this.Query = MySQL.instance.cnn.format(this.Query,this.inserts);
            let result:any = await MySQL.executeQuery(this.Query);
            if(result.constructor.name === "OkPacket") return true;
        } catch (error) {
            console.log('Query failed');
        }
    }

    public async valEmail(body:any, name:string){
         //Validando si existe el gmail
         this.Query= `SELECT email FROM ${name} WHERE email= '${body.email}'`;
         let result:any = await MySQL.executeQuery(this.Query);
         
        if(result[0]==undefined) {
            return 'No existe el email'
        }else if(result[0].constructor.name == 'RowDataPacket'){
            console.log(result[0].constructor.name);
            return 'Ya existe el email';
        }

    }

    public async valTel(body:any,name:string){
        //Validando si existe el celular
        this.Query= `SELECT telephone FROM ${name} WHERE telephone= '${body.telephone}'`;
        let resultT:any = await MySQL.executeQuery(this.Query);
       if(resultT[0] == undefined){
           return 'No existe el celular'
       }else if(resultT[0].constructor.name == 'RowDataPacket'){
           return 'Ya existe el celular';
       }
   }
}