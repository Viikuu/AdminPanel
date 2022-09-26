import mongoose from 'mongoose';
import process from 'node:process';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true
		},
		email: {
			type: String,
			required: true,
			max:50,
			unique: true
		},
		password: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
	},
	{timestamps: true}

);

userSchema.methods.generateAuthToken = function () {
	return jwt.sign({
		_id: this._id,
		username: this.username,
	}, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '1d',
	});
};


const UserModel = mongoose.model('User', userSchema);

export {
	UserModel,
};
