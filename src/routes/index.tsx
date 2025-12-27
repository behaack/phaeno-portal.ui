import { createFileRoute, Navigate } from '@tanstack/react-router';
import { NIL } from 'uuid';

export const Route = createFileRoute('/')({
  component: () => {
    return <Navigate 
            to="/browser" 
            search={{
              subject: 'transcript',
              sampleid: NIL,
              pageno: 1,
              direction: 'next'
            }}            
           />
  },
});

export default Route;