import { useState } from "react";

export default function useAdminReports() {
  const [report, setReport] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("Signalement enregistre.");
    setReport("");
  };

  return {
    report,
    setReport,
    status,
    handleSubmit,
  };
}
