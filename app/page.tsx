import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { clientConfig, serverConfig } from "../config";
import HomePage from "./HomePage";

export default async function Home() {
  const tokens = await getTokens(
    await cookies(),
    {
      apiKey: clientConfig.apiKey,
      cookieName: serverConfig.cookieName,
      cookieSignatureKeys: serverConfig.cookieSignatureKeys,
      serviceAccount: serverConfig.serviceAccount,
    }
  );

  if (!tokens) {
    notFound();
  }

  //retorno el componente de la página de inicio con el email del token decodificado
  return <HomePage email={tokens?.decodedToken.email} />;

}