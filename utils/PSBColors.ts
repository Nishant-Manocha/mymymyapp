// PSB Official Colors and Theme
export const PSBColors = {
  // Primary PSB Colors
  primary: {
    green: "#00563F", // PSB Forest Green
    gold: "#FFD700", // PSB Gold
    darkGreen: "#004025", // Darker shade for emphasis
    lightGreen: "#E8F5E8", // Light green for backgrounds
  },
  
  // Secondary Colors
  secondary: {
    navy: "#1E3A8A", // Deep navy for professional look
    blue: "#3B82F6", // Modern blue
    gray: "#6B7280", // Neutral gray
    lightGray: "#F3F4F6", // Light gray for backgrounds
  },
  
  // Status Colors
  status: {
    success: "#10B981", // Green for success
    warning: "#F59E0B", // Amber for warnings
    error: "#EF4444", // Red for errors
    info: "#3B82F6", // Blue for information
  },
  
  // Background Colors
  background: {
    primary: "#FFFFFF", // Main background
    secondary: "#F8FAFC", // Secondary background
    tertiary: "#F1F5F9", // Tertiary background
    card: "#FFFFFF", // Card background
    surface: "rgba(0, 86, 63, 0.05)", // Surface with PSB green tint
  },
  
  // Text Colors
  text: {
    primary: "#1F2937", // Main text
    secondary: "#6B7280", // Secondary text
    tertiary: "#9CA3AF", // Tertiary text
    inverse: "#FFFFFF", // Text on dark backgrounds
    accent: "#00563F", // PSB green text
  },
  
  // Border Colors
  border: {
    primary: "#E5E7EB", // Main border
    secondary: "#D1D5DB", // Secondary border
    accent: "#00563F", // PSB green border
  },
  
  // Shadow Colors
  shadow: {
    primary: "rgba(0, 0, 0, 0.1)", // Main shadow
    secondary: "rgba(0, 0, 0, 0.05)", // Light shadow
    accent: "rgba(0, 86, 63, 0.1)", // PSB green shadow
  },
  
  // Gradient Colors
  gradient: {
    primary: ["#00563F", "#004025"], // PSB green gradient
    secondary: ["#FFD700", "#F59E0B"], // PSB gold gradient
    success: ["#10B981", "#059669"], // Success gradient
    modern: ["#3B82F6", "#1E40AF"], // Modern blue gradient
  },
  
  // Interactive Colors
  interactive: {
    button: {
      primary: "#00563F", // Primary button
      secondary: "#FFD700", // Secondary button
      outline: "transparent", // Outline button
    },
    tab: {
      active: "#00563F", // Active tab
      inactive: "#9CA3AF", // Inactive tab
      background: "#FFFFFF", // Tab background
    },
  },
  
  // Special Effects
  effects: {
    glow: "rgba(0, 86, 63, 0.2)", // PSB green glow
    overlay: "rgba(0, 0, 0, 0.5)", // Overlay
    highlight: "rgba(255, 215, 0, 0.1)", // Gold highlight
  },
};

// PSB Theme Configuration
export const PSBTheme = {
  light: {
    isDark: false,
    colors: {
      background: [PSBColors.background.primary, PSBColors.background.secondary],
      surface: PSBColors.background.surface,
      card: PSBColors.background.card,
      text: PSBColors.text.primary,
      textSecondary: PSBColors.text.secondary,
      primary: PSBColors.primary.green,
      success: PSBColors.status.success,
      warning: PSBColors.status.warning,
      error: PSBColors.status.error,
      icon: PSBColors.text.secondary,
      border: PSBColors.border.primary,
      shadow: PSBColors.shadow.primary,
      profit: PSBColors.status.success,
      loss: PSBColors.status.error,
      breakEven: PSBColors.status.warning,
      gradientStart: PSBColors.gradient.primary[0],
      gradientEnd: PSBColors.gradient.primary[1],
    },
  },
  dark: {
    isDark: true,
    colors: {
      background: ["#1A1A2E", "#16213E"],
      surface: "rgba(255, 255, 255, 0.05)",
      card: "rgba(255, 255, 255, 0.05)",
      text: "#F1F5F9",
      textSecondary: "#94A3B8",
      primary: PSBColors.primary.green,
      success: PSBColors.status.success,
      warning: PSBColors.status.warning,
      error: PSBColors.status.error,
      icon: "#FFFFFF",
      border: "#475569",
      shadow: "#000000",
      profit: "#166534",
      loss: "#991B1B",
      breakEven: "#A16207",
      gradientStart: PSBColors.gradient.primary[0],
      gradientEnd: PSBColors.gradient.primary[1],
    },
  },
};

// PSB Typography
export const PSBTypography = {
  heading: {
    h1: {
      fontSize: 32,
      fontWeight: "700",
      lineHeight: 40,
    },
    h2: {
      fontSize: 28,
      fontWeight: "600",
      lineHeight: 36,
    },
    h3: {
      fontSize: 24,
      fontWeight: "600",
      lineHeight: 32,
    },
    h4: {
      fontSize: 20,
      fontWeight: "600",
      lineHeight: 28,
    },
  },
  body: {
    large: {
      fontSize: 18,
      fontWeight: "400",
      lineHeight: 28,
    },
    medium: {
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 24,
    },
    small: {
      fontSize: 14,
      fontWeight: "400",
      lineHeight: 20,
    },
  },
  caption: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },
};

// PSB Spacing
export const PSBSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// PSB Border Radius
export const PSBBorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

// PSB Shadows
export const PSBShadows = {
  sm: {
    shadowColor: PSBColors.shadow.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: PSBColors.shadow.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: PSBColors.shadow.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  accent: {
    shadowColor: PSBColors.shadow.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
};