import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useLanguage } from "../../../i18n/language-provider";
import { fetchVenueById } from "../../../store/slices/venuesSlice";
import { buildVenueJsonLd } from "../utils/venue-detail-utils";

export default function useVenueDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { language } = useLanguage();
  const { current: venue, detailStatus } = useSelector((state) => state.venues);
  const locale = language === "en" ? "en" : "fr";

  useEffect(() => {
    if (id) {
      dispatch(fetchVenueById(id));
    }
  }, [dispatch, id]);

  const jsonLd = useMemo(() => {
    if (!venue) return null;
    return buildVenueJsonLd(venue);
  }, [venue]);

  const isLoading = detailStatus === "loading" && !venue;
  const isNotFound = !venue || detailStatus === "failed";

  return {
    venue,
    detailStatus,
    locale,
    jsonLd,
    isLoading,
    isNotFound,
  };
}
