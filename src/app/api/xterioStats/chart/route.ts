import { NextResponse } from "next/server";

export async function GET() {
  const dailyNewTxn = `${process.env.XTERIO_EXPLORER_URL}/v1/lines/newTxns`;
  const activeAccounts = `${process.env.XTERIO_EXPLORER_URL}/v1/lines/activeAccounts`;
  const averageBlockSize = `${process.env.XTERIO_EXPLORER_URL}/v1/lines/averageBlockSize`;
  const averageGasPrice = `${process.env.XTERIO_EXPLORER_URL}/v1/lines/averageGasPrice`;
  const dailyDeployedContracts = `${process.env.XTERIO_EXPLORER_URL}/v1/lines/newContracts`;
  const accountCount = `${process.env.XTERIO_EXPLORER_URL}/v1/lines/accountsGrowth`;
  const totalTxn = `${process.env.XTERIO_EXPLORER_URL}/v1/lines/txnsGrowth`;

  try {
    const dailyNewTxnResponse = await fetch(dailyNewTxn, { next: { revalidate: 86400 } });
    const activeAccountsResponse = await fetch(activeAccounts, { next: { revalidate: 86400 } });
    const averageBlockSizeResponse = await fetch(averageBlockSize, { next: { revalidate: 86400 } });
    const averageGasPriceResponse = await fetch(averageGasPrice, { next: { revalidate: 86400 } });
    const dailyDeployedContractsResponse = await fetch(dailyDeployedContracts, { next: { revalidate: 86400 } });
    const accoutCountResponse = await fetch(accountCount, { next: { revalidate: 86400 } });
    const totalTxnResponse = await fetch(totalTxn, { next: { revalidate: 86400 } });

    const dailyNewTxnData = await dailyNewTxnResponse.json();
    const activeAccountsData = await activeAccountsResponse.json();
    const averageBlockSizeData = await averageBlockSizeResponse.json();
    const averageGasPriceData = await averageGasPriceResponse.json();
    const dailyDeployedContractsData = await dailyDeployedContractsResponse.json();
    const accountCountData = await accoutCountResponse.json();
    const totalTxnData = await totalTxnResponse.json();

    return NextResponse.json({
      daily_new_txn: dailyNewTxnData.chart,
      active_accounts: activeAccountsData.chart,
      average_block_size: averageBlockSizeData.chart,
      average_gas_price: averageGasPriceData.chart,
      daily_deployed_contracts: dailyDeployedContractsData.chart,
      total_account_count: accountCountData.chart,
      total_txn: totalTxnData.chart,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
