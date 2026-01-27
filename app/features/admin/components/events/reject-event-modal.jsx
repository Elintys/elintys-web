import AdminConfirmModal from "../admin-confirm-modal";

const RejectEventModal = ({
  event,
  rejectReason,
  onReasonChange,
  onCancel,
  onConfirm,
  t,
}) => (
  <AdminConfirmModal
    open={Boolean(event)}
    title={t("Refuser un evenement")}
    description={t("Indiquez un motif pour la moderation.")}
    confirmLabel={t("Confirmer le refus")}
    onCancel={onCancel}
    onConfirm={onConfirm}
  >
    <textarea
      value={rejectReason}
      onChange={(event) => onReasonChange(event.target.value)}
      placeholder={t("Motif du refus")}
      className="min-h-[120px] w-full rounded-xl border border-slate-200 p-3 text-sm"
    />
  </AdminConfirmModal>
);

export default RejectEventModal;
