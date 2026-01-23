"use client";

import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function AiPage() {
  const [dateHint, setDateHint] = useState("");
  const [prediction, setPrediction] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatReply, setChatReply] = useState("");

  const handleDateSuggest = () => {
    setDateHint("Suggestion IA: samedi soir 19h pour maximiser la presence.");
  };

  const handlePredict = () => {
    setPrediction("Prediction IA: participation estimee a 350 personnes.");
  };

  const handleChat = () => {
    setChatReply("Assistant IA: consultez les evenements similaires dans la section recommandations.");
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">IA & automatisation</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-4 space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">Dates optimales</h2>
            <button
              type="button"
              onClick={handleDateSuggest}
              className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Suggere une date
            </button>
            {dateHint && <p className="text-sm text-gray-600">{dateHint}</p>}
          </div>
          <div className="bg-white rounded-xl shadow p-4 space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">Prediction participation</h2>
            <button
              type="button"
              onClick={handlePredict}
              className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Predire
            </button>
            {prediction && <p className="text-sm text-gray-600">{prediction}</p>}
          </div>
          <div className="bg-white rounded-xl shadow p-4 space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">Chatbot invite</h2>
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Posez une question"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            <button
              type="button"
              onClick={handleChat}
              className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Demander
            </button>
            {chatReply && <p className="text-sm text-gray-600">{chatReply}</p>}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
