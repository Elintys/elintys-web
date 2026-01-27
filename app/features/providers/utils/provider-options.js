import { getProviderLanguages } from "./provider-helpers";

export const extractOptions = (providers) => {
  const categories = new Set();
  const languages = new Set();

  providers.forEach((provider) => {
    if (Array.isArray(provider?.categories)) {
      provider.categories.forEach((category) => category && categories.add(category));
    }
    if (provider?.category) {
      categories.add(provider.category);
    }
    if (Array.isArray(provider?.services)) {
      provider.services.forEach((service) => {
        if (service?.category) categories.add(service.category);
      });
    }
    const providerLanguages = getProviderLanguages(provider);
    if (Array.isArray(providerLanguages)) {
      providerLanguages.forEach((language) => language && languages.add(language));
    }
  });

  return {
    categories: Array.from(categories),
    languages: Array.from(languages),
  };
};
