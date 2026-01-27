import { useEffect, useState } from "react";

const STORAGE_KEY = "elyntisVerification";

const loadVerification = () => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const saveVerification = (data) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export default function useProfileVerification() {
  const [docType, setDocType] = useState("");
  const [docId, setDocId] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const saved = loadVerification();
    if (saved) {
      setDocType(saved.docType || "");
      setDocId(saved.docId || "");
      setStatus(saved.status || "En attente");
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = { docType, docId, status: "En attente" };
    saveVerification(payload);
    setStatus("En attente");
  };

  return {
    docType,
    setDocType,
    docId,
    setDocId,
    status,
    handleSubmit,
  };
}
