const TicketsList = ({ tickets, t }) => (
  <div className="grid gap-4">
    {tickets.map((ticket) => (
      <div
        key={ticket._id}
        className="bg-white rounded-2xl shadow border border-gray-100 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {ticket.eventTitle || t("Billet Elyntis")}
          </h3>
          <p className="text-sm text-gray-500">
            {t("Statut")}: {ticket.status || t("Actif")}
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-2">
          <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center text-xs text-gray-500">
            {t("QR Code")}
          </div>
          <button type="button" className="text-sm text-indigo-600 hover:underline">
            {t("Telecharger")}
          </button>
        </div>
      </div>
    ))}
    {!tickets.length && (
      <p className="text-sm text-gray-500">{t("Aucun billet disponible.")}</p>
    )}
  </div>
);

export default TicketsList;
