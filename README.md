# Token Control Report

A CLI tool that checks who controls an ERC-20 token.

## What it shows

The report includes the token name, symbol, decimals, total supply,
owner, owner type (contract or wallet), and whether it is an EIP-1967 proxy.

## Installation

\`\`\`bash
git clone git@github.com:MaxWK96/token-control-report.git
cd token-control-report
npm install
\`\`\`

## Usage

\`\`\`bash
npx tsx src/index.ts
\`\`\`

## Limitations

- Currently only checks for EIP-1967 proxies. Older proxy types
  (like USDC's) are not detected, so verify on Etherscan.
- The token address is hardcoded. Making it a command-line argument
  is a planned improvement.