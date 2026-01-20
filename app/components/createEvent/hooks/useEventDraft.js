"use client";

import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addManualProvider,
  createEventDraft,
  patchEvent,
  removeManualProvider,
} from "../../../store/slices/eventsSlice";

const emptyDraft = {
  id: null,
  title: "",
  description: "",
  organizerId: null,
  categoryId: "",
  externalSourceId: "",
  timezone: "",
  startDate: "",
  endDate: "",
  isPublic: true,
  manualVenue: {
    name: "",
    address: "",
    city: "",
    country: "",
    capacity: {
      min: "",
      max: "",
    },
    notes: "",
  },
  manualProviders: [],
  status: "DRAFT",
};

export default function useEventDraft(initialDraft) {
  // Normalize provider items so the UI always has a stable id.
  const normalizeProviders = (list = []) =>
    list.map((item) => ({
      ...item,
      id: item.id || item._id,
    }));

  const [draft, setDraft] = useState(emptyDraft);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialDraft) {
      setDraft((prev) => ({
        ...prev,
        ...initialDraft,
        id: initialDraft._id || initialDraft.id || prev.id,
        manualProviders: normalizeProviders(
          initialDraft.manualProviders || prev.manualProviders
        ),
      }));
    }
  }, [initialDraft]);

  const handleError = (err, fallback) => {
    setError(err?.response?.data?.message || err?.message || fallback);
  };

  // Create the initial DRAFT and store the returned id.
  const createDraftAndSet = useCallback(async (data) => {
    setSaving(true);
    setError("");
    try {
      const action = await dispatch(createEventDraft(data));
      const payload = action.payload || {};
      setDraft((prev) => ({
        ...prev,
        ...data,
        ...payload,
        id: payload._id || payload.id || prev.id,
        manualProviders: normalizeProviders(payload.manualProviders || prev.manualProviders),
        status: payload.status || "DRAFT",
      }));
      return payload;
    } catch (err) {
      handleError(err, "Erreur lors de la creation du brouillon.");
      throw err;
    } finally {
      setSaving(false);
    }
  }, [dispatch]);

  // Patch any event fields after the draft exists.
  const updateEvent = useCallback(async (data) => {
    if (!draft.id) {
      return createDraftAndSet({ ...draft, ...data });
    }
    setSaving(true);
    setError("");
    try {
      const action = await dispatch(patchEvent({ id: draft.id, payload: data }));
      const payload = action.payload || {};
      setDraft((prev) => ({
        ...prev,
        ...data,
        ...payload,
        id: payload._id || payload.id || prev.id,
        manualProviders: normalizeProviders(payload.manualProviders || prev.manualProviders),
      }));
      return payload;
    } catch (err) {
      handleError(err, "Erreur lors de la mise a jour.");
      throw err;
    } finally {
      setSaving(false);
    }
  }, [draft.id, createDraftAndSet, draft, dispatch]);

  // Save manual venue details as a partial update.
  const updateManualVenue = useCallback(
    async (data) =>
      updateEvent({
        manualVenue: {
          ...data,
          capacity: {
            min: data.capacity?.min ? Number(data.capacity.min) : null,
            max: data.capacity?.max ? Number(data.capacity.max) : null,
          },
        },
      }),
    [updateEvent]
  );

  // Add a manual provider to the event.
  const addProvider = useCallback(
    async (provider) => {
      if (!draft.id) {
        const next = [...draft.manualProviders, provider];
        await createDraftAndSet({ ...draft, manualProviders: next });
        return;
      }
      setSaving(true);
      setError("");
      try {
        const action = await dispatch(addManualProvider({ id: draft.id, payload: provider }));
        const payload = action.payload || {};
        setDraft((prev) => ({
          ...prev,
          manualProviders: normalizeProviders(
            payload.manualProviders || [...prev.manualProviders, provider]
          ),
        }));
      } catch (err) {
        handleError(err, "Erreur lors de l'ajout du prestataire.");
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [draft, createDraftAndSet, dispatch]
  );

  // Remove a manual provider by id.
  const removeProvider = useCallback(
    async (providerId) => {
      if (!draft.id) {
        setDraft((prev) => ({
          ...prev,
          manualProviders: prev.manualProviders.filter(
            (item) => item.id !== providerId && item._id !== providerId
          ),
        }));
        return;
      }
      setSaving(true);
      setError("");
      try {
        const action = await dispatch(
          removeManualProvider({ id: draft.id, providerId })
        );
        const payload = action.payload || {};
        setDraft((prev) => ({
          ...prev,
          manualProviders: payload.manualProviders
            ? normalizeProviders(payload.manualProviders)
            : prev.manualProviders.filter(
                (item) => item.id !== providerId && item._id !== providerId
              ),
        }));
      } catch (err) {
        handleError(err, "Erreur lors de la suppression.");
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [draft.id, dispatch]
  );

  return {
    draft,
    setDraft,
    saving,
    error,
    createDraftAndSet,
    updateEvent,
    addProvider,
    removeProvider,
    updateManualVenue,
  };
}
