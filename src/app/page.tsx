import { graphql } from "gql.tada";
import { apollo } from "@/graphql/server";
import Character, { CharacterFragment } from "./Character";

const query = graphql(
  `
    query ExampleQuery {
      character(id: "1") {
        ...Character
      }
    }
  `,
  [CharacterFragment],
);

export default async function Home() {
  const client = apollo();
  const {
    data: { character },
  } = await client.query({ query });

  return <Character character={character} />;
}
