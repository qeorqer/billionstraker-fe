export type User = {
  _id: string;
  login: string;
  created: Date;
  isFirstEnter: boolean;
  preferredCurrency: string | null;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  accessExpiration: number;
  user: User;
};

export type AuthError = {
  message: string;
};

export type AuthData = {
  login: string;
  password: string;
};

export type UpdateUserPayload = {
  updatedFields: Partial<User>;
};

export type UpdateUserResponse = {
  message: string;
  user: User;
};
