import { useState } from "react";

export default function useAdminRules() {
  const [rules, setRules] = useState("");
  const [status, setStatus] = useState("");

  const handleSave = (event) => {
    event.preventDefault();
    setStatus("Regles mises a jour.");
  };

  return {
    rules,
    setRules,
    status,
    handleSave,
  };
}
