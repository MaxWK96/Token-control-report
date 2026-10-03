// 1. importera det jag behöver från viem
import { createPublicClient, erc20Abi, parseAbi, http } from "viem"
import { getStorageAt } from "viem/actions";
import { mainnet } from "viem/chains"
// 2. skapa en client mot mainnet
const client = createPublicClient({
chain : mainnet,
transport: http(),
});
// 3. läs name
const name = await client.readContract({
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    abi: erc20Abi,
    functionName: "name",
});
console.log("Name:", name);
// 4. läs symbol
const symbol = await client.readContract({
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    abi: erc20Abi,
    functionName: "symbol",
});
console.log("Symbol:", symbol);
// 5. läs decimals
const decimaler = await client.readContract({
  address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  abi: erc20Abi,
  functionName: "decimals",
});
console.log("Decimaler:", decimaler);
// 6. läs totalSupply
const totalSupply = await client.readContract({
  address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  abi: erc20Abi,
  functionName: "totalSupply",
});
console.log("Supply:", totalSupply);

// 7. skriv ut allt

// 8. definiera en egen ABI för owner()
const ownerAbi = parseAbi([
  "function owner() view returns (address)",
  ]);
// 9. läs owner
  const owner = await client.readContract({
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    abi: ownerAbi,
    functionName: "owner",
  });
  console.log("Owner:", owner);
// 10. kolla om owner har kod (kontrakt) eller inte (plånbok)
  const ownerCode = await client.getCode({
    address: "0xFcb19e6a322b27c06842A71e8c725399f049AE3a"
  });
// 11. skriv ut owner och vilken typ det är
  if (ownerCode)  {
    console.log("Owner is a contract");
  }
  else  {
    console.log("Owner is a wallet");
  }

  // 12. definiera slot för implementation och admin
  const IMPL_SLOT = "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";
const ADMIN_SLOT = "0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103";
// 13. läs implementationsadressen med getStorageAt
const impSlot = await client.getStorageAt({
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    slot: IMPL_SLOT
});
// 14. skriv ut om det är en proxy eller inte
const emptySlot = "0x0000000000000000000000000000000000000000000000000000000000000000";
console.log("impSlot raw:", impSlot);
if (impSlot && impSlot !== emptySlot) {
    console.log("Proxy (EIP-1967) hittad. Implementation slot:", impSlot);
} else {
    console.log("Ingen EIP-1967-proxy hittad. Kan ändå vara en annan proxy-typ, verifiera på Etherscan.");
}