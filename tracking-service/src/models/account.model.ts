import mongoose, { Schema, Document } from 'mongoose';

export interface IAccount extends Document {
    accountId: number;
    accountName: string;
    isActive: boolean;
}

const accountModel: Schema = new Schema({
    accountId: { type: Number, required: true, unique: true },
    accountName: { type: String, required: true },
    isActive: { type: Boolean, required: true },
});

// Export the model and return your IUser interface
const Account = mongoose.model<IAccount>('Account', accountModel);
export default Account;
