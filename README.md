<div align="center">

# SaveGoal : Saving Goal Tracker

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-1572B6?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Tests](https://img.shields.io/badge/Tests-Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Responsive](https://img.shields.io/badge/Responsive-Yes-brightgreen?style=for-the-badge)
![Languages](https://img.shields.io/badge/Languages-EN%20%7C%20KH-6366F1?style=for-the-badge)

</div>

---

> នេះជា **project demo សម្រាប់ portfolio** ដំណើរការលើ **local ប៉ុណ្ណោះ** មិនមានការ deploy ឬ hosting ទេ។ ទិន្នន័យទាំងអស់រក្សាទុកក្នុង browser `localStorage` របស់អ្នកប្រើប្រាស់។

---

## ✨ Features

**ការគ្រប់គ្រង Goal**
- **បង្កើត/កែ/លុប Goal** ជាមួយ ឈ្មោះ, ចំនួនគោលដៅ, កំណត់ចំណាំ (note), កាលបរិច្ឆេទគោលដៅ, ប្រភេទ (category) និងរូបិយប័ណ្ណ (USD/KHR)
- **Form បែប Outlined** field មានស៊ុម label ឡើងលើបន្ទាត់ពេលបំពេញ ព្រមទាំងប៊ូតុង Cancel / Done
- **លុប Goal** ក្នុង Edit form មានសារបញ្ជាក់មុនលុប
- **Search + Sort** តាមឈ្មោះ, deadline, ឬភាគរយ

**ការសន្សំ**
- **Add saving (Deposit / Withdraw)** ជាមួយ Validation និងកំណត់ចំណាំ
- **Confetti** ពេល Goal សម្រេច 100%
- **ប្តូររូបិយប័ណ្ណ (Currency Conversion)**៖ USD ↔ KHR (1 USD = 4,100 KHR) បង្ហាញតម្លៃប្តូរភ្លាមៗពេលបញ្ចូលលេខ

**ទំព័រលម្អិត Goal (Popup)**
- **Circular progress** រង្វង់ 270° មាន ៣ ពណ៌ ជាមួយ badge ភាគរយ
- **Saved / Remaining / Goal** បង្ហាញច្បាស់លាស់
- **Target date + Countdown** (ឧ. `1 Months 21 Days To Go`)
- **Daily / Weekly / Monthly**៖ ចំនួនត្រូវសន្សំដើម្បីទាន់ deadline (បង្ហាញ `—` បើគ្មាន Target date)
- **Tab RECORDS** បញ្ជីប្រតិបត្តិការ ជាមួយ sort (default / date / amount)

**Statistics** (រៀបតាមលំដាប់ពីសរុបទៅលម្អិត)
- **Overall progress** សន្សំ / គោលដៅ / នៅសល់ ញែកតាមរូបិយប័ណ្ណ មាន progress bar
- **KPI ៤**៖ Goal សរុប, សម្រេចហើយ, ជិតសម្រេច (≥70%), ហួសកាលកំណត់
- **Needs attention**៖ បញ្ជី Goal ហួសកាលកំណត់ និងជិតសម្រេច
- **Goal progress** តារាងចំណាត់ថ្នាក់ពីភាគរយខ្ពស់ទៅទាប
- **ការសន្សំ ៦ ខែចុងក្រោយ** Bar chart សន្សំសុទ្ធ (បញ្ចូល − ដក) សមមូល USD ដោយ Recharts
- **Goal តាមប្រភេទ** Donut chart មានចំនួន Goal នៅកណ្តាល និងបញ្ជីភាគរយ
- **Recent activity** ប្រតិបត្តិការថ្មីៗ ៥ ចុងក្រោយ

**ទម្រង់ App**
- **Side Drawer** menu: Dashboard, Statistics, Export/Import backup, ប្តូរភាសា
- **ប៊ូតុង `+`** (Floating Action Button) សម្រាប់បង្កើត Goal ថ្មី
- **Backup** នាំចេញ/នាំចូលទិន្នន័យជា file `.json` ជាមួយការត្រួតពិនិត្យទម្រង់
- **ភាសា EN/KH** ប្តូរភាសាពេញលេញ persist រក្សាទុកជម្រើស
- **Dark / Light mode** persist រក្សាទុកជម្រើស
- **Animation** រលូន (Framer Motion)
- **Responsive** ពេញលេញ គ្រប់ទំហំអេក្រង់ (Mobile / Tablet / Desktop)
- **Error Boundary** + **Empty States** ការពារការ crash
- **Unit Tests** ដោយ Vitest + React Testing Library

---

## 📁 Project Structure

```
savegoal/
├── src/
│   ├── components/                  → UI components ទាំងអស់
│   │   ├── Header.jsx               → ☰ menu, ចំណងជើង, theme toggle
│   │   ├── Layout.jsx               → Header + Drawer + ToastContainer
│   │   ├── SideDrawer.jsx           → Menu ចំហៀង, backup, ភាសា
│   │   ├── AddFab.jsx               → ប៊ូតុង + បង្កើត Goal
│   │   ├── GoalCard.jsx             → Card ក្នុងបញ្ជី Goal
│   │   ├── GoalThumbnail.jsx        → រូបតំណាង Goal
│   │   ├── GoalFormModal.jsx        → Create / Edit / Delete Goal
│   │   ├── OutlinedField.jsx        → Field មានស៊ុម label លើបន្ទាត់
│   │   ├── GoalDetailModal.jsx      → Popup លម្អិត (GOAL / RECORDS)
│   │   ├── CircularProgress.jsx     → Ring ៣ ពណ៌
│   │   ├── DepositWithdrawModal.jsx
│   │   ├── RecordSortDropdown.jsx
│   │   ├── ConfirmDialog.jsx
│   │   ├── ModalOverlay.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── CategoryBadge.jsx
│   │   ├── CurrencyConversionHint.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SortDropdown.jsx
│   │   ├── LanguageToggle.jsx
│   │   ├── SectionCard.jsx          → Card ចែកផ្នែកក្នុង Statistics
│   │   ├── StatCard.jsx             → KPI card
│   │   ├── OverallProgressCard.jsx  → វឌ្ឍនភាពសរុប
│   │   ├── GoalRankingList.jsx      → ចំណាត់ថ្នាក់ Goal
│   │   ├── MonthlyActivityChart.jsx → Bar chart ៦ ខែ
│   │   ├── CategoryPieChart.jsx     → Donut តាមប្រភេទ
│   │   ├── RecentActivityList.jsx   → សកម្មភាពថ្មីៗ
│   │   ├── ErrorBoundary.jsx
│   │   ├── EmptyState.jsx
│   │   └── ToastContainer.jsx
│   ├── context/                     → State management (Context API)
│   │   ├── GoalContext.jsx          → CRUD, Deposit/Withdraw, localStorage
│   │   ├── ThemeContext.jsx         → Dark/Light mode
│   │   ├── LanguageContext.jsx      → EN/KH language
│   │   └── ToastContext.jsx         → Notifications
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── pages/
│   │   ├── GoalsPage.jsx            → Dashboard: បញ្ជី Goal + search/sort
│   │   └── DashboardPage.jsx        → Statistics: ស្ថិតិ + Chart
│   ├── utils/                       → Logic & calculations
│   │   ├── goalStatus.js            → Progress, completion, saving pace
│   │   ├── currency.js              → USD/KHR formatting & conversion
│   │   ├── date.js                  → Deadline calculations
│   │   ├── sortGoals.js             → Search & sort (goals + transactions)
│   │   ├── dashboardStats.js        → Statistics calculations
│   │   ├── backup.js                → Export / Import JSON backup
│   │   ├── confetti.js
│   │   └── id.js
│   ├── constants/
│   │   ├── categories.js            → Category list (EN/KH labels)
│   │   ├── categoryColors.js
│   │   ├── chartColors.js
│   │   └── translations.js          → EN/KH translation dictionary
│   ├── test/
│   │   └── setup.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html                       → ទំព័រដើម
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
| Backup | JSON file export / import |
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
5. ចុចប៊ូតុង `+` បង្កើត Goal ដំបូង, ចុច Goal ដើម្បីបើកលម្អិត, ចុច ☰ ដើម្បីបើក menu និងមើល Statistics

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

Unit tests គ្របដណ្តប់ logic សំខាន់ៗ៖

| File | ខ្លឹមសារដែលសាកល្បង |
|---|---|
| `goalStatus.test.js` | Progress, completion, remaining, filter, saving pace |
| `currency.test.js` | Formatting USD/KHR និង conversion |
| `sortGoals.test.js` | Search និង sort |
| `dashboardStats.test.js` | សរុប, ចំណាត់ថ្នាក់, ប្រភេទ, ការសន្សំរាយខែ, សកម្មភាពថ្មីៗ |
| `backup.test.js` | ការត្រួតពិនិត្យ និងបម្លែង file backup |
| `ProgressBar.test.jsx` | Component ProgressBar (aria, ទទឹង, ពណ៌) |
| `CategoryBadge.test.jsx` | Component CategoryBadge (ភាសាខ្មែរ/អង់គ្លេស, fallback) |

---

## 💾 Backup & Restore

ចុច ☰ → **Export backup** ដើម្បីទាញយក file `savegoal-backup-YYYY-MM-DD.json` ។ ប្រើ **Import backup** ដើម្បីស្ដារទិន្នន័យវិញ (ការនាំចូលជំនួស Goal បច្ចុប្បន្នទាំងអស់ ហើយមានសារបញ្ជាក់មុន)។

## 🌐 Language Support

Project នេះគាំទ្រភាសា **English** និង **ខ្មែរ** ពេញលេញ។ ប្តូរភាសានៅក្នុង Side Drawer ។ ជម្រើសភាសានឹងត្រូវបានចងចាំទុកសម្រាប់ការបើកលើកក្រោយ (localStorage key: `savegoal:language`)។

## 💱 Currency Conversion

Project គាំទ្ររូបិយប័ណ្ណ **USD** និង **KHR** ជាមួយអត្រាប្តូរថេរ **1 USD = 4,100 KHR**។ ពេលបញ្ចូលចំនួនទឹកប្រាក់ក្នុង Form ឬ Deposit/Withdraw នឹងបង្ហាញតម្លៃប្តូររូបិយប័ណ្ណដោយស្វ័យប្រវត្តិ (ឧ. `$500 → ≈ 2,050,000 ៛`)។ Chart ការសន្សំ ៦ ខែបម្លែង KHR ទៅ USD តាមអត្រានេះ ព្រោះបូកលុយពីរប្រភេទមិនបាន។

---

## 📝 Notes

- នេះជា **local demo project** សម្រាប់បង្ហាញសមត្ថភាពក្នុង portfolio គ្មានការ deploy ទៅ production ទេ
- ទិន្នន័យទាំងអស់រក្សាទុកក្នុង `localStorage` របស់ browser ដូច្នេះនឹងមិនមានឡើងលើឧបករណ៍ផ្សេង ប្រើ **Export backup** ដើម្បីផ្ទេរទិន្នន័យ
- បង្កើតដោយអនុវត្តតាម Git workflow ពិតប្រាកដ (issue → branch → PR → merge) សម្រាប់ feature នីមួយៗ

---

## 👤 Author

Developed by **Mr. Siev E**
