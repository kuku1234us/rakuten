import { getTranslations } from "next-intl/server";
import { getAllStocks } from "@/lib/services/stockService";
import { format } from "date-fns";

export default async function AllStocksPage() {
  const t = await getTranslations();
  const st = await getTranslations("Stocks");

  // Fetch stock data
  const { stocks, lastUpdated } = await getAllStocks();

  // Format the last updated time
  const formattedLastUpdated = format(lastUpdated, "yyyy-MM-dd HH:mm:ss");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{st("allStocks")}</h1>
        <div className="text-sm text-muted-foreground">
          {st("lastUpdated")}: {formattedLastUpdated}
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted border-b">
                <th className="py-3 px-4 text-left font-medium">
                  {st("code")}
                </th>
                <th className="py-3 px-4 text-left font-medium">
                  {st("nameEn")}
                </th>
                <th className="py-3 px-4 text-left font-medium">
                  {st("nameJp")}
                </th>
                <th className="py-3 px-4 text-left font-medium">
                  {st("market")}
                </th>
                <th className="py-3 px-4 text-left font-medium">
                  {st("sector")}
                </th>
              </tr>
            </thead>
            <tbody>
              {stocks.length > 0 ? (
                stocks.map((stock, index) => (
                  <tr
                    key={stock.code}
                    className={
                      index % 2 === 0 ? "bg-background" : "bg-muted/30"
                    }
                  >
                    <td className="py-3 px-4 font-mono">{stock.code}</td>
                    <td className="py-3 px-4">{stock.nameEn}</td>
                    <td className="py-3 px-4">{stock.nameJp}</td>
                    <td className="py-3 px-4">{stock.market}</td>
                    <td className="py-3 px-4">{stock.sector}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-4 px-4 text-center text-muted-foreground"
                  >
                    {st("noStocksFound")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
