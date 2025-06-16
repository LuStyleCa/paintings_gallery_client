import { Suspense } from "react";
import AdminContent from "./AdminContent";

export default function AdminPage() {
  return (
    <Suspense fallback={<div>Loading admin page...</div>}>
      <AdminContent />
    </Suspense>
  );
}