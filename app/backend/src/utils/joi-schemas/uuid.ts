import joi from 'joi';

const NOT_UUID_ID = '400/Id param must be an uuid string!';

export const uuidSchema = joi.string().guid().required().messages({
  'string.guid': NOT_UUID_ID,
});
