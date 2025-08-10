import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import API from "../api/api";
import axios from "axios";
import { set } from "mongoose";

export interface Goal {
  id: number;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
  monthlyTarget: number;
  progress: number;
  createdDate: string;
  description: string;
}

export interface Contribution {
  id: number;
  goalId: number;
  amount: number;
  date: string;
  type: "initial" | "monthly" | "bonus" | "extra";
}

const GoalsContext = createContext(undefined);

export const useGoals = () => {
  const context = useContext(GoalsContext);
  if (!context) {
    throw new Error("useGoals must be used within a GoalsProvider");
  }
  return context;
};

interface GoalsProviderProps {
  children: ReactNode;
}

export const GoalsProvider: React.FC<GoalsProviderProps> = ({ children }) => {
  const initialState = [];
  const [goals, setGoals] = useState(initialState);
  const [contributions, setContributions] = useState(initialState);

  const fetchGoalsData = async () => {
    try {
      const response = await API.get(`${process.env.SERVER_URL}/goals`);
      const data = await response.data;
      setGoals(data.goals);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  const fetchContributionsData = async () => {
    try {
      const response = await fetch(
        `${process.env.SERVER_URL}/goals/contributions`
      );
      const data = await response.json();
      console.log("Contributions data:", data.contributions);
      setContributions(data.contributions);
    } catch (error) {
      console.error("Error fetching contributions:", error);
    }
  };

  useEffect(() => {
    fetchGoalsData();
    fetchContributionsData();
  }, []);

  const calculateProgress = (
    currentAmount: number,
    targetAmount: number
  ): number => {
    return Math.min(100, Math.round((currentAmount / targetAmount) * 100));
  };

  const calculateMonthlyTarget = (
    targetAmount: number,
    currentAmount: number,
    targetDate: string
  ): number => {
    const target = new Date(targetDate);
    const current = new Date();
    const monthsRemaining = Math.max(
      1,
      Math.ceil(
        (target.getTime() - current.getTime()) / (1000 * 60 * 60 * 24 * 30)
      )
    );
    const remainingAmount = targetAmount - currentAmount;
    return Math.ceil(remainingAmount / monthsRemaining);
  };

  const addGoal = async (goalData) => {
    console.log(goalData);
    const response = await API.post("/goals", goalData);
    console.log(response.data.goal);
    const newGoal = response.data.goal;
    setGoals((prev) => [...prev, newGoal]);
  };

  const updateGoal = async (id, updates) => {
    const response = await API.put(
      `${process.env.SERVER_URL}/goals/${id}`,
      updates
    ).then((res) => res.data);
    await fetchGoalsData();
    console.log("Goal updated:", response.goal);
    return response.goal;
  };

  const deleteGoal = (id: number) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
    setContributions((prev) =>
      prev.filter((contribution) => contribution.goalId !== id)
    );
  };

  const addContribution = async (goalId, amount: number) => {
    const response = await API.post(`/goals/${goalId}/contributions`, {
      amount,
    }).then((res) => res.data);
    console.log("Contribution added:", response);

    await fetchGoalsData();
    await fetchContributionsData();

    return response.contribution;
  };

  const getGoalById = (id): Goal | undefined => {
    const goal = goals.find((goal) => goal._id === id);
    console.log("Fetching goal by ID:", id, "Found:", goal);
    return goal;
  };

  const getContributionsByGoalId = (goalId) => {
    console.log("Fetching contributions for goal ID:", goalId);
    return contributions.filter(
      (contribution) => contribution.goalId === goalId
    );
  };

  const resetState = () => {
    setGoals(initialState);
    setContributions(initialState);
  };

  const setLoginState = async () => {
    await fetchGoalsData();
    await fetchContributionsData();
  };

  const value = {
    goals,
    contributions,
    addGoal,
    updateGoal,
    deleteGoal,
    addContribution,
    getGoalById,
    getContributionsByGoalId,
    resetState,
    setLoginState,
  };

  return (
    <GoalsContext.Provider value={value}>{children}</GoalsContext.Provider>
  );
};
