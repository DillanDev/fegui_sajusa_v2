import MySQL from '../config/connection';


export class Validation{
    
    public AlonString(x:any, maxL:number, minL:number){
        const regex  =  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;
        let b: boolean = false;

        if(!regex.test(x) || x.length >=maxL || x.length <=minL ){
            return b = false;
        }else{
            return b = true;
        }
    }

    public async email(x:any, maxL:number, minL:number):Promise<any>{
        const regex  = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let b: boolean = false;

        if(!regex.test(x) || x.length >=maxL || x.length <=minL ){
            return b = false;
        }else{
            

            return b = true;
            
        }
    }

    public password(x:any, maxL:number, minL:number){
        let b: boolean = false;

        if( x.length >=maxL || x.length <=minL ){
            return b = false;
        }else{
            return b = true;
        }
    }

    public AlonNumber(x:any, maxL:number, minL:number){
        const regex  = /^[(]{0,1}[+]?[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;;
        let b: boolean = false;

        if(!regex.test(x) || x.length >=maxL || x.length <=minL ){
            return b = false;
        }else{
            return b = true;
        }
    }
    
}