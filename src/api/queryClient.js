import { QueryClient } from '@tanstack/react-query';

// This creates the TanStack Query manager (cache + requests + mutations)
export const queryClient = new QueryClient();