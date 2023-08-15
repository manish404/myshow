import '@/styles/w3.css'
import '@/styles/globals.css'
import '@/styles/index.css'
import '@/styles/loader.css'
import '@/styles/scrollbar.css'
import '@/styles/magic.min.css'
// 
import { Provider } from 'react-redux'
import store from '@/store'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import AuthContextProvider from '@/contexts/AuthContext'

const queryClient = new QueryClient();

export default function App({ Component, pageProps: { ...pageProps } }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </QueryClientProvider>
    </Provider>
  )
}
