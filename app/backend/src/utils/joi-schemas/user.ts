import joi from 'joi';

const UNFILLED_NAME = '400/Name field must be filled';
const MIN_LENGTH_NAME = '400/Name field must have at leats 3 characters length';
const STRING_BASE = '400/{{#label}} field must be a string';
const UNFILLED_EMAIL = '400/Email field must be filled';
const INVALID_EMAIL =
  '400/Email field must follow the email pattern. e.g user@user.com';
const UNFILLED_PASSWORD = '400/Password field must be filled';
const MIN_LENGTH_PASSWORD =
  '400/Password field must have at leats 8 characters length';

export const username = joi
  .object({
    name: joi.string().min(3).required().messages({
      'any.required': UNFILLED_NAME,
      'string.empty': UNFILLED_NAME,
      'string.min': MIN_LENGTH_NAME,
      'string.base': STRING_BASE,
    }),
  })
  .unknown(true);

export const userEmail = joi
  .object({
    email: joi.string().email().required().messages({
      'any.required': UNFILLED_EMAIL,
      'string.empty': UNFILLED_EMAIL,
      'string.email': INVALID_EMAIL,
      'string.base': STRING_BASE,
    }),
  })
  .unknown(true);

export const userPassword = joi
  .object({
    password: joi.string().min(8).required().messages({
      'any.required': UNFILLED_PASSWORD,
      'string.empty': UNFILLED_PASSWORD,
      'string.min': MIN_LENGTH_PASSWORD,
      'string.base': STRING_BASE,
    }),
  })
  .unknown(true);

export const userOptionalEmail = joi
  .object({
    email: joi.string().email().messages({
      'string.email': INVALID_EMAIL,
      'string.empty': UNFILLED_EMAIL,
      'string.base': STRING_BASE,
    }),
  })
  .unknown(true);

export const userOptionalPassword = joi
  .object({
    password: joi.string().min(8).messages({
      'string.empty': UNFILLED_PASSWORD,
      'string.min': MIN_LENGTH_PASSWORD,
      'string.base': STRING_BASE,
    }),
  })
  .unknown(true);
