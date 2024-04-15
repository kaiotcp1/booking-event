import react from "react";
import { UserButton, auth } from "@clerk/nextjs";
import { connectDB } from "./config/dbConfig";
import { getMongoUserLoggedInUser, handlerNewUserRegistration } from "@/actions/users";
connectDB();


export default async function Home() {
await handlerNewUserRegistration();

const mongoUserId = await getMongoUserLoggedInUser();
console.log("mongo user id is: ", mongoUserId);
  return (
    <div className="">
      <h1>HomePage</h1>
    </div>
    
  );
}
