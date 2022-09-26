import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {connection} from './utils/db.mjs';
import {userRoutes} from './routers/userRoutes.mjs';

const app = express();

dotenv.config();

app.use(cookieParser());
app.use(cors(
	{
		origin: 'https://admin-panel-public-7f3d.vercel.app',
		optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
		credentials: true,
	}
));

// app.use(function(req, res, next) {
// 	res.header('Content-Type', 'application/json;charset=UTF-8')
// 	res.header(
// 		'Access-Control-Allow-Headers',
// 		'Origin, X-Requested-With, Content-Type, Accept'
// 	)
// 	next()
// });

app.use(express.json());


app.use("/api/auth", userRoutes);

await connection();

app.listen(process.env.PORT, () => {
	console.log('Listening on Port ' + process.env.PORT);
});
