import { Request,Response } from "express";

import { AuthModel } from "../model/auth.model";
import { Validation } from "../config/validation";

const MODEL: AuthModel = new AuthModel();
const VALIDATION: Validation = new Validation();

export class Auth{
  
    public async login(req:Request,res:Response){
        
        if(!(req.params.name == 'employees'|| req.params.name == 'customers')) return res.status(404).json({ok:false,message:'Parametro no permitido'});
        
        const {email,password} = req.body;
        
        if(!(email && password)){
            return res.json({ok:false,message: 'Username and password required'});
        }
        
        try{

            let a:any = await MODEL.login(email,password,req.params.name);
            if(a == false){
                res.json({ok:false,message:'Incorrect email or password!'});
            }else if(a.b ==true){
                
                res.status(200).json({ok:a.b,token:a.token});
            }
        }catch(error){
            return res.json({ok:false,message: 'Incorrect email or password!'});
        }

                 
    }

    public async register(req:Request, res:Response){
        let name = req.body.name || 0;
        let surname =  req.body.surname || 0;
        let email = req.body.email || 0;
        let telephone  = req.body.telephone || 0;
        let password = req.body.password ||0;
        let city = req.body.city || 0;
        let region =  req.body.region || 0;
        let zip  = req.body.zip || 0;

        try {

            if(!VALIDATION.AlonString(name,30,2)){

                return res.status(406).json({ok:false, message:'Incorrect name!'});

            }else if(!VALIDATION.AlonString(surname,60,2)){

                return res.status(406).json({ok:false, message:'Incorrect surname!'});

            }else if(!VALIDATION.email(email,60,6)){
                
                return res.status(406).json({ok:false, message:'Incorrect email!'});

            }else if(!VALIDATION.AlonNumber(telephone,15,6)){

                return res.status(406).json({ok:false, message:'Incorrect telephone!'});   

            }else if(!VALIDATION.password(password,60,6)){

                return res.status(406).json({ok:false, message:'Incorrect password!'});  

            }else if(!VALIDATION.AlonString(city,30,2)){

                return res.status(406).json({ok:false, message:'Incorrect city!'});

            }else if(!VALIDATION.AlonString(region,30,2)){

                return res.status(406).json({ok:false, message:'Incorrect region!'});

            }else if(!VALIDATION.AlonNumber(zip,10,4)){

                return res.status(406).json({ok:false, message:'Incorrect zip!'}); 

            }else if(req.body.role){
                let cad = req.body.telephone;
                if(cad.charAt(0) == '+'){
                    let auxE = await MODEL.valEmail(req.body, 'employees');
                    let auxC =  await MODEL.valTel(req.body, 'employees');
                    if(auxE == 'No existe el email' && auxC == 'No existe el celular'){
                        if(await MODEL.employee(req.body) !== undefined){
                            delete req.body.password;
                            res.status(200).json({ ok:true, employee:req.body});
                        }else{
                            res.status(400).json({ ok:false, message:'Error'});

                        }
                    }else if(auxE == 'Ya existe el email'){
                        res.status(400).json({ok:false, message:'Ya existe el email'})
                        
                    }else if(auxC == 'Ya existe el celular'){
                        res.status(400).json({ok:false, message:'Ya existe el celular'})
                            
                    }    
                    
                }else{
                    res.status(400).json({ok:false, message:'Se solicita con indicativo de cada pais'})
                }
            }else if(!req.body.role){
            
                let cad = req.body.telephone;
                if(cad.charAt(0) == '+'){
                    let auxE = await MODEL.valEmail(req.body, 'customers');
                    let auxC =  await MODEL.valTel(req.body, 'customers');
                    if(auxE == 'No existe el email' && auxC == 'No existe el celular'){
                        if(await MODEL.customer(req.body) !== undefined){
                            delete req.body.password;
                            res.status(200).json({ ok:true, customers:req.body});
                        }else{
                            res.status(400).json({ ok:false, message:'Error'});

                        }
                    }else if(auxE == 'Ya existe el email'){
                        res.status(400).json({ok:false, message:'Ya existe el email'})
                        
                    }else if(auxC == 'Ya existe el celular'){
                        res.status(400).json({ok:false, message:'Ya existe el celular'})
                            
                    }    
                    
                }else{
                    res.status(400).json({ok:false, message:'Se solicita con indicativo de cada pais'})
                }            
            }

        } catch (error) {
            
            return res.status(500).json({message: 'Error internal server '});

        }
        
    }

    
}