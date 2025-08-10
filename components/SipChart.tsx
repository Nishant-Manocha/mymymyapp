import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";
import { formatCurrency } from "../hooks/useSipCalculator";

interface SipChartProps {
  data: Array<{
    year: number;
    invested: number;
    interest: number;
    total: number;
  }>;
}

const { width } = Dimensions.get("window");
const chartWidth = width - 80;
const chartHeight = 220;

export const SipChart: React.FC<SipChartProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  const maxValue = Math.max(...data.map((d) => d.total));
  const barWidth = Math.max(24, (chartWidth - 40) / data.length - 8);

  // Show only every nth year for better readability
  const showEveryNthYear = Math.max(1, Math.floor(data.length / 8));

  return (
    <View style={styles.container}>
      {/* Enhanced Legend */}
      <Animated.View
        entering={FadeInUp.delay(200).duration(600)}
        style={styles.legend}
      >
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#3b82f6" }]} />
          <Text style={styles.legendText}>Principal Amount</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#10b981" }]} />
          <Text style={styles.legendText}>Compound Returns</Text>
        </View>
      </Animated.View>

      {/* Chart Container */}
      <Animated.View
        entering={FadeInDown.delay(400).duration(800)}
        style={styles.chartWrapper}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chartScroll}
          contentContainerStyle={styles.chartScrollContent}
        >
          <View style={styles.chartContainer}>
            {/* Y-axis */}
            <View style={styles.yAxis}>
              {[1, 0.75, 0.5, 0.25, 0].map((ratio, index) => (
                <View key={index} style={styles.yAxisItem}>
                  <Text style={styles.yAxisLabel}>
                    {formatCurrency(maxValue * ratio)}
                  </Text>
                  <View style={styles.gridLine} />
                </View>
              ))}
            </View>

            {/* Chart Bars */}
            <View style={styles.chart}>
              {data.map((item, index) => {
                const investedHeight = (item.invested / maxValue) * chartHeight;
                const interestHeight = (item.interest / maxValue) * chartHeight;
                const shouldShowLabel =
                  index % showEveryNthYear === 0 || index === data.length - 1;

                return (
                  shouldShowLabel && (
                    <Animated.View
                      key={index}
                      entering={FadeInUp.delay(600 + index * 50).duration(500)}
                      style={styles.barContainer}
                    >
                      <View style={[styles.bar, { width: barWidth }]}>
                        {/* Principal Amount */}
                        <View
                          style={[
                            styles.barSegment,
                            {
                              height: investedHeight,
                              backgroundColor: "#3b82f6",
                            },
                          ]}
                        />
                        {/* Returns */}
                        <View
                          style={[
                            styles.barSegment,
                            {
                              height: interestHeight,
                              backgroundColor: "#10b981",
                            },
                          ]}
                        />
                        {/* Highlight for current year */}
                        {index === data.length - 1 && (
                          <View style={styles.currentYearIndicator} />
                        )}
                      </View>

                      {/* Year Label */}

                      <Text
                        style={[
                          styles.barLabel,
                          index === data.length - 1 && styles.currentYearLabel,
                        ]}
                      >
                        Y{item.year}
                      </Text>
                    </Animated.View>
                  )
                );
              })}
            </View>
          </View>
        </ScrollView>
      </Animated.View>

      {/* Enhanced Tooltip */}
      {data.length > 0 && (
        <Animated.View
          entering={FadeInUp.delay(1000).duration(600)}
          style={styles.tooltip}
        >
          <View style={styles.tooltipHeader}>
            <Text style={styles.tooltipTitle}>Final Year Summary</Text>
            <View style={styles.tooltipBadge}>
              <Text style={styles.tooltipBadgeText}>
                Year {data[data.length - 1].year}
              </Text>
            </View>
          </View>

          <View style={styles.tooltipContent}>
            <View style={styles.tooltipRow}>
              <View style={styles.tooltipRowLeft}>
                <View
                  style={[styles.tooltipDot, { backgroundColor: "#3b82f6" }]}
                />
                <Text style={styles.tooltipLabel}>Total Invested</Text>
              </View>
              <Text style={styles.tooltipValue}>
                {formatCurrency(data[data.length - 1].invested)}
              </Text>
            </View>

            <View style={styles.tooltipRow}>
              <View style={styles.tooltipRowLeft}>
                <View
                  style={[styles.tooltipDot, { backgroundColor: "#10b981" }]}
                />
                <Text style={styles.tooltipLabel}>Returns Generated</Text>
              </View>
              <Text style={[styles.tooltipValue, { color: "#10b981" }]}>
                {formatCurrency(data[data.length - 1].interest)}
              </Text>
            </View>

            <View style={styles.tooltipDivider} />

            <View style={styles.tooltipRow}>
              <Text style={styles.tooltipTotalLabel}>Final Maturity Value</Text>
              <Text style={styles.tooltipTotal}>
                {formatCurrency(data[data.length - 1].total)}
              </Text>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 3,
    marginRight: 8,
  },
  legendText: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: "500",
  },
  chartWrapper: {
    marginBottom: 20,
  },
  chartScroll: {
    marginHorizontal: 16,
  },
  chartScrollContent: {
    paddingRight: 20,
  },
  chartContainer: {
    flexDirection: "row",
  },
  yAxis: {
    justifyContent: "space-between",
    height: chartHeight,
    width: 70,
    paddingRight: 8,
  },
  yAxisItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  yAxisLabel: {
    fontSize: 11,
    color: "#94a3b8",
    textAlign: "right",
    minWidth: 50,
    fontWeight: "500",
  },
  gridLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#f1f5f9",
    marginLeft: 8,
  },
  chart: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: chartHeight,
    flex: 1,
  },
  barContainer: {
    alignItems: "center",
    marginHorizontal: 3,
  },
  bar: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: chartHeight,
    position: "relative",
  },
  barSegment: {
    width: "100%",
    borderRadius: 3,
    marginTop: 1,
  },
  currentYearIndicator: {
    position: "absolute",
    top: -4,
    left: -2,
    right: -2,
    height: 2,
    backgroundColor: "#f59e0b",
    borderRadius: 1,
  },
  barLabel: {
    fontSize: 10,
    color: "#94a3b8",
    marginTop: 8,
    textAlign: "center",
    fontWeight: "500",
  },
  currentYearLabel: {
    color: "#3b82f6",
    fontWeight: "700",
  },
  tooltip: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  tooltipHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  tooltipTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1e293b",
  },
  tooltipBadge: {
    backgroundColor: "#3b82f6",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  tooltipBadgeText: {
    fontSize: 11,
    color: "#ffffff",
    fontWeight: "600",
  },
  tooltipContent: {
    gap: 8,
  },
  tooltipRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tooltipRowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  tooltipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  tooltipLabel: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: "500",
  },
  tooltipValue: {
    fontSize: 13,
    color: "#1e293b",
    fontWeight: "600",
  },
  tooltipDivider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 4,
  },
  tooltipTotalLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1e293b",
  },
  tooltipTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3b82f6",
  },
});
