export default interface IUser {
  id: string;
  organizationId: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  isSetup: boolean;
  rowVersion: string;
}
