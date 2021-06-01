import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
			min: 3,
			max: 20,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
			min: 3,
			max: 20,
		},
		username: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			index: true,
			lowercase: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ['user', 'admin', 'super-admin'],
			default: 'user',
		},
		contactNumber: { type: String },
		profilePicture: { type: String },
	},
	{ timestamps: true }
);

// userSchema.virtual('password')
// .set(function(password){
//     this.hash_password = bcrypt.hashSync(password, 10);
// });

UserSchema.virtual('fullName').get(function () {
	return `${this.firstName} ${this.lastName}`;
});

UserSchema.methods = {
	authenticate: async function (password) {
		return await bcrypt.compare(password, this.password);
	},
};

export default mongoose.model('User', UserSchema);
