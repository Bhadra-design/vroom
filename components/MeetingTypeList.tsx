"use client";

import Image from "next/image";
import HomepageCard from "./HomepageCard";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import ReactDatePicker from "react-datepicker";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduledMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const { toast } = useToast();

  const createMeeting = async () => {
    if (!user || !client) return;

    try {
      if (!values.dateTime) {
        toast({
          title: "Please select a date and time",
        });
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create the call");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting created successfully",
      });
    } catch (error) {
      toast({
        title: "Failed to create meeting",
      });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
      <HomepageCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        className="bg-orange-1"
        handleClick={() => setMeetingState("isInstantMeeting")}
      />
      <HomepageCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Have an invitation link?"
        className="bg-blue-1"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
      <HomepageCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Schedule a meeting"
        className="bg-purple-1"
        handleClick={() => setMeetingState("isScheduledMeeting")}
      />
      <HomepageCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Recordings of your meetings"
        className="bg-yellow-1"
        handleClick={() => router.push("/recordings")}
      />
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduledMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Schedule a Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-4">
            <label className="text-base text-normal leading-[22px] text-sky-2">
              Descrption for the meeting:{" "}
            </label>
            <Textarea
              className="w-full  resize-none border-none bg-dark-3 p-2 text-white focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Description"
              onChange={(e) => {
                setValues({ ...values, description: e.target.value });
              }}
            />
            
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label>Select Date and Time</label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat={"MMMM d, yyyy h:mm aa"}
              className="w-full rounded bg-dark-3 p-2 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduledMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeitng Scheduled"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Meeting link copied to clipboard",
            });
          }}
          image={"/icons/checked.svg"}
          buttonIcon={"/icons/copy.svg"}
          buttonText="Copy Link"
        />
      )}
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
