import { useState, useMemo } from 'react';

export interface SipInputs {
  monthlyInvestment: number;
  annualReturnRate: number;
  investmentDuration: number;
}

export interface SipResults {
  totalInvested: number;
  totalInterest: number;
  maturityValue: number;
  yearlyData: Array<{
    year: number;
    invested: number;
    interest: number;
    total: number;
  }>;
}

export interface ValidationError {
  field: keyof SipInputs | 'general';
  message: string;
}

export const useSipCalculator = () => {
  const [inputs, setInputs] = useState<SipInputs>({
    monthlyInvestment: 5000,
    annualReturnRate: 12,
    investmentDuration: 10,
  });

  const [errors, setErrors] = useState<ValidationError[]>([]);

  const validateInputs = (sipInputs: SipInputs): ValidationError[] => {
    const newErrors: ValidationError[] = [];

    // Monthly Investment validation
    if (sipInputs.monthlyInvestment <= 0) {
      newErrors.push({
        field: 'monthlyInvestment',
        message: sipInputs.monthlyInvestment === 0 
          ? 'Investment must be greater than 0'
          : 'Invalid input - investment cannot be negative'
      });
    } else if (sipInputs.monthlyInvestment > 100000000) { // 10 crore
      newErrors.push({
        field: 'monthlyInvestment',
        message: 'Investment amount exceeds ₹10 crore limit'
      });
    }

    // Annual Return Rate validation
    if (sipInputs.annualReturnRate < 0) {
      newErrors.push({
        field: 'annualReturnRate',
        message: 'Invalid input - return rate cannot be negative'
      });
    } else if (sipInputs.annualReturnRate > 100) {
      if (sipInputs.annualReturnRate > 999) {
        newErrors.push({
          field: 'annualReturnRate',
          message: 'Return rate is extremely unrealistic (max 999%)'
        });
      } else {
        newErrors.push({
          field: 'annualReturnRate',
          message: 'Interest seems unrealistic (>100% annual return)'
        });
      }
    }

    // Investment Duration validation
    if (sipInputs.investmentDuration < 0.5) {
      newErrors.push({
        field: 'investmentDuration',
        message: sipInputs.investmentDuration <= 0
          ? 'Investment duration must be at least 0.5 years'
          : 'Investment duration must be at least 0.5 years'
      });
    } else if (sipInputs.investmentDuration > 100) {
      newErrors.push({
        field: 'investmentDuration',
        message: 'Unrealistic time frame (>100 years) - consider shorter duration'
      });
    }

    // Check for empty/invalid fields
    if (isNaN(sipInputs.monthlyInvestment) || sipInputs.monthlyInvestment === null || sipInputs.monthlyInvestment === undefined) {
      newErrors.push({
        field: 'monthlyInvestment',
        message: 'Monthly investment is required'
      });
    }

    if (isNaN(sipInputs.annualReturnRate) || sipInputs.annualReturnRate === null || sipInputs.annualReturnRate === undefined) {
      newErrors.push({
        field: 'annualReturnRate',
        message: 'Annual return rate is required'
      });
    }

    if (isNaN(sipInputs.investmentDuration) || sipInputs.investmentDuration === null || sipInputs.investmentDuration === undefined) {
      newErrors.push({
        field: 'investmentDuration',
        message: 'Investment duration is required'
      });
    }

    return newErrors;
  };

  const calculateSip = (sipInputs: SipInputs): SipResults => {
    const { monthlyInvestment, annualReturnRate, investmentDuration } = sipInputs;
    
    const monthlyRate = annualReturnRate / 12 / 100;
    const totalMonths = investmentDuration * 12;
    const totalInvested = monthlyInvestment * totalMonths;

    let maturityValue: number;

    // Handle zero interest rate case
    if (annualReturnRate === 0) {
      maturityValue = totalInvested;
    } else {
      // Standard SIP formula: FV = P × [{(1 + r)^n – 1} / r] × (1 + r)
      const compound = Math.pow(1 + monthlyRate, totalMonths);
      const numerator = (compound - 1) / monthlyRate;
      maturityValue = monthlyInvestment * numerator * (1 + monthlyRate);
    }

    const totalInterest = maturityValue - totalInvested;

    // Generate yearly data for chart
    const yearlyData = [];
    for (let year = 1; year <= investmentDuration; year++) {
      const monthsElapsed = year * 12;
      const investedSoFar = monthlyInvestment * monthsElapsed;
      
      let valueAtYear: number;
      if (annualReturnRate === 0) {
        valueAtYear = investedSoFar;
      } else {
        const compoundAtYear = Math.pow(1 + monthlyRate, monthsElapsed);
        valueAtYear = monthlyInvestment * ((compoundAtYear - 1) / monthlyRate) * (1 + monthlyRate);
      }
      
      const interestAtYear = valueAtYear - investedSoFar;

      yearlyData.push({
        year,
        invested: Math.round(investedSoFar),
        interest: Math.round(interestAtYear),
        total: Math.round(valueAtYear),
      });
    }

    return {
      totalInvested: Math.round(totalInvested),
      totalInterest: Math.round(totalInterest),
      maturityValue: Math.round(maturityValue),
      yearlyData,
    };
  };

  const results = useMemo(() => {
    const validationErrors = validateInputs(inputs);
    setErrors(validationErrors);

    if (validationErrors.length === 0) {
      return calculateSip(inputs);
    }

    // Return default values if validation fails
    return {
      totalInvested: 0,
      totalInterest: 0,
      maturityValue: 0,
      yearlyData: [],
    };
  }, [inputs]);

  const updateInput = (field: keyof SipInputs, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetInputs = () => {
    setInputs({
      monthlyInvestment: 5000,
      annualReturnRate: 12,
      investmentDuration: 10,
    });
    setErrors([]);
  };

  const getFieldError = (field: keyof SipInputs): string | undefined => {
    return errors.find(error => error.field === field)?.message;
  };

  const isValid = errors.length === 0;

  return {
    inputs,
    results,
    errors,
    isValid,
    updateInput,
    resetInputs,
    getFieldError,
  };
};

// Utility function to format currency
export const formatCurrency = (amount: number): string => {
  if (amount >= 10000000) { // 1 crore
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) { // 1 lakh
    return `₹${(amount / 100000).toFixed(2)} L`;
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(2)} K`;
  } else {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
};