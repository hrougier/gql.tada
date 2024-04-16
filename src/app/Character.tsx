"use client";

import { useCallback } from "react";
import { graphql, FragmentOf, readFragment } from "gql.tada";

export const CharacterFragment = graphql(`
  fragment Character on Character {
    name
  }
`);

export default function Character({
  character,
}: {
  character: FragmentOf<typeof CharacterFragment> | null;
}) {
  const { name } = readFragment(character);

  const onClick = useCallback(() => {
    console.log("Hi, my name is", name);
  }, [name]);

  return <button onClick={onClick}>{name}</button>;
}
