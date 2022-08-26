import joi from 'joi';

const UNFILLED_PHONE = '400/Phone field must be filled';
const PHONE_LENGTH = '400/Phone field must have exactly 11 characters length';
const UNFILLED_WHATSAPP = '400/Whatsapp field must be filled';
const BOOLEAN_BASE = '400/Whatsapp field must be boolean';
const UNFILLED_EMAIL = '400/Email field must be filled';
const INVALID_EMAIL =
  '400/Email field must follow the email pattern. e.g user@user.com';
const STRING_BASE = '400/This field must be a string';

export const contactPhone = joi
  .object({
    phone: joi.string().length(11).required().messages({
      'any.required': UNFILLED_PHONE,
      'string.empty': UNFILLED_PHONE,
      'string.length': PHONE_LENGTH,
      'string.base': STRING_BASE,
    }),
  })
  .unknown(true);

export const contactWhatsapp = joi
  .object({
    whatsapp: joi.bool().required().messages({
      'any.required': UNFILLED_WHATSAPP,
      'boolean.base': BOOLEAN_BASE,
    }),
  })
  .unknown(true);

export const contactEmail = joi
  .object({
    email: joi.string().email().required().messages({
      'any.required': UNFILLED_EMAIL,
      'string.email': INVALID_EMAIL,
      'string.base': STRING_BASE,
    }),
  })
  .unknown(true);
