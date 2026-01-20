/**
 * @typedef {Object} PricingDTO
 * @property {string} model
 * @property {number} amount
 * @property {string} currency
 */

/**
 * @typedef {Object} ServiceOptionDTO
 * @property {string} label
 * @property {number} price
 */

/**
 * @typedef {Object} ServiceDTO
 * @property {string} id
 * @property {string} title
 * @property {string} category
 * @property {string} description
 * @property {PricingDTO} pricing
 * @property {ServiceOptionDTO[]} [options]
 */

/**
 * @typedef {Object} AvailabilityDTO
 * @property {string[]} days
 * @property {{ from: string, to: string }} hours
 */

/**
 * @typedef {Object} ProviderLocationDTO
 * @property {string} city
 * @property {string} [region]
 * @property {string} country
 */

/**
 * @typedef {Object} RatingDTO
 * @property {number} average
 * @property {number} count
 */

/**
 * @typedef {Object} StartingPriceDTO
 * @property {number} amount
 * @property {string} currency
 */

/**
 * @typedef {Object} ProviderDetailsDTO
 * @property {string} id
 * @property {string} userId
 * @property {string} displayName
 * @property {string} description
 * @property {string} [avatarUrl]
 * @property {string} [coverUrl]
 * @property {ProviderLocationDTO} location
 * @property {string[]} languages
 * @property {string[]} [tags]
 * @property {RatingDTO} rating
 * @property {boolean} isVerified
 * @property {ServiceDTO[]} services
 * @property {AvailabilityDTO} availability
 * @property {boolean} isAvailable
 * @property {number} [completedEvents]
 * @property {number|string} [responseRate]
 * @property {string} [mainCategory]
 * @property {StartingPriceDTO} [startingPrice]
 * @property {string} [pricingModel]
 * @property {string} [insuranceProvided]
 * @property {string} [licenseProvided]
 * @property {string} [cancellationPolicy]
 */

export {};
