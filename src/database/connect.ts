import * as dotenv from "dotenv";
import mongoose , {Mongoose} from "mongoose";

dotenv.config();

class DBconnection{
    url : string
    client : Mongoose | undefined
    dbName : string
    
    constructor(url : string , dbName : string){
        this.dbName = dbName;
        this.url = url;
    }

    async connect(){
        this.client = await mongoose.connect(this.url, {
            dbName: DBNAME,
        });
    }
}

const URL : string = process.env.MONGO_URL;
const DBNAME : string = process.env.DBNAME;

export const dblink = new DBconnection(URL,DBNAME);