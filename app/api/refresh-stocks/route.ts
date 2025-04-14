import { NextRequest, NextResponse } from "next/server";
import { refreshStockData } from "@/lib/services/stockService";

// This route will be called by a cron job to refresh the stock data every hour
export async function GET(request: NextRequest) {
  try {
    const { stocks, lastUpdated } = await refreshStockData();

    return NextResponse.json({
      success: true,
      message: "Stock data refreshed successfully",
      stockCount: stocks.length,
      lastUpdated,
    });
  } catch (error) {
    console.error("Error refreshing stock data:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to refresh stock data",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
