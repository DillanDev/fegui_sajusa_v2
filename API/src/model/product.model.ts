import MySQL from '../config/connection';
import { UploadController } from '../controller/upload.controller';
import { UploadModel } from './upload.model';


const MODEL = new UploadController;
const UPLOAD = new UploadModel;
export class ProductModel{
    private Query = '';
    private inserts =[''];

    public async categories(){

        this.Query = "SELECT * FROM categories";
        return await MySQL.executeQuery(this.Query); 
       
    }

    public async products(name:string,res:any){

        this.Query = "SELECT `id` FROM `categories` WHERE name='"+name+"'";
        let result:any = await MySQL.executeQuery(this.Query); 
        result[0].id
        this.Query = "SELECT * FROM `products` WHERE category_id = '"+result[0].id+"'";
        result = await MySQL.executeQuery(this.Query); 

        res.status(200).json({
            ok:true,
            categoria:name,
            result
        });
    }

    public async Byid(name:string,res:any){
        this.Query = "SELECT * FROM `products` WHERE name LIKE '%"+name+"%'";
        let result:any = await MySQL.executeQuery(this.Query); 
        res.status(200).json({
            ok:true,
            product:result 
        });

    }

    public async productsEmployee(id:string,res:any){

       this.Query = `SELECT products_id FROM employeesxproducts WHERE  employees_id = '${id}'`;

       let result:any = await MySQL.executeQuery(this.Query); 
       let name:any;
       var x:any = [];
       var obj:any = [];
       for (let index = 0; index < result.length; index++) {
            this.Query = `SELECT name FROM products WHERE id = '${result[index].products_id}'`;
            name = await MySQL.executeQuery(this.Query); 

            obj[index] = {id:'',name:''};
            obj[index].id += `${result[index].products_id}`
            obj[index].name += `${name[0].name}`;
       }
       
       return res.status(200)
            .json( {
                ok:true,
                employee_id:id, 
                products:obj
            });
      
    }

    public async create(ID:string,name:string,body:any,res:any,req:any){
        this.Query = `SELECT id FROM categories WHERE name='${name}'`;
        let result:any = await MySQL.executeQuery(this.Query); 
        
        this.Query =`
            INSERT INTO 
            products(category_id, discount, inventory, sku, name, price, weight, shortDesc, longDesc) 
            VALUES (?,?,?,?,?,?,?,?,?)`;
            this.inserts = [`${result[0].id}`,`${body.discount}`,`${body.inventory}`,`${body.sku}`,`${body.name}`,`${body.price}`,`${body.weight}`,`${body.shortDesc}`,`${body.longDesc}`];
            this.Query = MySQL.instance.cnn.format(this.Query,this.inserts);
        result = await MySQL.executeQuery(this.Query); 

        this.Query = `SELECT id FROM products WHERE name = '${body.name}'`;
        let id:any = await MySQL.executeQuery(this.Query); 

        this.Query = ` INSERT INTO employeesxproducts(employees_id, products_id) VALUES ('${ID}','${id[id.length-1].id}') `;
        result = await MySQL.executeQuery(this.Query);
        
        await MODEL.load(req,res,'products',id[id.length-1].id);


        return  res.status(200)
                .json( {
                    ok:true,
                    message:'Datos guardados correctamente'
                });

    }

