// 1. importera det jag behöver från viem
import { createPublicClient, erc20Abi, parseAbi, http } from "viem"
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
