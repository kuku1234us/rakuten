"use server";

import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { Stock } from "../models/stock";

let cachedStocks: Stock[] | null = null;
let lastUpdated: Date | null = null;

// Cache expiration time (1 hour)
const CACHE_EXPIRATION_MS = 60 * 60 * 1000;

export async function getAllStocks(): Promise<{
  stocks: Stock[];
  lastUpdated: Date;
}> {
  // Return cached data if available and not expired
  if (
    cachedStocks &&
    lastUpdated &&
    Date.now() - lastUpdated.getTime() < CACHE_EXPIRATION_MS
  ) {
    return {
      stocks: cachedStocks,
      lastUpdated,
    };
  }

  // If cache expired or doesn't exist, refresh the data
  return refreshStockData();
}

export async function refreshStockData(): Promise<{
  stocks: Stock[];
  lastUpdated: Date;
}> {
  try {
    // Path to CSV file
    const csvPath = path.join(process.cwd(), "RakutenDocs", "result_cn.csv");

    // Read the CSV file
    const csvContent = fs.readFileSync(csvPath, "utf8");

    // Parse the CSV content
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      from_line: 1,
    });

    // Map the CSV records to Stock objects
    const stocks: Stock[] = records.map((record: any) => ({
      code: record["現地コード"],
      nameEn: record["銘柄名(English)"],
      nameJp: record["銘柄名"],
      market: record["市場"],
      sector: record["業種"],
    }));

    // Update cache
    cachedStocks = stocks;
    lastUpdated = new Date();

    return {
      stocks,
      lastUpdated,
    };
  } catch (error) {
    console.error("Error loading stock data:", error);
    // Return empty array if error occurs
    return {
      stocks: [],
      lastUpdated: new Date(),
    };
  }
}

// Function to check if it's time to refresh the data
export async function shouldRefreshStocks(): Promise<boolean> {
  if (!lastUpdated) return true;
  return Date.now() - lastUpdated.getTime() >= CACHE_EXPIRATION_MS;
}
