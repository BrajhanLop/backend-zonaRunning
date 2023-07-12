import mongoose, { Schema, Document } from 'mongoose'

<<<<<<< HEAD


=======
>>>>>>> 84627d5512e05838a7ae26d41f00d382556b5a33
export interface IUser extends Document {
    First_name: string,
    Last_name: string,
    Email: string,
    Password: string,
    habilitado: boolean,    
<<<<<<< HEAD
    role: string,
    avatar:Schema.Types.ObjectId
};

const UserSchema:Schema = new Schema({
    First_name:{type:String, required:true},
    Last_name:{type: String, required: true},
    Email:{type: String, required: true, unique:true},
    Password:{type: String, required: true},
    habilitado:{type: Boolean, default: false},
    role:{type:String, require:true},
    avatar:{type:Schema.Types.ObjectId, ref:'Avatar'}
},
{
    timestamps:true
=======
    role: string
};

const UserSchema: Schema = new Schema({
    First_name: { type: String, required: true },
    Last_name: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    habilitado: { type: Boolean, default: false },   
    role: { type: String, require: true }
>>>>>>> 84627d5512e05838a7ae26d41f00d382556b5a33
});


UserSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.Password;

    return userObject;
}



export default mongoose.model<IUser>('User', UserSchema);