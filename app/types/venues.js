/**
 * @typedef {Object} VenueRatingDTO
 * @property {number} average
 * @property {number} count
 */

/**
 * @typedef {Object} VenueLocationDTO
 * @property {string} address
 * @property {string} [city]
 * @property {string} [country]
 * @property {{ type: string, coordinates: number[] }} [geo]
 */

/**
 * @typedef {Object} VenueCapacityDTO
 * @property {number} [seated]
 * @property {number} [standing]
 * @property {number} [banquet]
 * @property {number} [conference]
 * @property {number} [min]
 * @property {number} [max]
 */

/**
 * @typedef {Object} VenueAmenityDTO
 * @property {string} code
 * @property {string} [label]
 * @property {boolean} [included]
 */

/**
 * @typedef {Object} VenuePricingExtraDTO
 * @property {string} label
 * @property {number} amount
 */

/**
 * @typedef {Object} VenuePricingDTO
 * @property {string} model
 * @property {number} [baseAmount]
 * @property {string} [currency]
 * @property {number} [minimumHours]
 * @property {VenuePricingExtraDTO[]} [extras]
 */

/**
 * @typedef {Object} VenueAvailabilityRuleDTO
 * @property {string[]} [days]
 * @property {{ from?: string, to?: string }} [hours]
 */

/**
 * @typedef {Object} VenueAvailabilityExceptionDTO
 * @property {string} date
 * @property {string} status
 * @property {string} [from]
 * @property {string} [to]
 */

/**
 * @typedef {Object} VenueAvailabilitySlotDTO
 * @property {string} date
 * @property {string} from
 * @property {string} to
 * @property {boolean} [isBooked]
 */

/**
 * @typedef {Object} VenueAvailabilityDTO
 * @property {VenueAvailabilityRuleDTO[]} [rules]
 * @property {VenueAvailabilityExceptionDTO[]} [exceptions]
 * @property {VenueAvailabilitySlotDTO[]} [slots]
 */

/**
 * @typedef {Object} VenueRulesDTO
 * @property {boolean} [smoking]
 * @property {boolean} [alcoholAllowed]
 * @property {string} [noiseLimit]
 * @property {boolean} [cleaningRequired]
 * @property {string} [cancellationPolicy]
 * @property {boolean} [insuranceRequired]
 * @property {boolean} [depositRequired]
 */

/**
 * @typedef {Object} VenueMediaDTO
 * @property {string[]} [images]
 */

/**
 * @typedef {Object} VenueListItemDTO
 * @property {string} id
 * @property {string} title
 * @property {string} city
 * @property {string} mainImage
 * @property {number} capacityMax
 * @property {{ model: string, baseAmount: number }} pricing
 * @property {string[]} amenities
 * @property {{ average: number, count: number }} rating
 * @property {boolean} isVerified
 */

/**
 * @typedef {Object} VenueDetailsDTO
 * @property {string} id
 * @property {string} [title]
 * @property {string} [description]
 * @property {VenueLocationDTO} [location]
 * @property {VenueCapacityDTO} [capacity]
 * @property {VenueRatingDTO} [rating]
 * @property {boolean} [isVerified]
 * @property {string[]} [eventTypes]
 * @property {VenueAmenityDTO[]} [amenities]
 * @property {VenuePricingDTO} [pricing]
 * @property {VenueAvailabilityDTO} [availability]
 * @property {VenueRulesDTO} [rules]
 * @property {VenueMediaDTO} [media]
 * @property {string} [visibility]
 * @property {number} [responseTime]
 */

export {};
