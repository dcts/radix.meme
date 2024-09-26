import { createChart } from "lightweight-charts";
import React, { useState, useEffect, useRef } from "react";
// import {
//   CANDLE_PERIODS,
//   OHLCVData,
//   setCandlePeriod,
//   handleCrosshairMove,
//   initializeLegend,
//   initialPriceChartState,
// } from "../state/priceChartSlice";

import { displayNumber, getPrecision, shortenString } from "../utils";
// import { CopyIcon } from "./CopyIcon";
// import { TokenInfo } from "state/pairSelectorSlice";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/app/_hooks/hooks";

export interface CandlestickData<HorzScaleItem = Time>
  extends OhlcData<HorzScaleItem> {
  /**
   * Optional color value for certain data item. If missed, color from options is used
   */
  color?: string;
  /**
   * Optional border color value for certain data item. If missed, color from options is used
   */
  borderColor?: string;
  /**
   * Optional wick color value for certain data item. If missed, color from options is used
   */
  wickColor?: string;
}
export interface OHLCVData extends CandlestickData {
  value: number;
}

export interface OhlcData<HorzScaleItem = Time>
  extends WhitespaceData<HorzScaleItem> {
  /**
   * The bar time.
   */
  time: HorzScaleItem;
  /**
   * The open price.
   */
  open: number;
  /**
   * The high price.
   */
  high: number;
  /**
   * The low price.
   */
  low: number;
  /**
   * The close price.
   */
  close: number;
}

export interface WhitespaceData<HorzScaleItem = Time> {
  /**
   * The time of the data.
   */
  time: HorzScaleItem;
  /**
   * Additional custom values which will be ignored by the library, but
   * could be used by plugins.
   */
  customValues?: Record<string, unknown>;
}

export type Time = UTCTimestamp | BusinessDay | string;
/**
 * A custom function used to override formatting of a time to a string.
 */

export type UTCTimestamp = Nominal<number, "UTCTimestamp">;
/**
 * Represents a vertical alignment.
 */

export type Nominal<T, Name extends string> = T & {
  /** The 'name' or species of the nominal. */
  [Symbol.species]: Name;
};

export interface BusinessDay {
  /**
   * The year.
   */
  year: number;
  /**
   * The month.
   */
  month: number;
  /**
   * The day.
   */
  day: number;
}

interface PriceChartProps {
  data: OHLCVData[];
  candlePrice: OHLCVData | null;
  change: number | null;
  percChange: number | null;
  volume: number | null;
}

