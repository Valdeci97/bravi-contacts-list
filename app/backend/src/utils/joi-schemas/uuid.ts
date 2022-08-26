import joi from 'joi';

const NOT_UUID_ID = '400/Id param must be an uuid string!';
const NOT_AVAILABLE_BODY_ID = '400/id field must be filled!';

export const uuidSchema = joi.string().guid().required().messages({
  'string.guid': NOT_UUID_ID,
});

export const uuidBodySchema = joi
  .object({
    id: joi.string().guid().required().messages({
      'any.required': NOT_AVAILABLE_BODY_ID,
      'string.guid': NOT_UUID_ID,
    }),
  })
  .unknown(true);
