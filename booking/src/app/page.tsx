import React from "react";
import { connectDB } from "../config/dbConfig";
import { getMongoUserLoggedInUser, handlerNewUserRegistration } from "@/actions/users";
import EventModel from "@/models/eventmodel";
import { EventType } from "@/interfaces/events";
import Link from "next/link";
import Filters from "@/components/Filters";
connectDB();

interface Props {
  searchParams: {
    name: string;
    date: string;
  };
}

export default async function Home({ searchParams }: Props) {
  let filters = {};
  if (searchParams.name) {
    filters = {
      name: {
        $regex: searchParams.name,
        $options: 'i',
      }
    };
  }

  if (searchParams.date) {
    filters = {
      ...filters,
      date: searchParams.date
    };
  }

  await handlerNewUserRegistration();

  const mongoUserId = await getMongoUserLoggedInUser();
  const events: EventType[] = await EventModel.find(filters).sort({ createdAt: -1 }).exec() as EventType[];

  return (
    <div className="flex flex-col items-center mx-5 gap-1 md:flex-row md:items-start md:mx-5 md:gap-5 shadow-md bg-gray-800">
      <div className="flex flex-col gap-5 mt-5 shadow-md w-full sm:h-full lg:h-max xl:h-max">
        <Filters />
        {events.map((event) => (
          <div key={event._id} className="grid grid-cols-1 md:grid-cols-3 bg-gray-700 p-5 md:p-0 rounded-sm shadow-2xl w-full" >
            <div className="col-span-1">
              <img src={event?.images[0]}
                alt='Picture of the event'
                height={350}
                width={350}
                className="w-full h-full object-cover border rounded-l-sm shadow-md"
              />
            </div>
            <div className="col-span-2 flex flex-col justify-center gap-2 md:gap-2 md:justify-between md:p-2">
              <h1 className="font-semibold text-gray-200">
                {event?.name}
              </h1>
              <p className="text-gray-100 w-full line-clamp-3 text-sm">
                {event?.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <h1 className="text-gray-500 ">
                    <i className="ri-map-pin-line pr-5 text-white"></i>
                    {event?.location}
                  </h1>

                  <h1 className="text-gray-500 ">
                    <i className="ri-calendar-line pr-5 text-white"></i>
                    {event?.date} at{" "} {event?.time}
                  </h1>
                </div>
              </div>
              <div className="text-sm flex justify-start md:justify-end md:px-5 md:py-0">
                <Link
                  className='bg-white text-black px-2 py-1 rounded-md mr-1 
                font-semibold hover:bg-gray-300 duration-500 shadow-md md:py-2 md:mr-5 md:p-5'
                  href={`/book-event/${event._id}`}
                >
                  View Event
                </Link>
              </div>
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <div className="w-full mt-100 flex justify-center">
            <h1 className="text-md text-white">
              No events found for your search
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
