import MySQL from '../config/connection';
import { UploadController } from '../controller/upload.controller';
import { UploadModel } from './upload.model';
import { DataI, ResponseI } from './../interface/data.interface'

const MODEL = new UploadController;
const UPLOAD = new UploadModel;

export class ProductModel{
    static Query = '';
    static inserts =[''];
    static result:any = '';
    static aux: any = '';
    static cont = 0;

    //===================
    //      PUBLIC      |
    //===================

    // Menú
    static async allCategories(res:ResponseI){

        try{

            this.Query = "SELECT * FROM categories";
            let result:any = await MySQL.executeQuery(this.Query); 
            return res.status(200).json( {ok:true,categories:result});

        }catch(error){
                return res.status(400).json({
                    ok:false,
                    message: 'Something goes wrong!'
                });
        }
    }

    // Menú + Contenido
    static async category(req:any, res:ResponseI){
        try{


            this.Query = `SELECT id,name FROM categories WHERE id = '${req.params.id}'`;
            this.result = await MySQL.executeQuery(this.Query); 
            if(this.result.length > 0 ){
                if(this.result[0].constructor.name === 'RowDataPacket' ){
                    let _aux = this.result[0].id;
                    let aux = this.result[0].name;
                    let page = Number(req.query.page);
                    let limit = Number(req.query.limit);
                    let _page = page*limit-limit

                    // const startIndex = (page - 1)*limit;
                    // const endIndex = page * limit;

                    this.Query = `SELECT * FROM products WHERE categories_id = '${req.params.id}'`;
                    this.result = await MySQL.executeQuery(this.Query); 
                    let cont = 0
                    for(let _ in this.result ) cont = cont + 1;


                    this.Query = `
                    SELECT * FROM products 
                    WHERE categories_id = '${req.params.id}' 

                    LIMIT ${limit} OFFSET ${_page}`;


                    this.result = await MySQL.executeQuery(this.Query); 
                    let products = this.result


                    this.Query = `SELECT * FROM images`;
                    this.result = await MySQL.executeQuery(this.Query);
                    let images: any = new Array(this.result.length-1);

                    images = [];

                    for(let _ in products){
                        this.Query = `SELECT images_id FROM products_images WHERE products_id = '${products[_].id}'`;
                        this.result = await MySQL.executeQuery(this.Query);


                        for(let __ in this.result){


                            this.Query = `SELECT id,image FROM images WHERE id = '${this.result[__].images_id}'`;
                            this.aux = await MySQL.executeQuery(this.Query);
                            //Insertando el dato

                            images[_] =  { products_id: products[_].id, id: this.aux[0].id, image: this.aux[0].image};
                            
                            


                        }


                    }


                    return res.status(200).json({
                        ok:true,
                        page,
                        totalItems: cont,
                        id:_aux,
                        categories_id:aux,
                        products,
                        products_images:images
                    });
                }
            }else{
                return res.status(404).json({
                    ok:false,
                    message: 'Category not found!'
                });
            }
            
        }catch(error){
            return res.status(400).json({
                    ok:false,
                    message: 'Something goes wrong!'
                });
        }
    }

    // Busqueda + sugerencias
    static async searchShort(name:string, res:ResponseI){
        this.Query = `SELECT id,name FROM products WHERE name LIKE '%${name}%' LIMIT 4`;
        let result:any = await MySQL.executeQuery(this.Query); 
        return res.status(200).json({
            ok:true,
            products:result
        });
    }

