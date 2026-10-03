import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from 'react';
import { generateId } from '../utils/id';

const GoalContext = createContext(null);

const STORAGE_KEY = 'savegoal:goals';

function loadInitialGoals() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading goals from localStorage:', error);
    return [];
  }
}

function goalReducer(state, action) {
  switch (action.type) {
    case 'ADD_GOAL': {
      return {
        ...state,
        goals: [...state.goals, action.payload],
      };
    }

    case 'EDIT_GOAL': {
      return {
        ...state,
        goals: state.goals.map((goal) =>
          goal.id === action.payload.id
            ? { ...goal, ...action.payload.updates }
            : goal
        ),
      };
    }

    case 'DELETE_GOAL': {
      return {
        ...state,
        goals: state.goals.filter((goal) => goal.id !== action.payload.id),
      };
    }

    case 'DEPOSIT': {
      return {
        ...state,
        goals: state.goals.map((goal) => {
          if (goal.id !== action.payload.goalId) return goal;
          return {
            ...goal,
            currentAmount: goal.currentAmount + action.payload.amount,
            transactions: [action.payload.transaction, ...goal.transactions],
          };
        }),
      };
    }

    case 'WITHDRAW': {
      return {
        ...state,
        goals: state.goals.map((goal) => {
          if (goal.id !== action.payload.goalId) return goal;
          return {
            ...goal,
            currentAmount: Math.max(
              0,
              goal.currentAmount - action.payload.amount
            ),
            transactions: [action.payload.transaction, ...goal.transactions],
          };
        }),
      };
    }

    case 'SET_GOALS': {
      return {
        ...state,
        goals: action.payload,
      };
    }

    default:
      return state;
  }
}

export function GoalProvider({ children }) {
  const [state, dispatch] = useReducer(goalReducer, null, () => ({
    goals: loadInitialGoals(),
  }));

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.goals));
    } catch (error) {
      console.error('Error writing goals to localStorage:', error);
      if (error.name === 'QuotaExceededError') {
        window.dispatchEvent(
          new CustomEvent('savegoal:storage-error', {
            detail: 'ទំហំផ្ទុកទិន្នន័យពេញហើយ។ Goal ថ្មីៗអាចនឹងមិនរក្សាទុក។',
          })
        );
      } else {
        window.dispatchEvent(
          new CustomEvent('savegoal:storage-error', {
            detail: 'មានបញ្ហាក្នុងការរក្សាទុកទិន្នន័យ។',
          })
        );
      }
    }
  }, [state.goals]);

  const addGoal = useCallback((goalData) => {
    const newGoal = {
      id: generateId(),
      name: goalData.name,
      targetAmount: goalData.targetAmount,
      currentAmount: 0,
      deadline: goalData.deadline || null,
      category: goalData.category || 'other',
      currency: goalData.currency || 'USD',
      createdAt: new Date().toISOString(),
      transactions: [],
    };
    dispatch({ type: 'ADD_GOAL', payload: newGoal });
    return newGoal.id;
  }, []);

  const editGoal = useCallback((id, updates) => {
    dispatch({ type: 'EDIT_GOAL', payload: { id, updates } });
  }, []);

  const deleteGoal = useCallback((id) => {
    dispatch({ type: 'DELETE_GOAL', payload: { id } });
  }, []);

  const depositToGoal = useCallback((goalId, amount, note = '') => {
    if (amount <= 0) return;
    const transaction = {
      id: generateId(),
      type: 'deposit',
      amount,
      note,
      date: new Date().toISOString(),
    };
    dispatch({ type: 'DEPOSIT', payload: { goalId, amount, transaction } });
  }, []);

  const withdrawFromGoal = useCallback((goalId, amount, note = '') => {
    if (amount <= 0) return;
    const transaction = {
      id: generateId(),
      type: 'withdraw',
      amount,
      note,
      date: new Date().toISOString(),
    };
    dispatch({ type: 'WITHDRAW', payload: { goalId, amount, transaction } });
  }, []);

  const value = {
    goals: state.goals,
    addGoal,
    editGoal,
    deleteGoal,
    depositToGoal,
    withdrawFromGoal,
  };

  return <GoalContext.Provider value={value}>{children}</GoalContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGoals() {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error('useGoals must be used within a GoalProvider');
  }
  return context;
}
