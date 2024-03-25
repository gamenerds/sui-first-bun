import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import * as Sui from "@mysten/sui.js/client";
import BaseHTML from "./BaseHTML";

const app = new Elysia()
  .use(html())
  .get("/", () => BaseHTML())
  .post("/coins", ({ body }) => balances(body))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

type coin_balance = {
  symbol: string,
  url?: string | null,
  balance: string
}

const client = new Sui.SuiClient({ url: Sui.getFullnodeUrl("mainnet") });

async function balances(body: any) {
  const addy = body.address;
  
  if (!addy || addy === "") {
    return <div>Plz enter wallet addy above</div>;
  }

  const coins = await client.getAllBalances({ owner: addy });

  if (!coins || coins.length === 0) {
    return <div>No coins in this wallet. They didn't choose rich.</div>;
  }

  let coin_balances: coin_balance[] = []
  for (let coin of coins) {
    const meta = await client.getCoinMetadata({ coinType: coin.coinType });
    
    if (!meta) {
      coin_balances.push({ symbol: coin.coinType, url: undefined, balance: coin.totalBalance });
    } else {
      const balance = Number(coin.totalBalance) / Math.pow(10, meta.decimals);
      coin_balances.push({ symbol: meta.symbol, url: meta.iconUrl, balance: String(balance)});
    }
  }

  return (
    <div class="grid grid-cols-[50px_60px_150px] text-middle">
      {coin_balances.map(coin_row)}
    </div>
  );
}

function coin_row(cb: coin_balance) {
  const img = cb.url ? <img src={cb.url} class="ml-2 w-6 h-6"></img> : <></>;
  return <><div>{img}</div><div>{cb.symbol}:</div> <div>{cb.balance}</div></>;
}