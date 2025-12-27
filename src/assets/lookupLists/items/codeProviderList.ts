import { ECodeProvider } from '@/assets/enums/_index';
import { IListItem } from '@/assets/interfaces/_index';

const codeProviderList: IListItem[] = [
  {
    value: ECodeProvider.GoogleAuth,
    label: 'Google Authenticator',
  },
  {
    value: ECodeProvider.EmailCode,
    label: 'Email',
  },
  {
    value: ECodeProvider.PhoneCode,
    label: 'SMS Text',
  },
];

export default codeProviderList;