    public async update(body:any,id:any,name:string,res:any,req:any){
        try {
            this.Query = `SELECT id FROM categories WHERE name='${name}'`;
            let result:any = await MySQL.executeQuery(this.Query); 
            
            var i = 0;

            for (var value in body) {
                this.inserts[i] = '';
                this.inserts[i] += value;
                i++;
                this.inserts[i] = '';
                this.inserts[i] += body[value];
                i++;
            }

            this.Query =` UPDATE products SET category_id='${result[0].id}'`;

            for (let i =1 ; i<=Object.keys(body).length;i++){
                this.Query +=',??=?';
            }
            this.Query += ` WHERE id = ${id}`; 
            this.Query = MySQL.instance.cnn.format(this.Query,this.inserts);
            await MySQL.executeQuery(this.Query);
            if(req.files){
                await MODEL.load(req,res,'products',id);
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

    public async delete(id:string,res:any){
        try {

            this.Query = `DELETE FROM employeesxproducts WHERE products_id = '${id}'`;
            await MySQL.executeQuery(this.Query); 

            this.Query = `SELECT  image FROM products WHERE id = '${id}'`;
            let result:any = await MySQL.executeQuery(this.Query);    

            this.Query = `DELETE FROM products WHERE id = '${id}'`;
            await MySQL.executeQuery(this.Query);


            UPLOAD.borraArchivo(result[0].image,'products');
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

    //Creando un carrito
    public async cart(id:string,quantity:any,res:any){

        this.Query = "SELECT `quantity` FROM `products` WHERE id='"+id+"'";
        let q:any = await MySQL.executeQuery(this.Query); 

        if ( q[0].quantity< Number(quantity)){
            return res.status(400).json({ok:false,message:'Sobre pasa lo que hay en el inventario'})
        }

        this.Query = "SELECT `products_id` FROM `cart` WHERE products_id='"+id+"'";
        q = await MySQL.executeQuery(this.Query); 
        try {
            if(q[0].constructor.name == 'RowDataPacket'){
                this.Query='UPDATE `cart` SET `quantity`='+quantity+' WHERE products_id='+id+'';
                await MySQL.executeQuery(this.Query); 
                return res.status(200).json({
                    ok:true,
                    message:'Se actualizo correctamente'
    
                });
            }
        } catch (error) {
        
            this.Query='INSERT INTO `cart`(`products_id`, `quantity`) VALUES ('+id+','+quantity+')';
            await MySQL.executeQuery(this.Query); 
            return res.status(200).json({
                ok:true,
                message:'Se creo correctamente'

            }); 
        }
        
        
        


       
        
        //OkPacket
    }

    public async eliminateCart(id:string,res:any){

        try {
            this.Query = "SELECT `products_id` FROM `cart` WHERE products_id = '"+id+"'";
            let result:any = await MySQL.executeQuery(this.Query);

            if(result[0].constructor.name === 'RowDataPacket'){
                this.Query = "DELETE FROM `cart` WHERE products_id='"+id+"'";
                result = await MySQL.executeQuery(this.Query);
                return res.status(200).json({
                    ok:true,
                    message:'Se elimino correctamente'
        
                });
            }
        } catch (error) {
            return res.status(404).json({
                ok:false,
                message:'No se encontro el carrito'
    
            });
        }
        
        
       
    }

    //Shopping
    public async shopping(id:string,res:any){
        try {
            this.Query = "SELECT `products_id` FROM `customersxproducts` WHERE customers_id='"+id+"'";
            var result:any = await MySQL.executeQuery(this.Query);
            var price:any;
            var quantity:any;
            var x:any = [];
            var total:number =0 ;
            for (let index = 0; index < result.length; index++) {
                this.Query = `SELECT price FROM products WHERE id = '${result[index].products_id}'`;
                price = await MySQL.executeQuery(this.Query); 
                this.Query = "SELECT `quantity` FROM `cart` WHERE products_id = '"+result[index].products_id+"'" 
                quantity = await MySQL.executeQuery(this.Query); 
                try {
                    
                    total += Number(price[0].price * quantity[0].quantity);
                } catch (error) {
                    total += Number(price[0].price);
                }
                
            }
            try {
                this.Query = 'SELECT `price` FROM `shoppingseccion` WHERE `customer_id`='+id+'';
                result = await MySQL.executeQuery(this.Query); 
                if(result[0].constructor.name === 'RowDataPacket'){
                    this.Query = 'UPDATE `shoppingseccion` SET `price`='+total+' WHERE `customer_id`='+id+'';
                    result = await MySQL.executeQuery(this.Query); 
                } 
                return res.json({ok:true,message:'Precio actualizado correctamente'});

            } catch (error) {
                this.Query = 'INSERT INTO `shoppingseccion`(`customer_id`, `price`) VALUES ('+id+','+total+')';
                result = await MySQL.executeQuery(this.Query); 
                return res.json({ok:true,message:'Precio ingresado correctamente'});

            }


        } catch (error) {
            return res.status(400).json({ok:false,error});
            
        }
        


    }
    
}