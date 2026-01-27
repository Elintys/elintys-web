import { memo } from "react";
import ProviderCard from "./provider-card";
import LoadingSkeleton from "./loading-skeleton";
import EmptyState from "./empty-state";
import ErrorState from "./error-state";
import { getProviderId } from "../../utils/provider-helpers";

const ProviderCardMemo = memo(ProviderCard);

const ProvidersResults = ({
  status,
  error,
  providers,
  viewMode,
  hasDateFilter,
  comparison,
  onToggleCompare,
  onRetry,
}) => {
  if (status === "loading") {
    return (
      <div className="grid gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <LoadingSkeleton key={`skeleton-${index}`} viewMode={viewMode} />
        ))}
      </div>
    );
  }

  if (status === "error") {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (!providers.length) {
    return <EmptyState hasDateFilter={hasDateFilter} />;
  }

  return (
    <div
      className={`grid gap-4 ${
        viewMode === "grid" ? "md:grid-cols-2 xl:grid-cols-3" : ""
      }`}
    >
      {providers.map((provider, index) => {
        const providerId = getProviderId(provider);
        return (
          <ProviderCardMemo
            key={providerId || `provider-${index}`}
            provider={provider}
            viewMode={viewMode}
            isSelected={Boolean(comparison[providerId])}
            onToggleCompare={onToggleCompare}
          />
        );
      })}
    </div>
  );
};

export default ProvidersResults;
