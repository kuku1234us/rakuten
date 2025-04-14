export interface Stock {
  code: string; // 現地コード (Local code)
  nameEn: string; // 銘柄名(English)
  nameJp: string; // 銘柄名 (Japanese name)
  market: string; // 市場 (Market)
  sector: string; // 業種 (Industry/Sector)
  lastUpdated?: Date; // Last time the data was updated
}
