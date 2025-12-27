import { ECodeProvider } from '@/assets/enums/_index';
import { IAuthUser, IOrganization } from '../_index';

interface IAuthToken {
  userId: string;
  tfaRequired: boolean;
  codeProvider: ECodeProvider;
  email: string;
  password: string;
  token: string;
  refreshToken: string;
  user: IAuthUser;
  organization: IOrganization;
  deviceId: string;
  deviceExpirationDate: string;
}

export default IAuthToken;
