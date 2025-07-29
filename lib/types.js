// lib/types.js
/** @typedef {'pending' | 'opened' | 'processed' | 'done'} TicketStatus */

/** @typedef {'Hoch' | 'Mittel' | 'Niedrig'} Priority */

/**
 * @typedef {Object} Ticket
 * @property {string} id
 * @property {string} mieter
 * @property {string} ansprechpartner
 * @property {string} telefonnummer
 * @property {string} email
 * @property {string} adresse
 * @property {string} mieteinheit
 * @property {string} vertragsnummer
 * @property {string} titel
 * @property {string} beschreibung
 * @property {string} gebaeudeteil
 * @property {string} etage
 * @property {string} raumbezeichnung
 * @property {string} zusatzlage
 * @property {string[]} tga_categories
 * @property {string[]} allgemein_categories
 * @property {string[]} miet_categories
 * @property {string[]} sicherheit_categories
 * @property {string} sonstiges_tga
 * @property {string} sonstiges_allgemein
 * @property {string} sonstiges_miet
 * @property {string} sonstiges_sicherheit
 * @property {Priority} dringlichkeit
 * @property {boolean} zugang_erforderlich
 * @property {string} timefenster
 * @property {string} zutrittsregelungen
 * @property {boolean} datenschutz
 * @property {string[]} files
 * @property {TicketStatus} status
 * @property {string} created_at
 * @property {string} updated_at
 */

export {};