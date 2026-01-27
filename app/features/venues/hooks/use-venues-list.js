import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchVenues } from "../../../store/slices/venuesSlice";
import { buildVenueQuery } from "../utils/venue-query";
import { buildParamsObject, getCountLabel } from "../utils/venue-list-utils";

export default function useVenuesList(t) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsObject = useMemo(
    () => buildParamsObject(searchParams),
    [searchParams]
  );

  const { filters, queryParams } = useMemo(
    () => buildVenueQuery(paramsObject),
    [paramsObject]
  );

  const dispatch = useDispatch();
  const { list, meta, listStatus, listError } = useSelector((state) => state.venues);
  const [viewMode, setViewMode] = useState("grid");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    const requestParams = Object.fromEntries(queryParams.entries());
    dispatch(fetchVenues(requestParams));
  }, [dispatch, queryParams]);

  const handlePageChange = useCallback(
    (nextPage) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(nextPage));
      router.push(`?${params.toString()}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [router, searchParams]
  );

  const totalCount = meta.total || list.length;
  const countLabel = getCountLabel(totalCount, t);
  const error = listStatus === "failed" ? listError : null;

  return {
    filters,
    queryParams,
    list,
    meta,
    listStatus,
    error,
    viewMode,
    setViewMode,
    isFiltersOpen,
    setIsFiltersOpen,
    totalCount,
    countLabel,
    handlePageChange,
  };
}
