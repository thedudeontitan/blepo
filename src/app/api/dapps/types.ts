export interface Dapps {
  id?: number;
  name: string;
  category: string;
  description: string;
  website: string;
  logo: string;
  tags: string[];
  dailyUsers: number;
  dailyTxns: number;
  chainName: string;
}
