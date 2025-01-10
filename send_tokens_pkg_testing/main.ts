import { SuiClient } from "@mysten/sui/client";
import { envConfig } from "./config";
import { listSuiBalance } from "./methods/coins-balance";
import { networks } from "./methods/utils";
import { getSignerKeypair } from "./utils/keys";
import { sendTokens } from "./methods/send-tokens";

export const main = async () => {
  const { recipientAddress, senderPrivateKey, coinId } = envConfig;

  if (!recipientAddress || !senderPrivateKey || !coinId) {
    throw new Error("Envs not set");
  }
  const keypair = getSignerKeypair(senderPrivateKey);
  const client = new SuiClient({ url: networks.devnet });

  await listSuiBalance({ address: keypair.toSuiAddress() });
  await listSuiBalance({ address: recipientAddress });

  await sendTokens({ recipientAddress, coinId, amount: 3, keypair, client });

  await listSuiBalance({ address: keypair.toSuiAddress() });
  await listSuiBalance({ address: recipientAddress });
};

main();
