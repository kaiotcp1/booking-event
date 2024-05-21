import react from "react";
import { connectDB } from "../config/dbConfig";
import { getMongoUserLoggedInUser, handlerNewUserRegistration } from "@/actions/users";
import EventModel from "@/models/eventmodel";
import { EventType } from "@/interfaces/events";
import Image from "next/image";
import Link from "next/link";
connectDB();


export default async function Home() {
  await handlerNewUserRegistration();

  const mongoUserId = await getMongoUserLoggedInUser();
  const events: EventType[] = await EventModel.find({}).sort({ createdAt: -1 }).exec() as EventType[];

  return (
    <div className="flex item-center m-1 gap-1 md:flex md:items-center md:mx-5 md:gap-5 shadow-md bg-gray-800">
      <div className="flex flex-col gap-5 mt-5 shadow-md">
        {events.map((event) => (
          <div key={event._id} className="grid grid-cols-1 md:grid-cols-3 bg-gray-700 p-5 md:p-0 rounded-sm shadow-2xl" >
            <div className="col-span-1">
              <img src={event.images[0]}
                alt='Picture of the event'
                height={250}
                width={250}
                className=" w-screen object-contain border rounded-l-sm shadow-md"
              />
            </div>
            <div className="col-span-2 flex flex-col justify-center gap-2  md:gap-5 md:justify-between md:p-5">
              <h1 className="font-semibold text-gray-200">
                {event.name}
              </h1>
              <p className="text-gray-100 w-full line-clamp-3 text-sm">
                {event.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <h1 className="text-gray-500 ">
                    <i className="ri-map-pin-line pr-5 text-white"></i>
                    {event.location}
                  </h1>

                  <h1 className="text-gray-500 ">
                    <i className="ri-calendar-line pr-5 text-white"></i>
                    {event.date} at{" "} {event.time}
                  </h1>
                </div>

                <Link
                  className='bg-white text-black px-2 py-1 rounded-md mr-1 
                font-semibold hover:bg-gray-300 duration-500 shadow-md md:py-2 md:mr-5 '
                  href={`/book-event/${event._id}`}
                >
                  View Event
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
