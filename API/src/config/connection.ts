import mysql from "mysql";
import util from "util";
import { config } from "dotenv";


export default class MySQL{

    private static _instance: MySQL;
    cnn: mysql.Connection;
    connect: boolean = false;

    constructor(){
        config();
        
        this.cnn = mysql.createConnection({
            host: process.env.DATABASE_HOST || 'localhost',
            user: process.env.DATABASE_USER || 'root',
            password: process.env.DATABASE_PASSWORD || '',
            database: process.env.DATABASE_NAME || 'fegui_sajusa'
        });
        
        this.connectDB();
    }

    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    static async executeQuery(query:string){

        try {
            const QUERY = util.promisify(this.instance.cnn.query).bind(this.instance.cnn);
            let rows = await QUERY(query);
            return rows;
        } catch (error) {
            console.log('Error in consult: '+error);
        }
        
    }

    public connectDB(){
        this.cnn.connect((err:mysql.MysqlError)=>{
            if(err) return console.log(err.message);

            this.connect = true;
            console.log('Database online!');
        });

    }
}