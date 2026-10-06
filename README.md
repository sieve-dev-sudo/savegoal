<div align="center">

# SaveGoal : Saving Goal Tracker

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-1572B6?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Tests](https://img.shields.io/badge/Tests-37%20passing-2ea44f?style=for-the-badge)
![Responsive](https://img.shields.io/badge/Responsive-Yes-brightgreen?style=for-the-badge)
![Languages](https://img.shields.io/badge/Languages-EN%20%7C%20KH-6366F1?style=for-the-badge)

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
- **ប្តូររូបិយប័ណ្ណ (Currency Conversion)**៖ USD ↔ KHR (1 USD = 4,100 KHR) បង្ហាញតម្លៃប្តូរភ្លាមៗពេលបញ្ចូលលេខ
- **ភាសា EN/KH**៖ ប្តូរភាសាពេញលេញ (English / ខ្មែរ) persist រក្សាទុកជម្រើស
- **Dashboard** បង្ហាញស្ថិតិសរុប + Chart (Bar + Pie) ដោយ Recharts
- **Dark / Light mode** persist រក្សាទុកជម្រើស
- **Animation** រលូន (Framer Motion) + **Confetti** ពេល Goal សម្រេច 100%
- **Responsive** ពេញលេញ គ្រប់ទំហំអេក្រង់ (Mobile / Tablet / Desktop)
- **Error Boundary** + **Empty States** ការពារការ crash
- **Unit Tests** 37+ tests ដោយ Vitest + React Testing Library

---

## 📁 Project Structure

```
savegoal/
├── src/
│   ├── components/              → UI components ទាំងអស់
│   │   ├── GoalCard.jsx
│   │   ├── GoalFormModal.jsx
│   │   ├── DepositWithdrawModal.jsx
│   │   ├── TransactionHistoryModal.jsx
│   │   ├── ConfirmDialog.jsx
│   │   ├── ModalOverlay.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── CategoryBadge.jsx
│   │   ├── CurrencyConversionHint.jsx
│   │   ├── GoalFilterTabs.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SortDropdown.jsx
│   │   ├── LanguageToggle.jsx
│   │   ├── StatCard.jsx
│   │   ├── GoalProgressChart.jsx
│   │   ├── CategoryPieChart.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── EmptyState.jsx
│   │   ├── ToastContainer.jsx
│   │   ├── Header.jsx
│   │   ├── Nav.jsx
│   │   └── Layout.jsx
│   ├── context/                 → State management (Context API)
│   │   ├── GoalContext.jsx      → CRUD, Deposit/Withdraw, localStorage
│   │   ├── ThemeContext.jsx     → Dark/Light mode
│   │   ├── LanguageContext.jsx  → EN/KH language
│   │   └── ToastContext.jsx     → Notifications
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── pages/
│   │   ├── GoalsPage.jsx        → ទំព័រគ្រប់គ្រង Goal
│   │   └── DashboardPage.jsx    → ស្ថិតិសរុប + Chart
│   ├── utils/                   → Logic & calculations
│   │   ├── goalStatus.js        → Progress, completion, saving pace
│   │   ├── currency.js          → USD/KHR formatting & conversion
│   │   ├── date.js              → Deadline calculations
│   │   ├── sortGoals.js         → Search & sort
│   │   ├── dashboardStats.js    → Dashboard statistics
│   │   ├── confetti.js
│   │   └── id.js
│   ├── constants/
│   │   ├── categories.js        → Category list (EN/KH labels)
│   │   ├── categoryColors.js
│   │   ├── chartColors.js
│   │   └── translations.js      → EN/KH translation dictionary
│   ├── test/
│   │   └── setup.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html                   → ទំព័រដើម
└── README.md
```

---

## 🛠️ Tech Stack

| ប្រភេទ | ឧបករណ៍ |
|---|---|
| Framework | React 19 + Vite |
| Styling | Tailwind CSS v4 |
| State Management | Context API + useReducer |
| Animation | Framer Motion |
| Charts | Recharts |
| Icons | Lucide React |
| Testing | Vitest + React Testing Library |
| Data Storage | Browser localStorage |
| Internationalization | Custom EN/KH translation dictionary |
| Code Quality | ESLint + Prettier |

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
5. ចាប់ផ្តើមបង្កើត Goal ដំបូងរបស់អ្នក, deposit ប្រាក់, ប្តូរភាសា, មើល Dashboard ។ល។

### Scripts ផ្សេងទៀត

```bash
npm run build          # Build production
npm run preview        # មើល production build
npm run lint           # ពិនិត្យកូដជាមួយ ESLint
npm run format         # រៀបកូដជាមួយ Prettier
npm run test           # រត់ unit tests
npm run test:watch     # រត់ tests ក្នុង watch mode
```

---

## 🧪 Testing

```bash
npm run test
```

```
✓ src/utils/goalStatus.test.js            (15 tests)
✓ src/utils/currency.test.js              (16 tests)
✓ src/utils/sortGoals.test.js             (9 tests)
✓ src/components/ProgressBar.test.jsx     (3 tests)
✓ src/components/CategoryBadge.test.jsx   (2 tests)

Test Files  5 passed (5)
     Tests  45 passed (45)
```

---

## 🌐 Language Support

Project នេះគាំទ្រភាសា **English** និង **ខ្មែរ** ពេញលេញ។ ចុចប៊ូតុង **EN / KH** នៅផ្នែកខាងលើស្តាំនៃ Header ដើម្បីប្តូរភាសា។ ជម្រើសភាសានឹងត្រូវបានចងចាំទុកសម្រាប់ការបើកលើកក្រោយ (localStorage key: `savegoal:language`)។

## 💱 Currency Conversion

Project គាំទ្ររូបិយប័ណ្ណ **USD** និង **KHR** ជាមួយអត្រាប្តូរថេរ **1 USD = 4,100 KHR**។ ពេលបញ្ចូលចំនួនទឹកប្រាក់ក្នុង Form ឬ Deposit/Withdraw នឹងបង្ហាញតម្លៃប្តូររូបិយប័ណ្ណដោយស្វ័យប្រវត្តិ (ឧ. `$500 → ≈ 2,050,000 ៛`)។

---

## 📝 Notes

- នេះជា **local demo project** សម្រាប់បង្ហាញសមត្ថភាពក្នុង portfolio គ្មានការ deploy ទៅ production ទេ
- ទិន្នន័យទាំងអស់រក្សាទុកក្នុង `localStorage` របស់ browser ដូច្នេះនឹងមិនមានឡើងលើឧបករណ៍ផ្សេង
- បង្កើតដោយអនុវត្តតាម Git workflow ពិតប្រាកដ (branch → PR → merge) សម្រាប់ feature នីមួយៗ

---

## 👤 Author

Developed by **Mr. Siev E**
