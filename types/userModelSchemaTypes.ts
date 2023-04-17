export interface IUserSchema {
  name: string;
  email: {
    type: string;
    validate: {
      validator: (value: string) => boolean;
      message: string;
    };
  };
  password: string;
  role: string;
}
