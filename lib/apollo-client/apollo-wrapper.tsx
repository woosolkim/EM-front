"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  function makeClient() {
    const httpLink = new HttpLink({
      uri: process.env.NEXT_PUBLIC_API_ENDPOINT,
      headers: {},
    });

    return new NextSSRApolloClient({
      cache: new NextSSRInMemoryCache(),
      connectToDevTools: true,
      link:
        typeof window === "undefined"
          ? ApolloLink.from([
              new SSRMultipartLink({
                stripDefer: true,
              }),
              httpLink,
            ])
          : httpLink,
    });
  }

  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
