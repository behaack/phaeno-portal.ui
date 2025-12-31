// import { useCallback, useEffect, useMemo, useState } from 'react';
// import { Outlet, useLocation, useNavigate } from '@tanstack/react-router';
// import { useInterval, useWindowEvent } from '@mantine/hooks';
// import { useAuthStore } from '@/_stores/auth.store';
// import { usePipelineHub } from '@/shared/hooks/usePipelineHub';
// import { useProactiveTokenRefresh } from '@/shared/hooks/useProactiveTokenRefresh';
// import { Route as SigninRoute} from '@/routes/auth/sign-in';
// ////import { FullScreenLoader, PModalConfirm } from '@/components/_index';
// //import { useDialogConfirmStore } from '@/stores/dialogConfirmStore';
// //import { useDatabase } from '@/hooks/useDatabase';
// //import { ILookupItem } from '@/assets/interfaces/_index';
// //import { EOrganizationType } from '@/assets/enums/_index';

// export default function PrivateLayout() {
//   const location = useLocation();
//   //const db = useDatabase();
//   const POLLING_FREQUENCY = 1000 * 10; // Every 10 seconds
//   const authStore = useAuthStore();
//   const navigate = useNavigate();
//   const [inactivityTicks, setInactivityTicks] = useState(0);
//   //const msgDialogStore = useDialogConfirmStore();

//   useProactiveTokenRefresh()
//   usePipelineHub();

//   useEffect(() => {
//     if (!authStore.isAuthenticated) {
//       const url = new URL(window.location.href);
//       const urlIsAuth = url.pathname.startsWith('/auth')

//       if (urlIsAuth) return;

//       navigate({
//         to: SigninRoute.to,
//         search: {
//           redirectTo: location.pathname,
//         },
//         replace: true
//       });    
//     }
//   }, [authStore.isAuthenticated])  

//   const AUTO_LOGOUT_TICK_COUNT = useMemo(() => {
//     const minutes = 100000 // GET FROM USER SETTINGS
//     if (typeof minutes === 'number') {
//       return minutes * (60000 / POLLING_FREQUENCY);
//     }
//     return null;
//   }, []) // TODO: NEED TO REPLACE WITH USER SETTINGS

//   useInterval(
//     () => {
//       setInactivityTicks((prev) => prev + 1);
//     },
//     POLLING_FREQUENCY,
//     { autoInvoke: true }
//   );

//   // useEffect(() => {
//   //   if (!authStore.isAuthenticated) { return }
//   //   if (!(authStore.authToken?.organization.organizationType === EOrganizationType.Customer)) { return }
    
//   //   db.httpGet<ILookupItem[]>(`samples/${authStore.authToken.organization.id}`, true).then(response => {
//   //     if (response.success) {
//   //       if (response.data) {
//   //         const data = [{
//   //             value: NIL,
//   //             label: '<All Samples>'
//   //           },
//   //           ...response.data
//   //         ]
//   //         authStore.setSamples(data)
//   //       }
//   //     }
//   //   })
//   // }, [authStore.authToken?.organization])

//   useEffect(() => {
//     if (import.meta.env.DEV) { return };

//     if (typeof AUTO_LOGOUT_TICK_COUNT !== 'number') { return };

//     if (inactivityTicks >= AUTO_LOGOUT_TICK_COUNT) {
//       //authStore.logout();
//     }
//   }, [inactivityTicks, AUTO_LOGOUT_TICK_COUNT, authStore.logout, navigate]);

//   const activityListener = useCallback(() => {
//     setInactivityTicks(0);
//   }, []);

//   useWindowEvent('mousemove', activityListener);
//   useWindowEvent('keydown', activityListener);

//   return (
//     <>
//       {/* <FullScreenLoader show={false} />
//       <PModalConfirm
//         title={msgDialogStore.title}
//         icon={msgDialogStore.icon}
//         opened={msgDialogStore.isOpen}
//         message={msgDialogStore.message}
//         onRespond={msgDialogStore.close}
//       /> */}
//       <Header />
//       <Outlet />
//     </>
//   );
// }

