import { useCallback, useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProviderDetails } from "../../../store/slices/providersSlice";

export default function useProviderDetails() {
  const params = useParams();
  const providerId = params?.providerId;
  const dispatch = useDispatch();
  const provider = useSelector((state) => state.providers.detail);
  const status = useSelector((state) => state.providers.detailStatus);
  const error = useSelector((state) => state.providers.detailError);

  const fetchProvider = useCallback(() => {
    if (!providerId) return;
    dispatch(fetchProviderDetails(providerId));
  }, [dispatch, providerId]);

  useEffect(() => {
    fetchProvider();
  }, [fetchProvider]);

  return {
    provider,
    status,
    error,
    fetchProvider,
  };
}
