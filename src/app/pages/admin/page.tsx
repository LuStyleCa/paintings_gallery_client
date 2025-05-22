"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import HomepageSettingsView from "../../components/HomepageSettingsView";
import GalleriesSettingsView from "../../components/GalleriesSettingsView";
import ContactSettingsView from "../../components/ContactSettingsView";
import AboutSettingsView from "../../components/AboutSettingsView";
import { contentManagementService } from "../../services/ContentManagementService";
import { ContentManagementModel } from "../../models/ContentManagement-model";
import { useSearchParams } from "next/navigation";

export default function Admin() {
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
      {/* Sidebar - fixed, no scroll */}
      <div className="fixed top-14 left-0 w-64 h-[calc(100vh-3.5rem)] bg-slate-900 text-white overflow-y-auto">
        <AdminSidebar onSelect={setActiveView} />
      </div>

      {/* Main content area */}
      <div className="ml-64 mt-14 w-full h-[calc(100vh-3.5rem)] overflow-y-auto">
        <div className="p-4">{views[activeView]}</div>
      </div>
    </div>
  );
}
