import StreamVideoProvider from "@/providers/StreamClientProvider";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "VROOm",
  description: "Video Conferencing Platform",
  icons: {
    icon: "/icons/logo.svg",
  }
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return <StreamVideoProvider>{children}</StreamVideoProvider>;
};

export default RootLayout;
