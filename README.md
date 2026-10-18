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

> នេះជា **project demo សម្រាប់ portfolio** ដំណើរការលើ **local ប៉ុណ្ណោះ** មិនមានការ deploy ឬ hosting ទេ។ ទិន្នន័យទាំងអស់រក្សាទុកក្នុង browser `localStorage` របស់អ្នកប្រើប្រាស់ រួមទាំងរូបភាពដែលអ្នកផ្ទុកឡើងផង (រូបមិនត្រូវបានផ្ញើទៅណាទេ)។

---

## ✨ Features

**ការគ្រប់គ្រង Goal**
- **បង្កើត/កែ Goal** ជាមួយ រូបភាព, ឈ្មោះ, ចំនួនគោលដៅ, កំណត់ចំណាំ (note), កាលបរិច្ឆេទគោលដៅ, ប្រភេទ (category) និងរូបិយប័ណ្ណ (USD/KHR)
- **ផ្ទុករូបភាពឡើងសម្រាប់ Goal** (សូមមើលផ្នែកខាងក្រោម)
- **Form បែប Outlined** field មានស៊ុម label ឡើងលើបន្ទាត់ពេលបំពេញ ព្រមទាំងប៊ូតុង Cancel / Done
- **ប៊ូតុង 🗑️ លើ Goal card** ចុចលុបបានលឿន មានសារបញ្ជាក់មុន (ក៏អាចលុបពីក្នុង Edit form ដែរ)
- **Search + Sort** តាមឈ្មោះ, deadline, ឬភាគរយ

**រូបភាព Goal (Image Upload)**
- **ជ្រើសរូប** ដោយចុចលើរង្វង់រូប ឬប៊ូតុង **Upload image** ឬ **អូសទម្លាក់** រូបពី computer
- គាំទ្រ **JPG, PNG, WEBP, GIF** ទំហំរហូតដល់ 10 MB (GIF ប្រើតែ frame ដំបូង)
- **កាត់ជាការ៉េ និងបង្រួម** ដោយស្វ័យប្រវត្តិទៅ 256×256 JPEG (ប្រហែល 15–35 KB) ដើម្បីកុំឱ្យ `localStorage` ពេញលឿន
- មាន Preview, សញ្ញា loading និងសារ error ច្បាស់លាស់ (ប្រភេទ file ខុស, ធំពេក, អានមិនបាន)
- **Remove** ត្រឡប់ទៅរូប illustration លំនាំដើម
- រូបបង្ហាញលើ Goal card, ទំព័រលម្អិត (ក្នុង Ring) និងធុងសម្រាម
- រូបត្រូវរក្សាក្នុង Backup ហើយ Import ត្រួតពិនិត្យថាជា data URL នៃរូបភាពពិត

**ធុងសម្រាម (Trash)**
- Goal ដែលលុប **ទៅធុងសម្រាម** មិនត្រូវបាត់ភ្លាមទេ រក្សាទិន្នន័យទាំងអស់ (ប្រាក់សន្សំ, ប្រវត្តិ, note, រូបភាព)
- **Restore** ស្ដារ Goal វិញបានក្នុងរយៈពេល **៣០ ថ្ងៃ** ហើយទិន្នន័យនៅដដែលទាំងស្រុង
- ចំនួនថ្ងៃនៅសល់បង្ហាញលើ Goal នីមួយៗ (ពណ៌ប្រែក្រហមពេលនៅសល់ ≤ ៣ ថ្ងៃ)
- **លុបចោលរហូតដោយស្វ័យប្រវត្តិ** ពេលគ្រប់ ៣០ ថ្ងៃ (ពិនិត្យពេលបើក app និងរាល់ម៉ោង)
- **Delete permanently** (មួយ) និង **Empty trash** (ទាំងអស់) មានសារបញ្ជាក់មុន
- Goal ក្នុងធុងសម្រាមមិនរាប់ក្នុង Dashboard និង Statistics ទេ
- មានលេខចំនួនបង្ហាញនៅ menu ចំហៀង

**ការសន្សំ**
- **Add saving (Deposit / Withdraw)** ជាមួយ Validation និងកំណត់ចំណាំ
- **Confetti** ពេល Goal សម្រេច 100%
- **ប្តូររូបិយប័ណ្ណ (Currency Conversion)**៖ USD ↔ KHR (1 USD = 4,100 KHR) បង្ហាញតម្លៃប្តូរភ្លាមៗពេលបញ្ចូលលេខ

