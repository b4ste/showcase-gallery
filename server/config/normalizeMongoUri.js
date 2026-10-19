// The original class-project URI used ?ShowCase=Cluster0. In a MongoDB URI,
// query parameters are driver options, while the database name belongs in
// the path. Accept that old value until the Render environment is updated.
export function normalizeMongoUri(rawUri) {
  const uri = new URL(rawUri);
  const legacyKey = [...uri.searchParams.keys()].find((key) => key.toLowerCase() === "showcase");

  if (legacyKey) {
    const appName = uri.searchParams.get(legacyKey);
    uri.searchParams.delete(legacyKey);
    if (!uri.pathname || uri.pathname === "/") uri.pathname = "/ShowCase";
    if (appName && !uri.searchParams.has("appName")) uri.searchParams.set("appName", appName);
  }

  return { uri: uri.toString(), correctedLegacyOption: Boolean(legacyKey) };
}
