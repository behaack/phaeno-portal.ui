import { ECodeProvider } from '@/assets/enums/_index';

export default interface IAuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  inactiveSignout: number | null;
  twoFactorProviderDefault: ECodeProvider;
}
