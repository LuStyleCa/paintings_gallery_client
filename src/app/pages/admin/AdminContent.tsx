"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "../../components/adminComponents/AdminSidebar";
import HomepageSettingsView from "../../components/adminComponents/HomepageSettingsView";
import GalleriesSettingsView from "../../components/adminComponents/GalleriesSettingsView";
import ContactSettingsView from "../../components/adminComponents/ContactSettingsView";
import AboutSettingsView from "../../components/adminComponents/AboutSettingsView";
import { contentManagementService } from "../../services/ContentManagementService";
import { ContentManagementModel } from "../../models/ContentManagement-model";
import { useSearchParams } from "next/navigation";

export default function AdminContent() {
  const [contentManagement, setContentManagement] =
    useState<ContentManagementModel | null>(null);

  const searchParams = useSearchParams();
  const viewParam = searchParams.get("view");

  const [activeView, setActiveView] = useState<
    "home" | "galleries" | "contact" | "about"
  >("home");

  useEffect(() => {
    const fetchContentManagement = async () => {
      const data = await contentManagementService.getContentManagement();
      setContentManagement(data);
    };

    fetchContentManagement();
  }, []);

  useEffect(() => {
    if (
      viewParam &&
      ["home", "galleries", "contact", "about"].includes(viewParam)
    ) {
      setActiveView(viewParam as typeof activeView);
    }
  }, [viewParam]);

  const views = {
    home: <HomepageSettingsView contentManagement={contentManagement} />,
    galleries: <GalleriesSettingsView />,
    contact: <ContactSettingsView contentManagement={contentManagement} />,
    about: <AboutSettingsView contentManagement={contentManagement} />,
  };

  return (
    <div className="flex">
      {/* Sidebar - responsive width */}
      <div
        className="fixed top-14 left-0 h-[calc(100vh-3.5rem)] bg-slate-900 text-white overflow-y-auto
                  w-16 md:w-64 transition-all duration-300 ease-in-out mt-4"
      >
        <AdminSidebar onSelect={setActiveView} />
      </div>

      {/* Main content area */}
      <div className="bg-zinc-700 ml-16 md:ml-64 mt-14 w-full h-[calc(100vh-3.5rem)] overflow-y-auto transition-all duration-300">
        <div>{views[activeView]}</div>
      </div>
    </div>
  );
}
