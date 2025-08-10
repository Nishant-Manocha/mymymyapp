import React, { JSX } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Svg, { Circle, Line, Text as SvgText } from "react-native-svg";
// import { Investor } from '../store/ponziStore';

interface Investor {
  id: number;
  name: string;
  investment: number;
  recruits: number[];
  totalEarned: number;
  netProfit: number;
  joinedRound: number;
  level: number;
}

interface PonziTreeVisualizationProps {
  investors: Investor[];
  isCollapsed: boolean;
}

interface TreeNode {
  investor: Investor;
  children: TreeNode[];
  x: number;
  y: number;
  depth: number;
}

export const PonziTreeVisualization: React.FC<PonziTreeVisualizationProps> = ({
  investors,
  isCollapsed,
}) => {
  const buildTree = (): TreeNode | null => {
    if (investors.length === 0) return null;

    const nodeMap = new Map<number, TreeNode>();

    // Create nodes for all investors
    investors.forEach((investor) => {
      nodeMap.set(investor.id, {
        investor,
        children: [],
        x: 0,
        y: 0,
        depth: 0,
      });
    });

    // Build parent-child relationships (simplified - based on levels)
    investors.forEach((investor) => {
      const node = nodeMap.get(investor.id)!;
      // Simple recruitment logic: each investor recruits the next few investors
      const maxRecruits = Math.min(3, Math.max(1, 6 - investor.level));

      const potentialRecruits = investors
        .filter(
          (inv) =>
            inv.joinedRound > investor.joinedRound &&
            inv.level <= investor.level + 1
        )
        .slice(0, maxRecruits);

      potentialRecruits.forEach((recruit) => {
        const childNode = nodeMap.get(recruit.id);
        if (childNode && !node.children.includes(childNode)) {
          node.children.push(childNode);
        }
      });
    });

    // Start with founder
    const root = nodeMap.get(1);
    if (!root) return null;

    // Calculate positions
    positionNodes(root, 150, 50, 0);

    return root;
  };

  const positionNodes = (
    node: TreeNode,
    x: number,
    y: number,
    depth: number
  ) => {
    node.x = x;
    node.y = y;
    node.depth = depth;

    const spacing = Math.max(60, 100 - depth * 10);
    const totalWidth = (node.children.length - 1) * spacing;
    const startX = x - totalWidth / 2;

    node.children.forEach((child, index) => {
      const childX = startX + index * spacing;
      const childY = y + 80;
      positionNodes(child, childX, childY, depth + 1);
    });
  };

  const getAllNodes = (node: TreeNode): TreeNode[] => {
    return [node, ...node.children.flatMap((child) => getAllNodes(child))];
  };

  const renderNode = (node: TreeNode): JSX.Element[] => {
    const { investor } = node;
    const isProfitable = investor.netProfit > 0;
    const isFounder = investor.id === 1;

    const elements: JSX.Element[] = [];

    // Node circle
    elements.push(
      <Circle
        key={`circle-${investor.id}`}
        cx={node.x}
        cy={node.y}
        r={isFounder ? 20 : 15}
        fill={
          isFounder
            ? "#8b5cf6"
            : isProfitable
            ? "#22c55e"
            : isCollapsed
            ? "#ef4444"
            : "#f59e0b"
        }
        stroke="white"
        strokeWidth={1}
      />
    );

    // Node label
    elements.push(
      <SvgText
        key={`text-${investor.id}`}
        x={node.x}
        y={node.y + 4}
        textAnchor="middle"
        fontSize="10"
        fill="white"
        fontWeight="bold"
      >
        {investor.id}
      </SvgText>
    );

    // Children connections
    node.children.forEach((child) => {
      elements.push(
        <Line
          key={`line-${investor.id}-${child.investor.id}`}
          x1={node.x}
          y1={node.y + (isFounder ? 20 : 15)}
          x2={child.x}
          y2={child.y - 15}
          stroke="#64748b"
          strokeWidth={1.5}
          opacity={0.6}
        />
      );
    });

    // Render children
    node.children.forEach((child) => {
      elements.push(...renderNode(child));
    });

    return elements;
  };

  const tree = buildTree();

  if (!tree) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🌳</Text>
        <Text style={styles.emptyText}>No investors to display</Text>
      </View>
    );
  }

  const allNodes = getAllNodes(tree);
  const minX = Math.min(...allNodes.map((n) => n.x)) - 30;
  const maxX = Math.max(...allNodes.map((n) => n.x)) + 30;
  const minY = Math.min(...allNodes.map((n) => n.y)) - 30;
  const maxY = Math.max(...allNodes.map((n) => n.y)) + 30;

  const viewBoxWidth = maxX - minX;
  const viewBoxHeight = maxY - minY;

  // Get pyramid levels for simplified view
  const getPyramidLevels = () => {
    const levels: Investor[][] = [];
    investors.forEach((investor) => {
      if (!levels[investor.level]) {
        levels[investor.level] = [];
      }
      levels[investor.level].push(investor);
    });
    return levels.filter((level) => level.length > 0);
  };

  const pyramidLevels = getPyramidLevels();

  return (
    <View style={styles.container}>
      {/* Simplified Pyramid View */}
      <View style={styles.pyramidContainer}>
        {/* <Text style={styles.pyramidTitle}>Pyramid Structure</Text> */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.pyramidContent}>
            {pyramidLevels.map((level, levelIndex) => (
              <View key={levelIndex} style={styles.pyramidLevel}>
                <Text style={styles.levelLabel}>
                  Level {levelIndex} ({level.length} investors)
                </Text>
                <View style={styles.levelNodes}>
                  {level.slice(0, 10).map((investor) => (
                    <View
                      key={investor.id}
                      style={[
                        styles.pyramidNode,
                        {
                          backgroundColor:
                            investor.netProfit > 0
                              ? "#22c55e"
                              : isCollapsed
                              ? "#ef4444"
                              : "#f59e0b",
                        },
                      ]}
                    >
                      <Text style={styles.nodeText}>{investor.id}</Text>
                    </View>
                  ))}
                  {level.length > 10 && (
                    <View style={[styles.pyramidNode, styles.moreNode]}>
                      <Text style={styles.nodeText}>+{level.length - 10}</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Legend */}
      {/* <View style={styles.legend}>
        <Text style={styles.legendTitle}>Legend</Text>
        <View style={styles.legendItems}>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#8b5cf6" }]}
            />
            <Text style={styles.legendText}>Founder</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#22c55e" }]}
            />
            <Text style={styles.legendText}>Profitable</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#f59e0b" }]}
            />
            <Text style={styles.legendText}>Waiting</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#ef4444" }]}
            />
            <Text style={styles.legendText}>Lost Money</Text>
          </View>
        </View>
      </View> */}

      {/* Tree View (SVG) */}
      {/* <View style={styles.treeContainer}>
        <Text style={styles.treeTitle}>Network Tree</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.treeScrollView}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Svg
              width={Math.max(300, viewBoxWidth)}
              height={Math.max(200, viewBoxHeight)}
              viewBox={`${minX} ${minY} ${viewBoxWidth} ${viewBoxHeight}`}
            >
              {renderNode(tree)}
            </Svg>
          </ScrollView>
        </ScrollView>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyText: {
    color: "#666",
    fontSize: 16,
    marginTop: 10,
  },
  pyramidContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  pyramidTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  pyramidContent: {
    paddingHorizontal: 10,
  },
  pyramidLevel: {
    marginBottom: 15,
    alignItems: "center",
  },
  levelLabel: {
    fontSize: 12,
    color: "#b8b8b8",
    marginBottom: 8,
  },
  levelNodes: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 5,
  },
  pyramidNode: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
  },
  moreNode: {
    backgroundColor: "#666",
  },
  nodeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  legend: {
    marginBottom: 20,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  legendItems: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: "#b8b8b8",
  },
  treeContainer: {
    height: 250,
  },
  treeTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  treeScrollView: {
    flex: 1,
  },
});