**ទំព័រលម្អិត Goal (Popup)**
- **Circular progress** រង្វង់ 270° មាន ៣ ពណ៌ ជាមួយ badge ភាគរយ និងរូបភាព Goal ខាងក្នុង
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
- **Side Drawer** menu: Dashboard, Statistics, Trash, Export/Import backup, ប្តូរភាសា
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
│   │   ├── SideDrawer.jsx           → Menu ចំហៀង, trash, backup, ភាសា
│   │   ├── AddFab.jsx               → ប៊ូតុង + បង្កើត Goal
│   │   ├── GoalCard.jsx             → Card ក្នុងបញ្ជី Goal + ប៊ូតុងលុប
│   │   ├── GoalThumbnail.jsx        → រូបតំណាង Goal (រូបផ្ទុកឡើង ឬលំនាំដើម)
│   │   ├── ImagePicker.jsx          → ជ្រើស/អូសទម្លាក់/លុបរូប Goal
│   │   ├── GoalFormModal.jsx        → Create / Edit / Move to trash
│   │   ├── OutlinedField.jsx        → Field មានស៊ុម label លើបន្ទាត់
│   │   ├── GoalDetailModal.jsx      → Popup លម្អិត (GOAL / RECORDS)
│   │   ├── CircularProgress.jsx     → Ring ៣ ពណ៌ + រូប Goal
│   │   ├── DepositWithdrawModal.jsx
│   │   ├── RecordSortDropdown.jsx
│   │   ├── ConfirmDialog.jsx        → សារបញ្ជាក់ (ប្តូរពាក្យប៊ូតុងបាន)
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
│   │   ├── GoalContext.jsx          → CRUD, Trash, Deposit/Withdraw, localStorage
│   │   ├── ThemeContext.jsx         → Dark/Light mode
│   │   ├── LanguageContext.jsx      → EN/KH language
│   │   └── ToastContext.jsx         → Notifications
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── pages/
│   │   ├── GoalsPage.jsx            → Dashboard: បញ្ជី Goal + search/sort
│   │   ├── DashboardPage.jsx        → Statistics: ស្ថិតិ + Chart
│   │   └── TrashPage.jsx            → ធុងសម្រាម: Restore / លុបចោលរហូត
│   ├── utils/                       → Logic & calculations
│   │   ├── goalStatus.js            → Progress, completion, saving pace
│   │   ├── currency.js              → USD/KHR formatting & conversion
│   │   ├── date.js                  → Deadline calculations
│   │   ├── sortGoals.js             → Search & sort (goals + transactions)
│   │   ├── dashboardStats.js        → Statistics calculations
│   │   ├── trash.js                 → ច្បាប់រក្សាទុក ៣០ ថ្ងៃ និង purge
│   │   ├── image.js                 → ពិនិត្យ, កាត់, បង្រួមរូបភាព
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
| Image Processing | Canvas API (កាត់ និងបង្រួមក្នុង browser) |
| Typography | Inter (Latin) + Kantumruy Pro (ខ្មែរ) តាម `@fontsource` ដំណើរការ offline |
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
5. ចុចប៊ូតុង `+` បង្កើត Goal ដំបូង (ផ្ទុករូបបាន), ចុច Goal ដើម្បីបើកលម្អិត, ចុច ☰ ដើម្បីបើក menu, មើល Statistics និងធុងសម្រាម

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
| `trash.test.js` | ថ្ងៃនៅសល់, ផុតកំណត់ ៣០ ថ្ងៃ, ការលុបចោលដោយស្វ័យប្រវត្តិ |
| `image.test.js` | ប្រភេទ/ទំហំ file, ការគណនាកាត់ជាការ៉េ, ពិនិត្យ data URL |
| `backup.test.js` | ការត្រួតពិនិត្យ file backup, រក្សា និងសម្អាតរូបភាព |
| `ProgressBar.test.jsx` | Component ProgressBar (aria, ទទឹង, ពណ៌) |
| `CategoryBadge.test.jsx` | Component CategoryBadge (ភាសាខ្មែរ/អង់គ្លេស, fallback) |

---

## 🖼️ Goal Images

រូបភាពត្រូវបានដំណើរការទាំងស្រុងក្នុង browser របស់អ្នក៖

| ជំហាន | ការពិពណ៌នា |
|---|---|
| ១. ជ្រើសរូប | ចុច ឬអូសទម្លាក់ (JPG, PNG, WEBP, GIF ≤ 10 MB) |
| ២. កាត់ | កាត់ជាការ៉េពីកណ្តាលរូប |
| ៣. បង្រួម | បង្រួមទៅ 256×256 ជា JPEG គុណភាព 82% |
| ៤. រក្សា | រក្សាជា data URL ក្នុង Goal នីមួយៗ (`localStorage`) |

