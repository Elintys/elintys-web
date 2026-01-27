export const buildParamsObject = (searchParams) => {
  const params = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
};

export const getCountLabel = (totalCount, t) =>
  totalCount === 1
    ? t("venues.list.countSingular")
    : t("venues.list.countPlural");
