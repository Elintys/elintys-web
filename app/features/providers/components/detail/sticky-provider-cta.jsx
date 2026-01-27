import Link from "next/link";
import { formatDetailPrice } from "../../utils/provider-formatters";

const StickyProviderCTA = ({ provider }) => (
  <>
    <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
          A partir de
        </p>
        <p className="mt-2 text-2xl font-semibold text-gray-900">
          {formatDetailPrice(provider.startingPrice?.amount, provider.startingPrice?.currency)}
        </p>
        <p className="text-xs text-gray-500">{provider.pricingModel || "-"}</p>
        <div className="mt-4 flex flex-col gap-2">
          <Link
            href={`/providers/${provider.id}/quote`}
            className="rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
          >
            Demander un devis
          </Link>
          <Link
            href={`/providers/${provider.id}/contact`}
            className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
          >
            Contacter
          </Link>
        </div>
      </div>
    </aside>
    <div className="lg:hidden">
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-100 bg-white/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-gray-400">A partir de</p>
            <p className="text-sm font-semibold text-gray-900">
              {formatDetailPrice(
                provider.startingPrice?.amount,
                provider.startingPrice?.currency
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/providers/${provider.id}/quote`}
              className="rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white"
            >
              Devis
            </Link>
            <Link
              href={`/providers/${provider.id}/contact`}
              className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600"
            >
              Contacter
            </Link>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default StickyProviderCTA;
