const AccountForm = ({
  form,
  photoPreview,
  maxBioLength,
  currentUser,
  loading,
  message,
  onChange,
  onSubmit,
  t,
}) => (
  <form
    onSubmit={onSubmit}
    className="bg-white rounded-2xl shadow border border-gray-100 p-6 space-y-5"
  >
    <div className="grid md:grid-cols-[180px,1fr] gap-6 items-start">
      <div className="space-y-3">
        <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
          {photoPreview ? (
            <img
              src={photoPreview}
              alt={t("Photo de profil")}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm text-gray-400">{t("Aucun avatar")}</span>
          )}
        </div>
        <p className="text-xs text-gray-400">{t("Formats recommandes: JPG, PNG.")}</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("Nom d'affichage")}
          </label>
          <input
            name="display_name"
            value={form.display_name}
            onChange={onChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
            placeholder={t("Votre nom public")}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("Bio")}
          </label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={onChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
            rows={4}
            maxLength={maxBioLength}
            placeholder={t("Quelques mots sur vous")}
          />
          <p className="text-xs text-gray-400 mt-1">
            {form.bio.length}/{maxBioLength}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("Photo de profil (URL)")}
          </label>
          <input
            name="photo_url"
            value={form.photo_url}
            onChange={onChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
            placeholder="https://"
          />
        </div>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("Email")}
        </label>
        <input
          value={currentUser?.email || ""}
          readOnly
          className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-50 text-gray-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("Identifiant de compte")}
        </label>
        <input
          value={currentUser?.firebase_uid || currentUser?.id || ""}
          readOnly
          className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-50 text-gray-500"
        />
      </div>
    </div>

    <div className="flex flex-wrap items-center gap-3">
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
      >
        {loading ? t("Mise a jour...") : t("Enregistrer")}
      </button>
      {message && (
        <span
          className={`text-sm ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </span>
      )}
    </div>
  </form>
);

export default AccountForm;
