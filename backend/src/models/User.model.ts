import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { type Document, type Model, model, Schema } from "mongoose";
import { EnvVariables } from "../common/enums/index.js";

export interface IUser extends Document {
	firstName: string;
	lastName: string;
	email: string;
	password?: string;
	avatar?: string;
	googleId?: string;
	createJWT(): string;
	comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUser> {}

const UserSchema = new Schema<IUser>(
	{
		firstName: { type: String, required: true, unique: true },
		lastName: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: false },
		avatar: { type: String, required: false },
		googleId: { type: String, required: false },
	},
	{
		timestamps: true,
	},
);

UserSchema.pre<IUser>("save", async function (next) {
	if (!this.isModified("password") || !this.password) return;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

UserSchema.methods.createJWT = function (): string {
	return jwt.sign(
		{ userId: this._id, name: `${this.firstName} ${this.lastName}` },
		EnvVariables.JWT_SECRET as string,
		{
			expiresIn: "1h",
		},
	);
};

UserSchema.methods.comparePassword = async function (
	candidatePassword: string,
): Promise<boolean> {
	if (!this.password) return false;
	return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.set("toJSON", {
	transform: (_doc, ret) => {
		delete ret.password;
		return ret;
	},
});

const User = model<IUser, IUserModel>("User", UserSchema);
export { User };
