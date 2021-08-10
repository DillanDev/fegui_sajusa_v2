import MySQL from '../config/connection';
import bcrypt from "bcrypt";

export class CustomerModel{
    private Query = '';
    private inserts =[''];

    public async customers(){

       this.Query = `
       SELECT * 
       FROM customers`;

       return await MySQL.executeQuery(this.Query); 
    }

    public async customer(id:string){
        try {
            let escapeID = MySQL.instance.cnn.escape(id);
            this.Query  = `
            SELECT * 
            FROM customers 
            WHERE id = ${escapeID} AND status = 'actived'`;
            let result:any = await MySQL.executeQuery(this.Query); 
            delete result[0].password;
            return result[0];
        } catch (error) {
            console.log('Id invalid');
        }
        
    }

    public async createCustomer(body:any){
        try {

            console.log("entro");
            body.password = await bcrypt.hash(body.password,10);
            this.Query =`
            INSERT INTO 
            customers(name, surname,image, gender, email,telephone, password, city, region, zip) 
            VALUES (?,?,?,?,?,?,?,?,?,?)`;
            this.inserts = [`${body.name}`,`${body.surname}`,`${body.image}`,`${body.gender}`,`${body.email}`,`${body.telephone}`,`${body.password}`,`${body.city}`,`${body.city}`,`${body.region}`];
            this.Query = MySQL.instance.cnn.format(this.Query,this.inserts);
            var result:any;
            await MySQL.executeQuery(this.Query).then(()=>{ 
                delete body.password;
                result = body; 
            }); 

            return result;
        } catch (error) {
            console.log('Query failed');
        }
    }
   
    public async updateCustomer(id:string,body:any){
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

            this.Query = `UPDATE customers SET ??=?`
            for (let i =1 ; i<=Object.keys(body).length-1;i++){
                this.Query +=',??=?';
            }
            this.Query += ` WHERE id = ${escapeID} AND status = 'active' `;
            this.Query = MySQL.instance.cnn.format(this.Query,this.inserts);
            var result:any;
                await MySQL.executeQuery(this.Query).then(()=>{ 
                    if(body.password) delete body.password;
                    result = body; 
                }); 

            return result;
        } catch (error) {
            console.log('Query failed');
        }
    }

    public async deleteCustomer(id:string){

        let escapeID = MySQL.instance.cnn.escape(id);
        this.Query = `
        UPDATE customers 
        SET status='disabled' 
        WHERE id = ${escapeID}`;

        return await MySQL.executeQuery(this.Query);
    
    }

    public async createPayment(id:string,body:any){
        let escapeID = MySQL.instance.cnn.escape(id);
        this.Query = `
        INSERT INTO payment (customer_id, payment_type, name, account_no, expiry) 
        VALUES (?, ?, ?, ?, ?)`;
        this.inserts = [`${escapeID}`,`${body.payment_type}`,`${body.name}`,`${body.account_no}`,`${body.expiry}`];
        this.Query = MySQL.instance.cnn.format(this.Query,this.inserts);

        return await MySQL.executeQuery(this.Query);
    }

    public async searchPayment(id:string){
        try {
            let escapeID = MySQL.instance.cnn.escape(id);
            this.Query  = `
            SELECT * 
            FROM payment 
            WHERE customer_id = ${escapeID}`;
            let result:any = await MySQL.executeQuery(this.Query); 
            return result[0];
        } catch (error) {
            console.log('Id invalid');
        }
        
    }

       
    public async updatePayment(id:string,body:any){
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

            this.Query = `UPDATE payment SET ??=?`
            for (let i =1 ; i<=Object.keys(body).length-1;i++){
                this.Query +=',??=?';
            }
            this.Query += ` WHERE id = ${escapeID} `;
            this.Query = MySQL.instance.cnn.format(this.Query,this.inserts);
            var result:any;
                await MySQL.executeQuery(this.Query).then(()=>{ 
                    result = body; 
                }); 

            return result;
        } catch (error) {
            console.log('Query failed');
        }
    }

    public async deletePayment(id:string){

        let escapeID = MySQL.instance.cnn.escape(id);
        this.Query = `
        DELETE FROM payment
        WHERE id = ${escapeID}`;

        return await MySQL.executeQuery(this.Query);
    
    }

    public async cart(id:string,quantity:string){

        this.Query = `
        INSERT INTO cart(products_id, quantity) 
        VALUES ('${id}','${quantity}')`;
        return await MySQL.executeQuery(this.Query); 
       
     }

    /*Orders*/

    public async orders(id:string,res:any){
        try {
            this.Query  = 'SELECT * FROM `orders` WHERE customer_id='+id+'';
            let result:any = await MySQL.executeQuery(this.Query); 
            
            return res.status(200).json({ok:true,orders:result});
        } catch (error) {
            return res.status(404).json({ok:false,error});
        }
    }

    public async order(id:string,ID:string,res:any){
        try {
            this.Query  = 'SELECT * FROM `orders` WHERE customer_id='+ID+' AND id='+id+';';
            let result:any = await MySQL.executeQuery(this.Query); 
            
            return res.status(200).json({ok:true,orders:result[0]});
        } catch (error) {
            return res.status(404).json({ok:false,error});
        }
    }

    public async createOrders(ID:string,id:string,res:any,body:any){
        try {

            this.Query  = 'SELECT name FROM customers WHERE id='+ID+'';
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

    public async updateOrders(id:string,body:any,res:any){
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

    public async deleteOrders(ID:string,id:string,res:any){
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

    /*Comentarios*/

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

            this.Query  = 'SELECT name FROM customers WHERE id='+ID+'';
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