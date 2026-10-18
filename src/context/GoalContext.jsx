import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from 'react';
import { generateId } from '../utils/id';
import { purgeExpired } from '../utils/trash';

const GoalContext = createContext(null);

const GOALS_KEY = 'savegoal:goals';
const TRASH_KEY = 'savegoal:trash';
const PURGE_INTERVAL_MS = 60 * 60 * 1000; // ពិនិត្យលុបរាល់ ១ ម៉ោង

function loadInitialGoals() {
  try {
    const stored = window.localStorage.getItem(GOALS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading goals from localStorage:', error);
    return [];
  }
}

function loadInitialTrash() {
  try {
    const stored = window.localStorage.getItem(TRASH_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    if (!Array.isArray(parsed)) return [];
    const valid = parsed.filter(
      (item) => item && typeof item.id === 'string' && item.deletedAt
    );
    // លុប item ដែលហួស ៣០ ថ្ងៃ ពេលបើក app
    return purgeExpired(valid);
  } catch (error) {
    console.error('Error reading trash from localStorage:', error);
    return [];
  }
}

function reportStorageError(error) {
  const message =
    error.name === 'QuotaExceededError'
      ? 'ទំហំផ្ទុកទិន្នន័យពេញហើយ។ Goal ថ្មីៗអាចនឹងមិនរក្សាទុក។'
      : 'មានបញ្ហាក្នុងការរក្សាទុកទិន្នន័យ។';
  window.dispatchEvent(
    new CustomEvent('savegoal:storage-error', { detail: message })
  );
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

    // ផ្លាស់ Goal ទៅធុងសម្រាម (មិនលុបចោលភ្លាមទេ)
    case 'DELETE_GOAL': {
      const target = state.goals.find((goal) => goal.id === action.payload.id);
      if (!target) return state;
      return {
        ...state,
        goals: state.goals.filter((goal) => goal.id !== action.payload.id),
        trash: [
          { ...target, deletedAt: action.payload.deletedAt },
          ...state.trash,
        ],
      };
    }

    case 'RESTORE_GOAL': {
      const item = state.trash.find((entry) => entry.id === action.payload.id);
      if (!item) return state;
      const restored = { ...item };
      delete restored.deletedAt;
      return {
        ...state,
        goals: [...state.goals, restored],
        trash: state.trash.filter((entry) => entry.id !== action.payload.id),
      };
    }

    case 'PURGE_TRASH_ITEM': {
      return {
        ...state,
        trash: state.trash.filter((entry) => entry.id !== action.payload.id),
      };
    }

    case 'EMPTY_TRASH': {
      return { ...state, trash: [] };
    }

    case 'PURGE_EXPIRED': {
      const kept = purgeExpired(state.trash, action.payload.now);
      if (kept.length === state.trash.length) return state;
      return { ...state, trash: kept };
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
    trash: loadInitialTrash(),
  }));

  useEffect(() => {
    try {
      window.localStorage.setItem(GOALS_KEY, JSON.stringify(state.goals));
    } catch (error) {
      console.error('Error writing goals to localStorage:', error);
      reportStorageError(error);
    }
  }, [state.goals]);

  useEffect(() => {
    try {
      window.localStorage.setItem(TRASH_KEY, JSON.stringify(state.trash));
    } catch (error) {
      console.error('Error writing trash to localStorage:', error);
      reportStorageError(error);
    }
  }, [state.trash]);

  // ពិនិត្យលុប item ដែលហួស ៣០ ថ្ងៃ ពេល app បើកទុកយូរ
  useEffect(() => {
    const id = window.setInterval(() => {
      dispatch({ type: 'PURGE_EXPIRED', payload: { now: Date.now() } });
    }, PURGE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  const addGoal = useCallback((goalData) => {
    const newGoal = {
      id: generateId(),
      name: goalData.name,
      targetAmount: goalData.targetAmount,
      currentAmount: 0,
      deadline: goalData.deadline || null,
      category: goalData.category || 'other',
      currency: goalData.currency || 'USD',
      note: goalData.note || '',
      image: goalData.image || null,
      createdAt: new Date().toISOString(),
      transactions: [],
    };
    dispatch({ type: 'ADD_GOAL', payload: newGoal });
    return newGoal.id;
  }, []);

  const editGoal = useCallback((id, updates) => {
    dispatch({ type: 'EDIT_GOAL', payload: { id, updates } });
  }, []);

  // ផ្លាស់ Goal ទៅធុងសម្រាម
  const deleteGoal = useCallback((id) => {
    dispatch({
      type: 'DELETE_GOAL',
      payload: { id, deletedAt: new Date().toISOString() },
    });
  }, []);

  const restoreGoal = useCallback((id) => {
    dispatch({ type: 'RESTORE_GOAL', payload: { id } });
  }, []);

  const deleteForever = useCallback((id) => {
    dispatch({ type: 'PURGE_TRASH_ITEM', payload: { id } });
  }, []);

  const emptyTrash = useCallback(() => {
    dispatch({ type: 'EMPTY_TRASH' });
  }, []);

  const setGoals = useCallback((goals) => {
    dispatch({ type: 'SET_GOALS', payload: goals });
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
    trash: state.trash,
    addGoal,
    editGoal,
    deleteGoal,
    restoreGoal,
    deleteForever,
    emptyTrash,
    setGoals,
    depositToGoal,
    withdrawFromGoal,
  };

  return (
    <GoalContext.Provider value={value}>{children}</GoalContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGoals() {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error('useGoals must be used within a GoalProvider');
  }
  return context;
}
