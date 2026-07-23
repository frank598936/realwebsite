import { useEffect } from "react";

export default function TradingViewChart() {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://s3.tradingview.com/tv.js";

    script.async = true;

    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          container_id: "tradingview_chart",

          width: "100%",

          height: 500,

          symbol: "BINANCE:BTCUSDT",

          interval: "15",

          timezone: "Etc/UTC",

          theme: "dark",

          style: "1",

          locale: "en",

          enable_publishing: false,

          allow_symbol_change: true,

          hide_side_toolbar: false,

          details: true,

          hotlist: true,

          calendar: false,
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      id="tradingview_chart"
      style={{
        width: "100%",
        height: "500px",
        paddingRight:"4rem",
        paddingLeft:"4rem",
      }}
    />
  );
}
