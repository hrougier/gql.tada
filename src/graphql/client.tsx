"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { FC, PropsWithChildren, useMemo } from "react";

if (process.env.NODE_ENV !== "production") {
  loadDevMessages();
  loadErrorMessages();
}

export type ApolloProviderProps = PropsWithChildren;

export const ApolloProvider: FC<ApolloProviderProps> = (props) => {
  const makeClient = useMemo(
    () => () => {
      // browser & SSR links
      const links: ApolloLink[] = [
        new HttpLink({ uri: "https://rickandmortyapi.com/graphql" }),
      ];

      // SSR only links
      if (typeof window === "undefined") {
        links.unshift(new SSRMultipartLink({ stripDefer: true }));
      }

      return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link: ApolloLink.from(links),
      });
    },
    [],
  );

  return <ApolloNextAppProvider makeClient={makeClient} {...props} />;
};
