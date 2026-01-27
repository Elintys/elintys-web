"use client";

import Navbar from "../../../components/layout/navbar";
import Footer from "../../../components/layout/footer";
import LoginPromptModal from "../../../components/ui/login-prompt-modal";
import { useLanguage } from "../../../i18n/language-provider";
import useEventsList from "../hooks/use-events-list";
import EventsHeader from "../components/list/events-header";
import EventsFilters from "../components/list/events-filters";
import EventsGrid from "../components/list/events-grid";

export default function EventsPage() {
  const { language, t } = useLanguage();
  const locale = language === "en" ? "en-US" : "fr-FR";
  const {
    categories,
    query,
    setQuery,
    categoryId,
    setCategoryId,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    showFavorites,
    setShowFavorites,
    filteredEvents,
    handleSavePreferences,
    handleBecomeOrganizer,
    handleLoginRedirect,
    showLoginModal,
    setShowLoginModal,
    isOrganizer,
  } = useEventsList();

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <LoginPromptModal
        open={showLoginModal}
        onConfirm={handleLoginRedirect}
        title="Connexion requise"
        message="Vous devez d'abord vous connecter pour continuer. Redirection vers la page de connexion."
      />
      <section className="flex-1 container mx-auto px-4 py-10">
        <EventsHeader
          t={t}
          onBecomeOrganizer={handleBecomeOrganizer}
          isOrganizer={isOrganizer}
        />

        <EventsFilters
          t={t}
          categories={categories}
          query={query}
          onQueryChange={setQuery}
          categoryId={categoryId}
          onCategoryChange={setCategoryId}
          startDate={startDate}
          onStartDateChange={setStartDate}
          endDate={endDate}
          onEndDateChange={setEndDate}
          showFavorites={showFavorites}
          onToggleFavorites={setShowFavorites}
          onSavePreferences={handleSavePreferences}
        />

        <EventsGrid events={filteredEvents} locale={locale} t={t} />
      </section>
      <Footer />
    </main>
  );
}
