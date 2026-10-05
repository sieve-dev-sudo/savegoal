<div align="center">

# SaveGoal : Saving Goal Tracker

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-1572B6?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Tests](https://img.shields.io/badge/Tests-37%20passing-2ea44f?style=for-the-badge)
![Responsive](https://img.shields.io/badge/Responsive-Yes-brightgreen?style=for-the-badge)

</div>

---

> នេះជា **project demo សម្រាប់ portfolio** ដំណើរការលើ **local ប៉ុណ្ណោះ** មិនមានការ deploy ឬ hosting ទេ។ ទិន្នន័យទាំងអស់រក្សាទុកក្នុង browser `localStorage` របស់អ្នកប្រើប្រាស់។

---

## ✨ Features

- **បង្កើត/កែ/លុប Goal** ជាមួយ ឈ្មោះ, ចំនួនគោលដៅ, deadline, ប្រភេទ (category), និងរូបិយប័ណ្ណ (USD/KHR)
- **Deposit / Withdraw** ប្រាក់ចូល-ចេញពី Goal នីមួយៗ ជាមួយ Validation
- **Progress bar** ពណ៌ប្រែប្រួលតាមភាគរយ បង្ហាញចំនួនទឹកប្រាក់នៅសល់
- **ប្រវត្តិប្រតិបត្តិការ (Transaction History)** នៃ Goal នីមួយៗ ជាមួយកាលបរិច្ឆេទ
- **Filter** តាមស្ថានភាព (ទាំងអស់ / កំពុងដំណើរការ / សម្រេចហើយ)
- **Search + Sort** តាមឈ្មោះ, deadline, ឬភាគរយ
- **ប្រភេទ (Category)** ៦ ប្រភេទ ជាមួយ icon និងពណ៌ផ្ទាល់ខ្លួន
- **គណនាការសន្សំឆ្លាតវៃ**៖ ត្រូវសន្សំប៉ុន្មានក្នុងមួយថ្ងៃ/សប្តាហ៍/ខែ ដើម្បីទាន់ deadline
- **Dashboard** បង្ហាញស្ថិតិសរុប + Chart (Bar + Pie) ដោយ Recharts
- **Dark / Light mode** persist រក្សាទុកជម្រើស
- **Animation** រលូន (Framer Motion) + **Confetti** ពេល Goal សម្រេច 100%
- **Responsive** ពេញលេញ គ្រប់ទំហំអេក្រង់ (Mobile / Tablet / Desktop)
- **Error Boundary** + **Empty States** ការពារការ crash
- **Unit Tests** 37 tests ដោយ Vitest + React Testing Library

---

## 📁 Project Structure

```
savegoal/
├── src/
│   ├── components/           → UI components ទាំងអស់
│   │   ├── GoalCard.jsx
│   │   ├── GoalFormModal.jsx
│   │   ├── DepositWithdrawModal.jsx
│   │   ├── TransactionHistoryModal.jsx
│   │   ├── ConfirmDialog.jsx
│   │   ├── ModalOverlay.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── CategoryBadge.jsx
│   │   ├── GoalFilterTabs.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SortDropdown.jsx
│   │   ├── StatCard.jsx
│   │   ├── GoalProgressChart.jsx
│   │   ├── CategoryPieChart.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── EmptyState.jsx
│   │   ├── ToastContainer.jsx
│   │   ├── Header.jsx
│   │   ├── Nav.jsx
│   │   └── Layout.jsx
│   ├── context/               → State management (Context API)
│   │   ├── GoalContext.jsx    → CRUD, Deposit/Withdraw, localStorage
│   │   ├── ThemeContext.jsx   → Dark/Light mode
│   │   └── ToastContext.jsx   → Notifications
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── pages/
│   │   ├── GoalsPage.jsx      → ទំព័រគ្រប់គ្រង Goal
│   │   └── DashboardPage.jsx  → ស្ថិតិសរុប + Chart
│   ├── utils/                 → Logic & calculations
│   │   ├── goalStatus.js      → Progress, completion, saving pace
│   │   ├── currency.js        → USD/KHR formatting
│   │   ├── date.js            → Deadline calculations
│   │   ├── sortGoals.js       → Search & sort
│   │   ├── dashboardStats.js  → Dashboard statistics
│   │   ├── confetti.js
│   │   └── id.js
│   ├── constants/
│   │   ├── categories.js
│   │   ├── categoryColors.js
│   │   └── chartColors.js
│   ├── test/
│   │   └── setup.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html                 → ទំព័រដើម
└── README.md
```

---

## 🚀 How to Run

1. Clone ឬ Download Repository នេះ:
```bash
   git clone <repo-url>
   cd savegoal
```
2. ដំឡើង dependencies:
```bash
   npm install
```
3. រត់ development server:
```bash
   npm run dev
```
4. បើក browser ទៅកាន់ `http://localhost:5173/`
5. ចាប់ផ្តើមបង្កើត Goal ដំបូងរបស់អ្នក, deposit ប្រាក់, មើល Dashboard ។ល។

### Scripts ផ្សេងទៀត

```bash
npm run build          # Build production
npm run preview        # មើល production build
npm run lint           # ពិនិត្យកូដជាមួយ ESLint
npm run format         # រៀបកូដជាមួយ Prettier
npm run test           # រត់ unit tests (37 tests)
npm run test:watch     # រត់ tests ក្នុង watch mode
```

---

## 🧪 Testing

```bash
npm run test
```

```
✓ src/utils/goalStatus.test.js            (15 tests)
✓ src/utils/currency.test.js              (8 tests)
✓ src/utils/sortGoals.test.js             (9 tests)
✓ src/components/ProgressBar.test.jsx     (3 tests)
✓ src/components/CategoryBadge.test.jsx   (2 tests)

Test Files  5 passed (5)
     Tests  37 passed (37)
```

---

## 📝 Notes

- នេះជា **local demo project** សម្រាប់បង្ហាញសមត្ថភាពក្នុង portfolio គ្មានការ deploy ទៅ production ទេ
- ទិន្នន័យទាំងអស់រក្សាទុកក្នុង `localStorage` របស់ browser ដូច្នេះនឹងមិនមានឡើងលើឧបករណ៍ផ្សេង
- បង្កើតដោយអនុវត្តតាម Git workflow ពិតប្រាកដ (branch → PR → merge) សម្រាប់ feature នីមួយៗ

---

## 👤 Author

Developed by **Mr. Siev E**
