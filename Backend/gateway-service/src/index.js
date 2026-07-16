import dotenv from 'dotenv';
import connectDatabase from './db/index.js';
dotenv.config({
	path: './.env'
});


connectDatabase();












// import express from 'express';
// const app = express();

// (async () => {
// 	try {
// 		await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`, {
// 		});
// 		app.on('error', (err) => {
// 			console.error('Error connecting to MongoDB:', err);
// 		})
// 		app.listen(process.env.PORT, () => {
// 			console.log(`Server is running on port ${process.env.PORT}`);
// 		})
// 	} catch (error) {
// 		console.error('Error connecting to MongoDB:', error);
// 	}
// })()