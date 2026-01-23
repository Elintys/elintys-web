import VenuesClient from "./VenuesClient";
import { formatMessage, getMessage, resolveLocale } from "./lib/i18n";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }) {
  const resolvedSearchParams = (await searchParams) || {};
  const locale = resolveLocale(resolvedSearchParams);
  const city =
    typeof resolvedSearchParams?.city === "string" ? resolvedSearchParams.city : "";
  const title = city
    ? formatMessage(getMessage(locale, "venues.meta.titleWithCity"), { city })
    : getMessage(locale, "venues.meta.title");
  const description = city
    ? formatMessage(getMessage(locale, "venues.meta.descriptionWithCity"), { city })
    : getMessage(locale, "venues.meta.description");

  return {
    title,
    description,
  };
}

export default function VenuesPage() {
  return <VenuesClient />;
}
