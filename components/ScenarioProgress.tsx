import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Trophy, Target, TrendingUp, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Brain, Clock, Star } from 'lucide-react-native';
import { ScenarioProgress as ProgressType, scenarios } from '../data/scenarios';

const { width } = Dimensions.get('window');

interface ScenarioProgressProps {
  progress: ProgressType;
}

export const ScenarioProgress: React.FC<ScenarioProgressProps> = ({ progress }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'fraud-detection': return AlertTriangle;
      case 'investment': return TrendingUp;
      case 'budgeting': return Target;
      case 'insurance': return CheckCircle;
      case 'retirement': return Clock;
      default: return Brain;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'fraud-detection': return '#ef4444';
      case 'investment': return '#3b82f6';
      case 'budgeting': return '#10b981';
      case 'insurance': return '#8b5cf6';
      case 'retirement': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Excellent financial decision-making skills!';
    if (score >= 80) return 'Great job! You make sound financial decisions.';
    if (score >= 70) return 'Good progress! Keep practicing to improve.';
    if (score >= 60) return 'You\'re learning! Focus on weak areas.';
    return 'Keep practicing! Every expert was once a beginner.';
  };

  const categoryStats = scenarios.reduce((acc, scenario) => {
    if (!acc[scenario.category]) {
      acc[scenario.category] = { total: 0, completed: 0 };
    }
    acc[scenario.category].total++;
    if (progress.completedScenarios.includes(scenario.id)) {
      acc[scenario.category].completed++;
    }
    return acc;
  }, {} as { [key: string]: { total: number; completed: number } });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Overall Progress */}
      <View style={styles.overallCard}>
        <View style={styles.overallHeader}>
          <Trophy size={24} color="#f59e0b" />
          <Text style={styles.overallTitle}>Your Progress</Text>
        </View>
        
        <View style={styles.scoreContainer}>
          <Text style={[styles.scoreValue, { color: getScoreColor(progress.averageScore) }]}>
            {Math.round(progress.averageScore)}%
          </Text>
          <Text style={styles.scoreLabel}>Average Score</Text>
        </View>
        
        <Text style={styles.scoreMessage}>
          {getScoreMessage(progress.averageScore)}
        </Text>
        
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${(progress.completedScenarios.length / scenarios.length) * 100}%`,
                backgroundColor: getScoreColor(progress.averageScore)
              }
            ]} 
          />
        </View>
        
        <Text style={styles.progressText}>
          {progress.completedScenarios.length} of {scenarios.length} scenarios completed
        </Text>
      </View>

      {/* Category Breakdown */}
      <View style={styles.categoryCard}>
        <Text style={styles.categoryTitle}>Progress by Category</Text>
        
        {Object.entries(categoryStats).map(([category, stats]) => {
          const IconComponent = getCategoryIcon(category);
          const color = getCategoryColor(category);
          const percentage = (stats.completed / stats.total) * 100;
          
          return (
            <View key={category} style={styles.categoryItem}>
              <View style={styles.categoryHeader}>
                <View style={styles.categoryLeft}>
                  <View style={[styles.categoryIcon, { backgroundColor: color + '20' }]}>
                    <IconComponent size={20} color={color} />
                  </View>
                  <Text style={styles.categoryName}>
                    {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Text>
                </View>
                <Text style={styles.categoryStats}>
                  {stats.completed}/{stats.total}
                </Text>
              </View>
              
              <View style={styles.categoryProgressBar}>
                <View 
                  style={[
                    styles.categoryProgressFill, 
                    { width: `${percentage}%`, backgroundColor: color }
                  ]} 
                />
              </View>
            </View>
          );
        })}
      </View>

      {/* Strengths and Improvements */}
      <View style={styles.insightsContainer}>
        {progress.strongAreas.length > 0 && (
          <View style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <Star size={20} color="#10b981" />
              <Text style={styles.insightTitle}>Your Strengths</Text>
            </View>
            {progress.strongAreas.map((area, index) => (
              <View key={index} style={styles.insightItem}>
                <CheckCircle size={16} color="#10b981" />
                <Text style={styles.insightText}>
                  {area.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Text>
              </View>
            ))}
          </View>
        )}

        {progress.improvementAreas.length > 0 && (
          <View style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <Target size={20} color="#f59e0b" />
              <Text style={styles.insightTitle}>Areas to Improve</Text>
            </View>
            {progress.improvementAreas.map((area, index) => (
              <View key={index} style={styles.insightItem}>
                <AlertTriangle size={16} color="#f59e0b" />
                <Text style={styles.insightText}>
                  {area.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Achievements */}
      <View style={styles.achievementsCard}>
        <Text style={styles.achievementsTitle}>Achievements</Text>
        
        <View style={styles.achievementsList}>
          <View style={[
            styles.achievement,
            progress.completedScenarios.length >= 1 && styles.achievementUnlocked
          ]}>
            <Trophy size={20} color={progress.completedScenarios.length >= 1 ? '#f59e0b' : '#6b7280'} />
            <Text style={[
              styles.achievementText,
              progress.completedScenarios.length >= 1 && styles.achievementTextUnlocked
            ]}>
              First Decision
            </Text>
          </View>
          
          <View style={[
            styles.achievement,
            progress.completedScenarios.length >= 5 && styles.achievementUnlocked
          ]}>
            <Target size={20} color={progress.completedScenarios.length >= 5 ? '#10b981' : '#6b7280'} />
            <Text style={[
              styles.achievementText,
              progress.completedScenarios.length >= 5 && styles.achievementTextUnlocked
            ]}>
              Decision Maker
            </Text>
          </View>
          
          <View style={[
            styles.achievement,
            progress.averageScore >= 80 && styles.achievementUnlocked
          ]}>
            <Star size={20} color={progress.averageScore >= 80 ? '#8b5cf6' : '#6b7280'} />
            <Text style={[
              styles.achievementText,
              progress.averageScore >= 80 && styles.achievementTextUnlocked
            ]}>
              Expert Advisor
            </Text>
          </View>
          
          <View style={[
            styles.achievement,
            progress.completedScenarios.length === scenarios.length && styles.achievementUnlocked
          ]}>
            <Brain size={20} color={progress.completedScenarios.length === scenarios.length ? '#ef4444' : '#6b7280'} />
            <Text style={[
              styles.achievementText,
              progress.completedScenarios.length === scenarios.length && styles.achievementTextUnlocked
            ]}>
              Master Strategist
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  overallCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    margin: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  overallHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  overallTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  scoreLabel: {
    fontSize: 16,
    color: '#6b7280',
  },
  scoreMessage: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  categoryItem: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  categoryStats: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  categoryProgressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
  },
  categoryProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  insightsContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 16,
  },
  insightCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  insightText: {
    fontSize: 14,
    color: '#374151',
  },
  achievementsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  achievementsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  achievementsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievement: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
    opacity: 0.5,
  },
  achievementUnlocked: {
    backgroundColor: '#f0fdf4',
    opacity: 1,
  },
  achievementText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  achievementTextUnlocked: {
    color: '#166534',
  },
});