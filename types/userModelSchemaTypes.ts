export interface IUserSchema {
  _id: string;
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
  comparePassword(candidatePassword: string): Promise<boolean>;
}
