import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  referralNumber: string; 
  collegeName?: string;    
  createdAt: Date;        
  refNumDetails?: mongoose.Types.ObjectId | RefNums; 
}

export interface RefNums extends Document {
    referralNumber : string,
    createdAt: Date,
    referredCount : number
}

export const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    referralNumber : {type : String , required : true},
    collegeName : {type : String},
    refNumDetails: { type: Schema.Types.ObjectId, ref: 'RefNums' },
    createdAt: { type: Date, default: Date.now }
});


export const RefNumsScehma : Schema = new Schema({
    referralNumber : {type : String , required : true},
    createdAt: { type: Date, default: Date.now },
    referredCount : {type : Number, default : 0}
});



export const User = mongoose.model<IUser>('User', UserSchema);
export const RefNums = mongoose.model<RefNums>('RefNums', RefNumsScehma);