    // Busqueda + Contenido
    static async search(req:any, res:ResponseI){
        try{
            let page = Number(req.query.page);
            let limit = Number(req.query.limit);
            let _page = page*limit-limit

            //Contador
            this.Query = `SELECT * FROM products WHERE  name LIKE '%${req.params.name}%' LIMIT ${limit} OFFSET ${_page}`;
            let result:any = await MySQL.executeQuery(this.Query); 
            let cont = 0
            for(let _ in result ) cont = cont + 1;


            let products:any = result

            this.Query = `SELECT * FROM images`;
            this.result = await MySQL.executeQuery(this.Query);

            var images: any;
            if(limit > cont){
               images = new Array(cont-1);
            }else{
                images = new Array(limit-1);
            }

            
            images = [];
            for(let _ in products){
                this.Query = `SELECT images_id FROM products_images WHERE products_id = '${products[_].id}'`;
                this.result = await MySQL.executeQuery(this.Query);

                

                for(let __ in this.result){
                    this.Query = `SELECT id,image FROM images WHERE id = '${this.result[__].images_id}'`;
                    this.aux = await MySQL.executeQuery(this.Query);
                    //Insertando el dato

                    images[__] =  { products_id: products[_].id, id: this.aux[0].id, image: this.aux[0].image};


                }


            }

            this.Query = `SELECT * FROM products WHERE name LIKE '%${req.params.name}%' LIMIT ${limit} OFFSET ${_page}`;
            result = await MySQL.executeQuery(this.Query); 
            return res.status(200).json({
                ok:true,
                page: page,
                totalItems:cont,
                products:result,
                products_images:images
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
            this.Query = "SELECT * FROM `products` WHERE id='"+id+"'";
            this.result = await MySQL.executeQuery(this.Query); 
            let _products:any = this.result;

            if(this.result.length>0){

                let products:any = this.result;

                this.Query = `SELECT * FROM images`;
                this.result = await MySQL.executeQuery(this.Query);
                

                this.Query = `SELECT images_id FROM products_images WHERE products_id = '${products[0].id}'`;
                this.result = await MySQL.executeQuery(this.Query);


                var images: any = new Array(this.result.length-1);
                images = [];
                for(let _ in this.result){

                    this.Query = `SELECT id,image FROM images WHERE id = '${this.result[_].images_id}'`;
                    this.aux = await MySQL.executeQuery(this.Query);
                    //Insertando el dato
                    images[_] =  { products_id: products[0].id, id: this.aux[0].id, image: this.aux[0].image};

                }

                return res.status(200).json({
                    ok:true,
                    products:_products,
                    images
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

    static random(min:any,max:any){
          return Math.random() * (max - min) + min;
    }

    // Producto slider
    static async productSlider(id:string,res:any){
         try{
             //Contador
            this.Query = `SELECT count(id) FROM products`;
            this.result = await MySQL.executeQuery(this.Query);
 
            let cont:any = Object.values(this.result[0]);

            let array = new Array(4);

            for(let i = 0; i<=3; i++){
                array[i] = Math.trunc(this.random(1,cont));
            }

            for(let i= 0; i<4;i++){

                this.Query = `SELECT * FROM products LIMIT ${array[i]},1 `;
                this.result = await MySQL.executeQuery(this.Query); 
                array[i] = this.result[0];

            }
                
            let products:any = array;

            if(array.length>0){
                    
                var contAux= 0;

                let _images: any = new Array(4);
                _images = [];

                for(let i = 0; i< 4; i++){           
                    this.Query = `SELECT images_id FROM products_images WHERE products_id = '${products[i].id}'`;
                    this.result = await MySQL.executeQuery(this.Query);
                    _images[i] = this.result[0].images_id

                }

                for(let i = 0; i< 4; i++){
                    this.Query = `SELECT id,image FROM images WHERE id = '${_images[i]}'`;
                    this.aux = await MySQL.executeQuery(this.Query);
                    //Insertando el dato            
                    _images[i] =  { products_id: products[i].id, id: this.aux[0].id, image: this.aux[0].image};
                }


                return res.status(200).json({
                    ok:true,
                    products:products,
                    images:_images
                });
            }else{
                return res.status(404).json({
                    ok:false,
                    message: 'Not products in stock!'
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


    // Categoría!
    static async createCategory(req:any, res:ResponseI){
        try {

            this.Query = `SELECT id,name FROM categories WHERE name = '${req.body.name}'`;
            this.result = await MySQL.executeQuery(this.Query); 

            if(this.result.length > 0 ){
                if(this.result[0].constructor.name === 'RowDataPacket'){
                    return res.status(406).json({
                        ok:false,
                        id: this.result[0].id,
                        categories: this.result[0].name,
                        message: 'Name duplicate!'
                    });
                }
            }


            this.Query = `INSERT INTO categories(name) VALUES ('${req.body.name}')`;
            this.result = await MySQL.executeQuery(this.Query); 

            if(this.result.constructor.name === 'OkPacket'){
                this.Query = `SELECT id,name FROM categories WHERE name = '${req.body.name}'`;
                this.result = await MySQL.executeQuery(this.Query); 
                return res.status(200).json({
                    ok:true,
                    id: this.result[0].id,
                    categories: this.result[0].name,                    
                    message: 'Success!' 
                });
            }
            

        } catch (error) {
            return res.status(400).json({
                    ok:false,
                    message: 'Something goes wrong!'
                });
        }
    }   

    static async updateCategory(req:any, res:ResponseI){
        try {

            this.Query = `SELECT id,name FROM categories WHERE name = '${req.body.name}'`;
            this.result = await MySQL.executeQuery(this.Query); 

            if(this.result.length > 0 ){
                if(this.result[0].constructor.name === 'RowDataPacket'){
                    return res.status(406).json({
                        ok:false,
                        id: this.result.id,
                        categories: this.result.name,
                        message: 'Name duplicate!'
                    });
                }
            }


            this.Query = `UPDATE categories SET name='${req.body.name}'  WHERE id='${req.params.id}'`;
            this.result = await MySQL.executeQuery(this.Query); 

            if(this.result.constructor.name === 'OkPacket'){
                this.Query = `SELECT id,name FROM categories WHERE name = '${req.body.name}'`;
                this.result = await MySQL.executeQuery(this.Query);

                return res.status(200).json({
                    ok:true,
                    id: this.result[0].id,
                    categories: this.result[0].name,
                    message: 'Success!' 
                });
            }
            

        } catch (error) {
            return res.status(400).json({
                    ok:false,
                    message: 'Something goes wrong!'
            });
        }
    }   

    static async deleteCategory(req:any, res:ResponseI){
        try {

            this.Query = `SELECT id,name FROM categories WHERE id = '${req.params.id}'`;
            this.result = await MySQL.executeQuery(this.Query); 
            let aux: any = this.result;
            if(this.result.length > 0 ){
                if(this.result[0].constructor.name === 'RowDataPacket'){
                    this.Query = `DELETE FROM categories WHERE id= '${req.params.id}'`;
                    this.result = await MySQL.executeQuery(this.Query); 

                    return res.status(200).json({
                        ok:true,
                        id: aux.id,
                        categories: aux.name,
                        message: 'Element delete!'
                    });
                }
            }else{
                    return res.status(404).json({
                        ok:false,
                        message: 'Element not found!'
                    });
                }


        } catch (error) {
            return res.status(400).json({
                    ok:false,
                    message: 'Something goes wrong!'
                });
        }
    }   

    // Producto!
    static async createProduct(req:any,res:any){

        this.Query = `SELECT id,name FROM categories WHERE id='${req.params.id}'`;
        this.result = await MySQL.executeQuery(this.Query);  

        const categories_id:string = this.result[0].id;
        const categories_name:string = this.result[0].name;

        this.Query =`
            INSERT INTO 
            products(categories_id, discount, inventory, name, price, weight, description) 
            VALUES (?,?,?,?,?,?,?)`;

        let discount:any = req.body.discount;

        if(discount.charAt(discount.length-1) === '%' ){
            discount = discount.replace("%","");
            discount = Number(discount);
            discount = discount/100;
        }else if (discount > 1){
            discount = discount/100;
        }

        this.inserts = [`${categories_id}`,`${discount}`,`${req.body.inventory}`,`${req.body.name}`,`${req.body.price}`,`${req.body.weight}`,`${req.body.description}`];
        this.Query = MySQL.instance.cnn.format(this.Query,this.inserts);
        this.result = await MySQL.executeQuery(this.Query); 

        this.Query = `SELECT id,name FROM products WHERE id = '${this.result.insertId}'`;
        this.result= await MySQL.executeQuery(this.Query); 

        const products_id:string = this.result[0].id;
        const products_name:string = this.result[0].name;
        const sku:string = (categories_name.charAt(0) + categories_name.charAt(1) + categories_id +"-"+ products_id ).toUpperCase();

        this.Query = `UPDATE products SET sku='${sku}' WHERE id='${products_id}'`;
        this.result= await MySQL.executeQuery(this.Query); 

        if(req.files.files.length){
            for(let __ in req.files.files){
                await MODEL.load(req,res,'products',products_id,req.files.files[__]);

            }
         }else{   

            await MODEL.load(req,res,'products',products_id,req.files.files);

        }

        return  res.status(200)
                .json( {
                    ok:true,
                    message:'Datos guardados correctamente'
                });
    }

    static async updateProduct(res:any,req:any){
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
            this.Query =` UPDATE products SET `;
            for (let i =1 ; i<=Object.keys(body).length;i++){
                this.Query +=',??=?';
            }

            this.Query += ` WHERE id = '${id}'`; 
            this.Query = MySQL.instance.cnn.format(this.Query,this.inserts);
            await MySQL.executeQuery(this.Query);


            if(req.files){
                if(req.files.files.length){
                    for(let __ in req.files.files){
                        await MODEL.load(req,res,'products',id,req.files.files[__]);

                    }
                }else{   

                    await MODEL.load(req,res,'products',id,req.files.files);

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

    static async deleteProduct(id:string,res:any){
        try {

            //Seleccionando todas las imagenes
            this.Query = `SELECT images_id FROM products_images WHERE products_id = '${id}'`;
            this.result = await MySQL.executeQuery(this.Query); 
            let images_id:any =this.result


            //Borrando imagenes de la tabla images!
            for(let _ in images_id){
                this.Query = `SELECT image FROM images WHERE id = '${images_id[_].images_id}'`;
                this.result = await MySQL.executeQuery(this.Query); 
                UPLOAD.borraArchivo(this.result[0].image,'products');
                this.Query = `DELETE FROM images WHERE id = '${images_id[_].images_id}'`;
                await MySQL.executeQuery(this.Query); 

            }

            this.Query = `DELETE FROM products WHERE id = '${id}'`;
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