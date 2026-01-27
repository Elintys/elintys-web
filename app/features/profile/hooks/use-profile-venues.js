import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyVenues } from "../../../store/slices/venuesSlice";

export default function useProfileVenues() {
  const dispatch = useDispatch();
  const venues = useSelector((state) => state.venues.list);

  useEffect(() => {
    console.log("[profile] GET /venues/me");
    dispatch(fetchMyVenues());
  }, [dispatch]);

  return { venues };
}
