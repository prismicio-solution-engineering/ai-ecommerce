import { createClient } from "@/prismicio";
import { Navigation } from "./Navigation";

export async function NavigationWrapper() {
  const client = createClient();
  const navigation = await client.getSingle("navigation");

  return <Navigation {...navigation.data} />;
}
