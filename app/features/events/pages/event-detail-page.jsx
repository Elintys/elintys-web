"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "../../../components/layout/navbar";
import useEventDetail from "../hooks/use-event-detail";
import EventHero from "../components/detail/event-hero";
import EventMeta from "../components/detail/event-meta";
import EventActions from "../components/detail/event-actions";
import EventDescription from "../components/detail/event-description";
import EventVenue from "../components/detail/event-venue";
import EventProviders from "../components/detail/event-providers";
import EventTickets from "../components/detail/event-tickets";
import EventOrganizerActions from "../components/detail/event-organizer-actions";
import EventMap from "../../../components/maps/EventMap";
import { geocodeAddress } from "../../../../utils/geocoding/nominatim";

export default function EventDetailPage() {
  const {
    eventId,
    event,
    loading,
    error,
    locationLabel,
    organizerLabel,
    categoryLabel,
    durationLabel,
    dateLabel,
    isOrganizer,
    tickets,
  } = useEventDetail();

  const manualLatitude = Number(event?.latitude);
  const manualLongitude = Number(event?.longitude);
  const hasManualCoordinates =
    Number.isFinite(manualLatitude) && Number.isFinite(manualLongitude);
  const [geocodeResult, setGeocodeResult] = useState(undefined);
  const addressFromEvent = useMemo(
    () => event?.address ?? event?.manualVenue?.address ?? "",
    [event?.address, event?.manualVenue?.address],
  );
  const sanitizedAddress = addressFromEvent.trim();
  const addressForGeocoding = hasManualCoordinates || !sanitizedAddress ? null : sanitizedAddress;
  const resolvedCoordinates = hasManualCoordinates
    ? { lat: manualLatitude, lng: manualLongitude }
    : geocodeResult;
  const shouldShowUnavailableNotice = !!addressForGeocoding && geocodeResult === null;

  useEffect(() => {
    if (!addressForGeocoding) {
      setGeocodeResult(undefined);
      return;
    }

    let active = true;
    setGeocodeResult(undefined);

    async function fetchCoordinates() {
      const coordinates = await geocodeAddress(addressForGeocoding);
      if (!active) {
        return;
      }
      setGeocodeResult(coordinates);
    }

    fetchCoordinates();

    return () => {
      active = false;
    };
  }, [addressForGeocoding]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <section className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 text-sm text-gray-500">
            Chargement...
          </div>
        </section>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <section className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 text-sm text-gray-500">
            {error || "Evenement introuvable."}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="container mx-auto px-4 py-10 space-y-8">
        <EventHero event={event} formattedDate={dateLabel} locationLabel={locationLabel} />

        <EventMeta
          dateLabel={durationLabel ? `${dateLabel} · ${durationLabel}` : dateLabel}
          locationLabel={locationLabel}
          categoryLabel={categoryLabel}
          organizer={organizerLabel}
        />

        <EventActions event={event} hasTickets={tickets.length > 0} />

        <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
          <div className="space-y-6">
            <EventDescription description={event.description} />
            <EventVenue venue={event.manualVenue} />
            {(resolvedCoordinates || shouldShowUnavailableNotice) && (
              <section className="bg-white rounded-2xl border border-gray-100 shadow p-6 space-y-3">
                <h2 className="text-xl font-semibold text-gray-900">Localisation</h2>
                {resolvedCoordinates ? (
                  <EventMap
                    latitude={resolvedCoordinates.lat}
                    longitude={resolvedCoordinates.lng}
                    height={280}
                  />
                ) : (
                  <p className="text-sm text-gray-500">Localisation indisponible</p>
                )}
              </section>
            )}
            <EventProviders providers={event.manualProviders} />
            <EventTickets tickets={tickets} />
          </div>
          <aside className="space-y-6">
            {isOrganizer && (
              <EventOrganizerActions eventId={eventId} status={event.status || "—"} />
            )}
            {tickets.length === 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900">Participation</h3>
                <p className="text-sm text-gray-500 mt-2">Participation gratuite</p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
