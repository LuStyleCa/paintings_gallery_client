"use client";

import { useState } from "react";
import { contactPageService } from "../../services/ContactPageService";
import toast from "react-hot-toast";
import { ContentManagementModel } from "../../models/ContentManagement-model";

interface ContactSettingsViewProps {
    contentManagement: ContentManagementModel | null;
}

export default function ContactSettingsView({contentManagement}: ContactSettingsViewProps) {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");

  const handleSaveContactPage = async () => {
    toast.loading("Saving...");
    try {
      await contactPageService.saveContactPage(email, phoneNumber, location);
      toast.dismiss();
      toast.success("Saved successfully!");
    } catch (err) {
      console.log(err);
      toast.dismiss();
      toast.error("Failed to save.");
    }
  };

  return (
    <div className="p-4">
      <label>Email</label>
      <input
        type="text"
        className="border p-2 w-full"
        value={email}
        placeholder={contentManagement?.contactPage?.email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Phone</label>
      <input
        type="text"
        className="border p-2 w-full"
        value={phoneNumber}
        placeholder={contentManagement?.contactPage?.phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <label>Location</label>
      <input
        type="text"
        className="border p-2 w-full"
        value={location}
        placeholder={contentManagement?.contactPage?.location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleSaveContactPage}>Save</button>
    </div>
  );
}
