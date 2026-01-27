"use client";

import { useEffect, useState } from "react";
import BasicInfoStep from "./steps/basic-info-step";
import DetailsStep from "./steps/details-step";
import VenueStep from "./steps/venue-step";
import ProvidersStep from "./steps/providers-step";
import ReviewPublishStep from "./steps/review-publish-step";
import StepperHeader from "./components/stepper-header";
import useEventDraft from "./hooks/use-event-draft";

const steps = ["Infos de base", "Details", "Lieu", "Prestataires", "Recapitulatif"];

export default function CreateEventWizard({ initialDraft, mode = "create" }) {
  const [step, setStep] = useState(0);
  const [venueSaved, setVenueSaved] = useState(false);
  const {
    draft,
    setDraft,
    saving,
    error,
    createDraftAndSet,
    updateEvent,
    addProvider,
    removeProvider,
    updateManualVenue,
  } = useEventDraft(initialDraft);

  // If the draft ID is missing, force the user back to step 1.
  useEffect(() => {
    if (step > 0 && !draft.id) {
      setStep(0);
    }
  }, [step, draft.id]);

  useEffect(() => {
    if (draft.manualVenue?.name && draft.manualVenue?.address) {
      setVenueSaved(true);
    }
  }, [draft.manualVenue]);

  const handleBasicInfo = async (data) => {
    const payload = {
      ...data,
      organizerId: data.organizerId || draft.organizerId || "dev-user",
    };
    if (mode === "edit" && draft.id) {
      await updateEvent(payload);
    } else {
      await createDraftAndSet(payload);
    }
    setStep(1);
  };

  const handleDetails = async (data) => {
    await updateEvent(data);
    setStep(2);
  };

  const handleVenueChange = (value) => {
    setDraft((prev) => ({ ...prev, manualVenue: value }));
    setVenueSaved(false);
  };

  const handleSaveVenue = async (value) => {
    await updateManualVenue(value);
    setVenueSaved(true);
  };

  const handleAddProvider = async (provider) => {
    await addProvider(provider);
  };

  const handleUpdateProvider = async (provider) => {
    if (provider.id) {
      await removeProvider(provider.id);
    }
    await addProvider(provider);
  };

  const handleRemoveProvider = async (providerId) => {
    await removeProvider(providerId);
  };

  const handleSaveDraft = async () => {
    await updateEvent({ status: "DRAFT" });
  };

  const handlePublish = async () => {
    await updateEvent({ status: "PUBLISHED" });
  };

  return (
    <div className="space-y-6">
      <StepperHeader steps={steps} currentStep={step} />
      {error && (
        <div className="bg-red-50 text-red-700 border border-red-100 rounded-xl p-3 text-sm">
          {error}
        </div>
      )}
      {step === 0 && (
        <BasicInfoStep
          initialValues={draft}
          onSubmit={handleBasicInfo}
          saving={saving}
          nextLabel={
            mode === "edit" ? "Enregistrer et continuer" : "Creer le brouillon et continuer"
          }
        />
      )}
      {step === 1 && (
        <DetailsStep
          initialValues={draft}
          onSave={handleDetails}
          onBack={() => setStep(0)}
          saving={saving}
        />
      )}
      {step === 2 && (
        <VenueStep
          value={draft.manualVenue}
          onChange={handleVenueChange}
          onSave={handleSaveVenue}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
          saving={saving}
          showWarning={!venueSaved}
        />
      )}
      {step === 3 && (
        <ProvidersStep
          providers={draft.manualProviders}
          onAdd={handleAddProvider}
          onRemove={handleRemoveProvider}
          onUpdate={handleUpdateProvider}
          onBack={() => setStep(2)}
          onNext={() => setStep(4)}
          saving={saving}
        />
      )}
      {step === 4 && (
        <ReviewPublishStep
          draft={draft}
          onBack={() => setStep(3)}
          onSaveDraft={handleSaveDraft}
          onPublish={handlePublish}
          saving={saving}
        />
      )}
    </div>
  );
}
