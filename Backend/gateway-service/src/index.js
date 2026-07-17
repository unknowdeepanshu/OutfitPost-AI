import dotenv from 'dotenv';
import connectDatabase from './db/index.js';
dotenv.config({
	path: './.env'
});


connectDatabase()
.then(()=>{
	app.listen(process.env.PORT || 8000, () => {
		console.log(`Server is running on port ${process.env.PORT || 8000}`);
	})
})
.catch((error)=>{
	console.error("MongoDB connection failed !!!", error);
	process.exit(1); // Exit the process with an error code
})












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