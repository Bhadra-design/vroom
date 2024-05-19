import MeetingTypeList from "@/components/MeetingTypeList";
import Image from "next/image";
import React from "react";

const Home = () => {
  const now = new Date();

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    now
  );

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[400px] w-full rounded-[20px] bg-cover bg-hero">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[300px] rounded py-2 text-center text-base font-normal md:mx-5 md:mt-5">
            Upcoming Meetign at: 12:30 PM
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl md:px-5">
              {time}
            </h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl md:px-5 md:pb-5">
              {date}
            </p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
