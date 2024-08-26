export interface Counter {
  id: string;
  value: string;
  title: string;
  units: string | null;
  description: string;
}

export interface XterioData {
  counters: Counter[];
}

export type DataItem = {
  date: string;
  value: string;
};

export type ChartDataItem = {
  daily_new_txn: DataItem[];
  active_accounts: DataItem[];
  average_gas_price: DataItem[];
  daily_deployed_contracts: DataItem[];
  total_txn: DataItem[];
  total_account_count: DataItem[];
  average_block_size: DataItem[];
};