function PriceChartCanvas(props: PriceChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const legendRef = useRef<HTMLDivElement>(null);
  // const currency = useAppSelector((state) => state.pairSelector.token2.symbol);
  const dispatch = useAppDispatch();
  const { data, candlePrice } = props;
  const isLoading = data.length === 0;
  //displayTime offsets by local timezone, causing discrepancy on chart
  const candleDate = new Date(
    parseInt(candlePrice?.time.toString() || "") * 1000
  ).toUTCString();

  const nbrOfDigits = 8;
  // const currencyPrecision = getPrecision(currency);

  const volume = displayNumber(props.volume || 0, nbrOfDigits, 2);
  const percChange = displayNumber(props.percChange || 0, nbrOfDigits, 2);
  const percChangeFormatted = ` ${
    props.change && props.change > 0 ? "+" : ""
  }${percChange} %`;

  const candleOpen = displayNumber(
    candlePrice?.open || 0,
    nbrOfDigits
    // currencyPrecision
  );

  const candleHigh = displayNumber(
    candlePrice?.high || 0,
    nbrOfDigits
    // currencyPrecision
  );

  const candleLow = displayNumber(
    candlePrice?.low || 0,
    nbrOfDigits
    // currencyPrecision
  );

  const candleClose = displayNumber(
    candlePrice?.close || 0,
    nbrOfDigits
    // currencyPrecision
  );

  useEffect(() => {
    const chartContainer = chartContainerRef.current;

    if (data && data.length > 0) {
      // dispatch(initializeLegend());
    }

    if (chartContainer) {
      const handleResize = () => {
        // hacky way to fix resizing issue. This is heavily dependant on the
        // grid area breakpoints, so whenever you change grid area, this
        // needs to be adapted too. This is not ideal and should be fixed.
        // TODO: fix price chart container so this code is not needed anymore.
        const adaptForPadding = 15 * 2; // 15px padding on each side
        const priceChartSize =
          window.innerWidth <= 850
            ? window.innerWidth
            : window.innerWidth <= 1025
            ? window.innerWidth - 300
            : window.innerWidth <= 1350
            ? window.innerWidth - 2 * 260
            : Math.min(921, window.innerWidth - 600);
        chart.applyOptions({ width: priceChartSize - adaptForPadding });
        // // OLD CODE
        // chart.applyOptions({ width: chartContainer.clientWidth });
      };
      const vh = window.innerHeight;
      const promoCarouselExists =
        document.querySelector(".promo-banner") !== null;
      const spaceTaken = promoCarouselExists ? 150 + 64 : 150;
      const chartHeight = Math.min(vh - spaceTaken, 550);
      const chart = createChart(chartContainer, {
        width: chartContainer.clientWidth,
        height: chartHeight,
        layout: {
          background: {
            color: "#191B1D",
          },
          // textColor: theme["secondary-content"],
        },
        grid: {
          vertLines: { color: "#191B1D" },
          horzLines: { color: "#191B1D" },
        },
        timeScale: {
          borderColor: "#191B1D",
          timeVisible: true,
        },
        crosshair: {
          vertLine: {
            // color: theme["accent"],
            // labelBackgroundColor: theme["accent"],
          },
          horzLine: {
            // color: theme["accent"],
            // labelBackgroundColor: theme["accent"],
          },
        },
      });

      const clonedData = JSON.parse(JSON.stringify(data));

      // OHLC
      const ohlcSeries = chart.addCandlestickSeries({
        priceLineVisible: false,
        lastValueVisible: false,
      });
      ohlcSeries.setData(clonedData);

      ohlcSeries.applyOptions({
        borderUpColor: "#A7D22D",
        wickUpColor: "#A7D22D",
        upColor: "#A7D22D",
        borderDownColor: "#D22D2D",
        wickDownColor: "#D22D2D",
        downColor: "#D22D2D",
      });

      chart.priceScale("right").applyOptions({
        borderColor: "#191B1D",
        scaleMargins: {
          top: 0.1,
          bottom: 0.3,
        },
      });

      // Volume Initialization
      const volumeSeries = chart.addHistogramSeries({
        priceLineVisible: false,
        lastValueVisible: false,
        priceFormat: {
          type: "volume",
        },
        priceScaleId: "volume",
      });

      volumeSeries.setData(
        data.map((datum) => ({
          ...datum,
          color: datum.close - datum.open < 0 ? "#D22D2D" : "#A7D22D",
        }))
      );

      chart.priceScale("volume").applyOptions({
        scaleMargins: {
          top: 0.8,
          bottom: 0.01,
        },
      });

      //Crosshair Data for legend
      // dispatch(handleCrosshairMove(chart, data, volumeSeries));

      //Prevent Chart from clipping
      const chartDiv = chartContainer.querySelector(".tv-lightweight-charts");
      if (chartDiv) {
        (chartDiv as HTMLElement).style.overflow = "visible";
      }

      window.addEventListener("resize", handleResize);

      // Configure chart candles to have max-width of 13px
      const totalCandles = clonedData.length;
      const chartWidth =
        document.querySelector(".chart-container-ref")?.clientWidth || 600;
      const minCandleWidth = 13; // in px
      const nbrOfCandlesToDisply = Math.min(chartWidth / minCandleWidth); //chartWidth / ;
      chart.timeScale().setVisibleLogicalRange({
        from: Math.max(totalCandles - nbrOfCandlesToDisply),
        to: totalCandles,
      });

      return () => {
        window.removeEventListener("resize", handleResize);
        chart.remove();
      };
    }
  }, [data, dispatch]);
  //Temporary brute force approach to trim the top of the chart to remove the gap
  return (
    <div>
      <div
        ref={chartContainerRef}
        className="relative mt-[-1.7rem] w-full chart-container-ref"
      >
        <div
          ref={legendRef}
          className={
            "absolute font-bold text-xs text-left text-secondary-content mt-3 z-20 " +
            (isLoading
              ? "hidden"
              : props.change && props.change < 0
              ? "!text-dexter-red"
              : "!text-dexter-green")
          }
        >
          <div className="flex justify-start gap-x-6 text-xs font-medium">
            <div className="text-secondary-content">{candleDate}</div>
            <div className="text-xs font-medium">
              <span className="text-secondary-content">Change</span>
              {percChangeFormatted}
            </div>
            <div className="text-xs font-medium">
              <span className="text-secondary-content">Volume</span> {volume}
            </div>
          </div>
          <div className="flex justify-start gap-x-6">
            <div className="text-xs font-medium">
              <span className="text-secondary-content">Open </span>
              {candleOpen}
            </div>
            <div className="text-xs font-medium">
              <span className="text-secondary-content">High </span>
              {candleHigh}
            </div>
            <div className="text-xs font-medium">
              <span className="text-secondary-content">Low </span>
              {candleLow}
            </div>
            <div className="text-xs font-medium">
              <span className="text-secondary-content">Close </span>
              {candleClose}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

enum ChartOrInfoTabOptions {
  CHART = "CHART",
  INFO = "INFO",
}

export function ChartOrInfo() {
  const dispatch = useAppDispatch();
  // const candlePeriod = useAppSelector((state) => state.priceChart.candlePeriod);

  // Set default candlePeriod state as defined in initialState of priceChartSlice
  useEffect(() => {
    // dispatch(setCandlePeriod(initialPriceChartState.candlePeriod));
  }, [dispatch]);

  const [currentTab, setCurrentTab] = useState(ChartOrInfoTabOptions.CHART);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between sm:pr-10 pr-4 border-b-[0.5px] border-b-[rgba(255,255,255,0.1)]">
        <div className="flex space-x-4 sm:space-x-5 pb-0 pt-2">
          {/* {[
            [t("chart"), ChartOrInfoTabOptions.CHART],
            [t("info"), ChartOrInfoTabOptions.INFO],
          ].map(([title, tab], indx) => {
            const isActive = tab === currentTab;
            return (
              <span
                key={indx}
                className={`text-base pb-2 sm:pb-3 px-2 ${
                  isActive
                    ? "text-dexter-green-OG border-b border-[#cafc40]"
                    : "text-[#768089]"
                } cursor-pointer`}
                onClick={() => setCurrentTab(tab as ChartOrInfoTabOptions)}
              >
                {title}
              </span>
            );
          })} */}
        </div>
        {currentTab === ChartOrInfoTabOptions.CHART && (
          <div className="flex flex-wrap items-center justify-start sm:justify-end mt-2 sm:mt-0">
            {/* {CANDLE_PERIODS.map((period) => (
              <button
                key={period}
                className={`btn btn-xs sm:btn-sm text-secondary-content focus-within:outline-none ${
                  candlePeriod === period
                    ? "!text-primary-content underline underline-offset-8 decoration-accent"
                    : ""
                }`}
                onClick={() => dispatch(setCandlePeriod(period))}
              >
                {t(period)}
              </button>
            ))} */}
          </div>
        )}
      </div>
      <div className="mt-4">
        {currentTab === ChartOrInfoTabOptions.CHART && <Chart />}
        {/* {currentTab === ChartOrInfoTabOptions.INFO && <Info />} */}
      </div>
    </div>
  );
}

export function Chart() {
  // const state = useAppSelector((state) => state.priceChart);
  // const candlePrice = useAppSelector(
  //   (state) => state.priceChart.legendCandlePrice
  // );
  // const change = useAppSelector((state) => state.priceChart.legendChange);
  // const percChange = useAppSelector(
  //   (state) => state.priceChart.legendPercChange
  // );
  // const currentVolume = useAppSelector(
  //   (state) => state.priceChart.legendCurrentVolume
  // );

  return (
    <PriceChartCanvas
      data={[]}
      candlePrice={null}
      change={null}
      percChange={null}
      volume={null}
    />
  );
}

interface LabelAndAddressProps {
  label: string;
  address: string;
  shortenLength?: { min: number; max: number };
  radixDashboardUrl: string;
}

function LabelAndAddress({
  label,
  address,
  shortenLength,
  radixDashboardUrl,
}: LabelAndAddressProps) {
  const minLength = shortenLength?.min || 8;
  const maxLength = shortenLength?.max || 20;

  return (
    <>
      <div className="text-sm tracking-[0.5px] opacity-50 font-normal pt-2 !mb-1">
        {label}
      </div>
      <div className="flex flex-row items-start mb-4">
        <div className="text-base flex items-center">
          <span className="mr-2">
            {shortenString(address, minLength, maxLength, "...")}
          </span>
          {/* <CopyIcon textToCopy={address} /> */}
          <Link
            className="pl-1 cursor-pointer"
            href={radixDashboardUrl}
            target="_blank"
          >
            <FiExternalLink />
          </Link>
        </div>
      </div>
    </>
  );
}

// function CoinInfo({ token }: { token: TokenInfo }) {
//   const { iconUrl, symbol, name, address } = token;
//   const t = useTranslations();

//   return (
//     <div className="flex flex-col items-start xs:mb-4 mb-4 sm:mb-0 w-[50%]">
//       <div className="flex items-center mb-3 pt-8">
//         <img src={iconUrl} alt={symbol} className="w-8 h-8 rounded-full" />
//         <p className="pl-2 text-base">
//           {name} ({symbol})
//         </p>
//       </div>
//       <div className="flex flex-col">
//         <LabelAndAddress
//           label={t("resource")}
//           address={address}
//           shortenLength={{ min: 8, max: 10 }}
//           radixDashboardUrl={`https://${
//             process.env.NEXT_PUBLIC_NETWORK === "stokenet" ? "stokenet-" : ""
//           }dashboard.radixdlt.com/resource/${address}`}
//         />
//       </div>
//     </div>
//   );
// }

export default ChartOrInfo;
