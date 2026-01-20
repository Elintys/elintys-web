"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StepperHeader from "./components/StepperHeader";
import BasicInfoStep from "./steps/BasicInfoStep";
import BrandingStep from "./steps/BrandingStep";
import DetailsStep from "./steps/DetailsStep";
import VenueStep from "./steps/VenueStep";
import ProvidersStep from "./steps/ProvidersStep";
import ReviewPublishStep from "./steps/ReviewPublishStep";
import {
  addManualProvider,
  createEventDraft,
  removeManualProvider,
  updateEvent,
  uploadCoverImage,
} from "../../store/slices/eventThunks";
import { getUserId } from "../../store/roleUtils";
import { setEventDraft } from "../../store/slices/eventSlice";

const steps = [
  "Infos de base",
  "Branding",
  "Details",
  "Lieu",
  "Prestataires",
  "Recapitulatif",
];

export default function CreateEventWizard({ initialDraft, mode = "create" }) {
  const dispatch = useDispatch();
  const draft = useSelector((state) => state.eventDraft);
  const currentUser = useSelector((state) => state.users.current);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (initialDraft) {
      dispatch(setEventDraft(initialDraft));
    }
  }, [dispatch, initialDraft]);

  useEffect(() => {
    if (step > 0 && !draft.id) {
      setStep(0);
    }
  }, [step, draft.id]);

  const organizerId = getUserId(currentUser) || draft.organizerId || "dev-user";

  const handleCreateDraft = async (payload) => {
    if (draft.id && mode === "edit") {
      await dispatch(updateEvent({ id: draft.id, payload }));
    } else {
      await dispatch(
        createEventDraft({
          ...payload,
          organizerId,
          status: "DRAFT",
        })
      );
    }
    setStep(1);
  };

  const handleUploadCover = async (file) => {
    await dispatch(uploadCoverImage(file));
  };

  const handleSaveCover = async () => {
    if (!draft.coverImageUrl) return;
    await dispatch(updateEvent({ id: draft.id, payload: { coverImageUrl: draft.coverImageUrl } }));
  };

  const handleSaveDetails = async (payload) => {
    await dispatch(updateEvent({ id: draft.id, payload }));
  };

  const handleSaveVenue = async (manualVenue) => {
    await dispatch(updateEvent({ id: draft.id, payload: { manualVenue } }));
  };

  const handleAddProvider = async (payload) => {
    await dispatch(addManualProvider({ id: draft.id, payload }));
  };

  const handleRemoveProvider = async (providerId) => {
    await dispatch(removeManualProvider({ id: draft.id, providerId }));
  };

  const handleSaveDraft = async () => {
    await dispatch(updateEvent({ id: draft.id, payload: { status: "DRAFT" } }));
  };

  const handlePublish = async () => {
    await dispatch(updateEvent({ id: draft.id, payload: { status: "PUBLISHED" } }));
  };

  return (
    <div className="space-y-6">
      <StepperHeader steps={steps} currentStep={step} />
      {draft.error && (
        <div className="bg-red-50 text-red-700 border border-red-100 rounded-xl p-3 text-sm">
          {draft.error?.message || draft.error}
        </div>
      )}
      {step === 0 && (
        <BasicInfoStep
          initialValues={draft}
          onSubmit={handleCreateDraft}
          saving={draft.loading}
        />
      )}
      {step === 1 && (
        <BrandingStep
          coverImageUrl={draft.coverImageUrl}
          onUpload={handleUploadCover}
          onSave={handleSaveCover}
          onBack={() => setStep(0)}
          onNext={() => setStep(2)}
          saving={draft.loading}
        />
      )}
      {step === 2 && (
        <DetailsStep
          initialValues={draft}
          onSave={handleSaveDetails}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
          saving={draft.loading}
        />
      )}
      {step === 3 && (
        <VenueStep
          initialValues={draft.manualVenue}
          onSave={handleSaveVenue}
          onBack={() => setStep(2)}
          onNext={() => setStep(4)}
          saving={draft.loading}
        />
      )}
      {step === 4 && (
        <ProvidersStep
          providers={draft.manualProviders || []}
          onAdd={handleAddProvider}
          onRemove={handleRemoveProvider}
          onBack={() => setStep(3)}
          onNext={() => setStep(5)}
          saving={draft.loading}
        />
      )}
      {step === 5 && (
        <ReviewPublishStep
          draft={draft}
          onBack={() => setStep(4)}
          onSaveDraft={handleSaveDraft}
          onPublish={handlePublish}
          saving={draft.loading}
        />
      )}
    </div>
  );
}
