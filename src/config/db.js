import mongoose from 'mongoose';

const connectDB = async () => {
	const CONNECTION_URL = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.csrtf.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;

	await mongoose
		.connect(CONNECTION_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})
		.then(() => {
			console.log('Database connected.');
		});
};

export default connectDB;
