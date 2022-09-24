import {UserModel} from '../models/userModel.mjs';
import bcrypt from 'bcrypt';
import process from 'node:process';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {BlackList} from '../models/tokenblacklist.mjs';

dotenv.config();

const register = async (request, response, next) => {
	try {
		const {name, email, password} = request.body;
		const nameCheck = await UserModel.findOne({name});
		if (nameCheck) {
			return response.json({message: 'Username already used', status: false});
		}
		const emailCheck = await UserModel.findOne({email});
		if (emailCheck) {
			return response.json({message: 'Email already used', status: false});
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await UserModel.create({
			email,
			name,
			password: hashedPassword,
			status: 'active',
		})
		delete user.password;

		const token = await user.generateAuthToken();
		response.cookie('token', token, {
			httpOnly: true,
		});

		return response.json({status: true});
	} catch (error) {
		next(error);
	}
}

const login = async (request, response) => {
	try {
		const {name, password} = request.body;
		const user = await UserModel.findOne({name});
		if (!user) {
			return response.json({message: 'Incorrect username or password', status: false});
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return response.json({message: 'Incorrect username or password', status: false});
		}
		delete user.password;
		if(user.status === "blocked") {
			return response.json({message: 'User blocked', status: false});
		}
		const token = await user.generateAuthToken();
		response.cookie('token', token);
		return response.json({status: true});
	} catch (error) {

	}
}

const user = async (request, response, next) => {
	try {
		const user = await UserModel.findOne({_id: request.id}).select([
			'name',
			'_id',
			'status'
		]);
		return response.json({status: true, user})
	} catch (error) {
		next(error);
	}
}

const allusers = async (request, response, next) => {
	try {
		const users = await UserModel.find().select([
			'name',
			'email',
			'_id',
			'createdAt',
			'updatedAt',
			'status'
		]);
		return response.json({status: true, users})
	} catch (error) {
		next(error);
	}
}

const logout = async (request, response, next) => {
	try {
		const token = request.cookies.token;
		response.clearCookie('token');
		let _id;
		try {
			_id = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		} catch (error) {
			return response.json({status: true, message: 'Logged out successfully'});
		}
		if (_id !== undefined) {
			await BlackList.create({
				name:token,
			});
			return response.json({status: true, message: 'Logged out successfully'});
		}
	} catch (error) {
		next(error);
	}
}

const blockUsers = async (request, response, next) => {
	try {
		const ids = request.body;
		for (let _id of ids) {
			await UserModel.findOneAndUpdate({_id},
				{status: 'blocked'}
			);
		}
		try {
			if (ids.includes(request.id)) {
				response.clearCookie('token');
				return response.json({status: true, message: 'Unauthorized'});
			}
		} catch (error) {
			next(error);
		}
		return response.json({status: true});
	} catch (error) {
		next(error);
	}
}

const unBlockUsers = async (request, response, next) => {
	try {
		const ids = request.body;
		for (let _id of ids) {
			await UserModel.findOneAndUpdate(_id,
				{status: 'active'}
			);
		}
		return response.json({status: true});
	} catch (error) {
		next(error);
	}
}


const deleteUsers = async (request, response, next) => {
	try {
		const ids = request.body;
		for (let _id of ids) {
			await UserModel.findByIdAndDelete(_id);
		}
		try {
			const ids = request.body;
			if (ids.includes(request.id)) {
				response.clearCookie('token');
				return response.json({status: true, message: 'Unauthorized'});
			}
		} catch (error) {
			next(error);
		}
		return response.json({status: true});
	} catch (error) {
		next(error);
	}
}

export {
	register,
	login,
	allusers,
	blockUsers,
	logout,
	deleteUsers,
	unBlockUsers,
	user,
};
