import { connectDB } from "@/app/config/dbConfig";
import UserModel from "@/app/models/usermodel";
import { currentUser } from "@clerk/nextjs";

export const handlerNewUserRegistration = async () => {

    try {
        const loggedUser = await currentUser();

        //check if the user is already registered
        const userExists = await UserModel.findOne({ clerkUserId: loggedUser?.id});
        if(userExists) return userExists;

        //Create a new user;
        const newUser = new UserModel({
            userName: loggedUser?.username,
            email: loggedUser?.emailAddresses[0].emailAddress,
            clerkUserId: loggedUser?.id,
        });

        await newUser.save();
        return newUser;
    } catch (error:any) {
        throw new Error(error);
    };
};

export const getMongoUserLoggedInUser = async () => {

    try {
        const loggedInUser = await currentUser();
        const userInMongoDb= await UserModel.findOne({
            clerkUserId: loggedInUser?.id,
        });

        if(userInMongoDb) return userInMongoDb._id;
    } catch (error:any) {
        throw new Error(error);
    }

};