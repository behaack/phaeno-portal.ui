import { createFileRoute, Navigate } from '@tanstack/react-router';
import { NIL } from 'uuid';

export const Route = createFileRoute('/')({
  component: () => {
    return <Navigate 
            to="/app/browser" 
           />
  },
});

export default Route;