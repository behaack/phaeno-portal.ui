import { produce } from 'immer';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  emptyPagedList,
  IApiKey,
  IOrganization,
  IPagedList,
  IUser,
} from '@/assets/interfaces/_index';

export interface IEntityStoreState {
  user: IUser | null;
  userPagedList: IPagedList<IUser>;
  customer: IOrganization | null;
  customerPagedList: IPagedList<IOrganization>;
  apiKey: IApiKey | null;
  apiKeyPagedList: IPagedList<IApiKey>;
  setUser: (user: IUser | null) => void;
  setUserPagedList: (userPagedList: IPagedList<IUser>) => void;
  setCustomer: (customer: IOrganization | null) => void;
  setCustomerPagedList: (customerPagedList: IPagedList<IOrganization>) => void;
  setApiKey: (apiKey: IApiKey) => void;
  setApiKeyPagedList: (apiKeyPagedList: IPagedList<IApiKey>) => void;
}

export const useEntityStore = create<IEntityStoreState>()(
  devtools(
    (set) => ({
      user: null,
      userPagedList: emptyPagedList,
      customer: null,
      customerPagedList: emptyPagedList,
      apiKey: null,
      apiKeyPagedList: emptyPagedList,
      setUser: (user: IUser | null) => {
        set(
          produce<IEntityStoreState>((state) => {
            state.user = user;
          })
        );
      },
      setUserPagedList: (userPagedList: IPagedList<IUser>) => {
        set(
          produce<IEntityStoreState>((state) => {
            state.userPagedList = userPagedList;
          })
        );
      },
      setCustomer: (customer: IOrganization | null) => {
        set(
          produce<IEntityStoreState>((state) => {
            state.customer = customer;
          })
        );
      },
      setCustomerPagedList: (customerPagedList: IPagedList<IOrganization>) => {
        set(
          produce<IEntityStoreState>((state) => {
            state.customerPagedList = customerPagedList;
          })
        );
      },
      setApiKey: (apiKey: IApiKey | null) => {
        set(
          produce<IEntityStoreState>((state) => {
            state.apiKey = apiKey;
          })
        );
      },
      setApiKeyPagedList: (apiKeyPagedList: IPagedList<IApiKey>) => {
        set(
          produce<IEntityStoreState>((state) => {
            state.apiKeyPagedList = apiKeyPagedList;
          })
        );
      },
    }),
    {
      name: 'entityStore',
    }
  )
);
