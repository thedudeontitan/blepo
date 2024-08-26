export interface TransferDayCount {
  timestamp: number;
  count: number;
  block_count: number;
  avg_block_time: string;
  avg_block_size: string;
  first_deposit_accounts: string;
  active_accounts: string;
  deposit_transfer_count_without_nft: string;
  deposit_token_amount_without_nft: string;
  withdraw_transfer_count_without_nft: string;
  withdraw_token_amount_without_nft: string;
  transfer_count_without_nft: string;
  transfer_token_amount_without_nft: string;
  gas_used: string;
  average_gas_price: string;
  receive_from_accounts: string;
  send_to_accounts: string;
  nft_transfer_count: string;
  total_cost: string;
  submit_l2_trx_cost: string;
  propose_l2_output_cost: string;
  total_revenue: string;
  l1_data_fee_revenue: string;
  l2_execution_fee_revenue: string;
  l2_base_fee: string;
  priority_fee: string;
  transfer20_count: string;
  contract_create_transfer_count: string;
  tps_per_day: string;
}

export interface Data {
  updateTime: number;
  transferDayCount: TransferDayCount[];
}

export interface KpiData {
  daily_transaction_count: number;
  block_count: number;
  avg_block_time: string;
  avg_block_size: string;
  active_accounts: string;
  average_gas_price: string;
  contract_create_transfer_count: string;
  tps_per_day: string;
}
