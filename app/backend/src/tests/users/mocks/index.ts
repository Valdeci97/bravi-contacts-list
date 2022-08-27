export const VALID_TOKEN =
  'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY3MGNiNGNlLTk0MmEtNGQ5ZS05NjU1LTFiZmYxMTc0NjU0OCIsImlhdCI6MTY2MTU2MzA1NX0.iuCNsSIyxFiTlK25byeP-Y-bP5uTrfk60SS8VyubiY8oUXmPh6HPqTDRKH3Cfde4EeQGKdT9-VBXMd-sIeO2Ug';

export const users = [
  {
    id: 'f70cb4ce-942a-4d9e-9655-1bff11746548',
    name: 'usuário teste',
    email: 'user@user.com',
  },
];

export const validUser = {
  name: 'usuario novo da silva',
  email: 'novo.silva@user.com',
  password: '12345678',
};

export const createdUser = {
  id: 'abc34',
  ...validUser,
};

export const updatedUser = {
  id: 'f70cb4ce-942a-4d9e-9655-1bff11746548',
  name: 'usuário novo da silva',
  email: 'novo.silva@user.com',
  password: '12345678',
};