`localStorage` មានកំណត់ប្រហែល 5 MB សម្រាប់ទាំង Goal និងធុងសម្រាម ដូច្នេះរូបដែលបង្រួមរួច (~15–35 KB) អាចដាក់បានច្រើនរយ Goal។ បើទំហំពេញ app បង្ហាញសារ error ពណ៌ក្រហម។

## 🗑️ Trash & Auto Delete

ពេលចុច 🗑️ លើ Goal (ឬ **Move to trash** ក្នុង Edit form) Goal ត្រូវផ្លាស់ទៅធុងសម្រាម ហើយរក្សាទុកក្នុង `localStorage` key `savegoal:trash` ។

| ស្ថានភាព | លទ្ធផល |
|---|---|
| ក្នុង ៣០ ថ្ងៃ | ចុច **Restore** ត្រឡប់ទៅបញ្ជី Goal វិញ ទិន្នន័យ និងរូបភាពដូចដើម |
| គ្រប់ ៣០ ថ្ងៃ | លុបចោលរហូតដោយស្វ័យប្រវត្តិ ពេលបើក app និងពិនិត្យរាល់ម៉ោង |
| ចង់លុបមុនកំណត់ | **Delete permanently** ឬ **Empty trash** (មានសារបញ្ជាក់) |

## 💾 Backup & Restore

ចុច ☰ → **Export backup** ដើម្បីទាញយក file `savegoal-backup-YYYY-MM-DD.json` (រួមទាំងរូបភាព Goal ដែលធ្វើឱ្យ file ធំជាងមុន)។ ប្រើ **Import backup** ដើម្បីស្ដារទិន្នន័យវិញ (ការនាំចូលជំនួស Goal បច្ចុប្បន្នទាំងអស់ ហើយមានសារបញ្ជាក់មុន)។ File backup គ្របដណ្តប់តែ Goal សកម្ម មិនរួមបញ្ចូលធុងសម្រាមទេ។

## 🌐 Language Support

Project នេះគាំទ្រភាសា **English** និង **ខ្មែរ** ពេញលេញ។ ប្តូរភាសានៅក្នុង Side Drawer ។ ជម្រើសភាសានឹងត្រូវបានចងចាំទុកសម្រាប់ការបើកលើកក្រោយ (localStorage key: `savegoal:language`)។

អក្សរខ្មែរប្រើ font **Kantumruy Pro** (រចនាសម្រាប់អេក្រង់) ហើយអក្សរឡាតាំង និងលេខប្រើ **Inter** ។ Font ត្រូវបានដំឡើងតាម `@fontsource` ដូច្នេះដំណើរការ offline ហើយ browser ទាញយកតែផ្នែកដែលត្រូវការ ។ Attribute `lang` របស់ទំព័រប្តូរតាមភាសា (`km` / `en`) ដើម្បីឱ្យការបង្ហាញអក្សរខ្មែរ និងការបំបែកបន្ទាត់ត្រឹមត្រូវ ។

## 💱 Currency Conversion

Project គាំទ្ររូបិយប័ណ្ណ **USD** និង **KHR** ជាមួយអត្រាប្តូរថេរ **1 USD = 4,100 KHR**។ ពេលបញ្ចូលចំនួនទឹកប្រាក់ក្នុង Form ឬ Deposit/Withdraw នឹងបង្ហាញតម្លៃប្តូររូបិយប័ណ្ណដោយស្វ័យប្រវត្តិ (ឧ. `$500 → ≈ 2,050,000 ៛`)។ Chart ការសន្សំ ៦ ខែបម្លែង KHR ទៅ USD តាមអត្រានេះ ព្រោះបូកលុយពីរប្រភេទមិនបាន។

---

## 📝 Notes

- នេះជា **local demo project** សម្រាប់បង្ហាញសមត្ថភាពក្នុង portfolio គ្មានការ deploy ទៅ production ទេ
- ទិន្នន័យ និងរូបភាពទាំងអស់រក្សាទុកក្នុង `localStorage` របស់ browser ដូច្នេះនឹងមិនមានឡើងលើឧបករណ៍ផ្សេង ប្រើ **Export backup** ដើម្បីផ្ទេរទិន្នន័យ
- បង្កើតដោយអនុវត្តតាម Git workflow ពិតប្រាកដ (issue → branch → PR → merge) សម្រាប់ feature នីមួយៗ

---

## 👤 Author

Developed by **Mr. Siev E**
