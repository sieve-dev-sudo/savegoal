<div align="center">

# SaveGoal : Saving Goal Tracker

</div>

## 🛠️ Tech Stack

**ភាសាសរសេរកូដ និង ឧបករណ៍**

![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat&logo=vitest&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier&logoColor=black)
![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?style=flat&logo=visualstudiocode&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)

---

## ✨ Features

- **បង្កើត / កែ Goal**: មានរូបភាព, ឈ្មោះ, ចំនួនគោលដៅ, note, កាលបរិច្ឆេទគោលដៅ, ប្រភេទ និងរូបិយប័ណ្ណ USD / KHR
- **រូបភាព Goal**: ចុច ឬអូសទម្លាក់រូប (JPG, PNG, WEBP, GIF ≤ 10 MB) កាត់ជាការ៉េ និងបង្រួមដោយស្វ័យប្រវត្តិ
- **Search + Sort**: ស្វែងរកតាមឈ្មោះ និងតម្រៀបតាម deadline ឬភាគរយ
- **Deposit / Withdraw**: បញ្ចូល ឬដកប្រាក់ មាន Validation, note និង Confetti ពេលសម្រេច 100%
- **ប្តូររូបិយប័ណ្ណ**: USD ↔ KHR (1 USD = 4,100 KHR) បង្ហាញតម្លៃប្តូរភ្លាមៗពេលបញ្ចូលលេខ
- **ទំព័រលម្អិត Goal**: Circular progress 270°, Countdown, ចំនួនត្រូវសន្សំ Daily / Weekly / Monthly និង tab RECORDS
- **Statistics**: Overall progress, KPI ៤, Needs attention, ចំណាត់ថ្នាក់ Goal, Bar chart ៦ ខែ, Donut chart តាមប្រភេទ និង Recent activity
- **ធុងសម្រាម (Trash)**: Goal ដែលលុបរក្សាទុក ៣០ ថ្ងៃ អាច Restore បាន ហើយលុបចោលដោយស្វ័យប្រវត្តិពេលផុតកំណត់
- **Backup**: Export / Import ទិន្នន័យជា file `.json` មានការត្រួតពិនិត្យទម្រង់
- **UI ទំនើប**: Side Drawer, ប៊ូតុង `+` (FAB), Form បែប Outlined, Dark / Light mode និង Animation រលូន
- **Responsive**: ពេញលេញ គ្រប់ទំហំអេក្រង់ (Mobile / Tablet / Desktop) មាន Error Boundary និង Empty States

---

## 📁 Project Structure

```
savegoal/
├── src/
│   ├── components/              → UI components ទាំងអស់ (Header, GoalCard, ImagePicker, Modals, Charts...)
│   ├── context/
│   │   ├── GoalContext.jsx      → CRUD, Trash, Deposit / Withdraw, localStorage
│   │   ├── ThemeContext.jsx     → Dark / Light mode
│   │   ├── LanguageContext.jsx  → ភាសា EN / KH
│   │   └── ToastContext.jsx     → Notifications
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── pages/
│   │   ├── GoalsPage.jsx        → Dashboard: បញ្ជី Goal + search / sort
│   │   ├── DashboardPage.jsx    → Statistics: ស្ថិតិ + Chart
│   │   └── TrashPage.jsx        → ធុងសម្រាម: Restore / លុបចោលរហូត
│   ├── utils/
│   │   ├── goalStatus.js        → Progress, completion, saving pace
│   │   ├── currency.js          → USD / KHR formatting និង conversion
│   │   ├── date.js              → គណនា Deadline
│   │   ├── sortGoals.js         → Search និង sort
│   │   ├── dashboardStats.js    → គណនាស្ថិតិ
│   │   ├── trash.js             → ច្បាប់រក្សាទុក ៣០ ថ្ងៃ និង purge
│   │   ├── image.js             → ពិនិត្យ, កាត់, បង្រួមរូបភាព
│   │   ├── backup.js            → Export / Import JSON
│   │   ├── confetti.js
│   │   └── id.js
│   ├── constants/               → categories, colors, translations (EN / KH)
│   ├── test/
│   │   └── setup.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html                   → ទំព័រដើម
└── README.md
```

---

## 🖼️ Goal Images

- ជ្រើសរូបដោយចុចលើរង្វង់រូប ប៊ូតុង **Upload image** ឬ **អូសទម្លាក់** ពី computer
- រូបត្រូវកាត់ជាការ៉េពីកណ្តាល ហើយបង្រួមទៅ **256×256 JPEG** (ប្រហែល 15–35 KB) ដើម្បីកុំឱ្យ `localStorage` ពេញលឿន
- ចុច **Remove** ដើម្បីត្រឡប់ទៅរូប illustration លំនាំដើម
- រូបបង្ហាញលើ Goal card, ទំព័រលម្អិត និងធុងសម្រាម ហើយត្រូវរក្សាក្នុង Backup ផងដែរ

---

## 🗑️ Trash & Auto Delete

- ចុច 🗑️ លើ Goal (ឬ **Move to trash** ក្នុង Edit form) Goal ត្រូវផ្លាស់ទៅធុងសម្រាម ជាមួយទិន្នន័យទាំងអស់
- ចុច **Restore** ក្នុងរយៈពេល **៣០ ថ្ងៃ** ដើម្បីស្ដារវិញ ចំនួនថ្ងៃនៅសល់ប្រែពណ៌ក្រហមពេល ≤ ៣ ថ្ងៃ
- គ្រប់ ៣០ ថ្ងៃ Goal ត្រូវលុបចោលរហូតដោយស្វ័យប្រវត្តិ (ពិនិត្យពេលបើក app និងរាល់ម៉ោង)
- **Delete permanently** និង **Empty trash** មានសារបញ្ជាក់មុនលុប

---

## 🌐 Language Switcher

- ប្តូរភាសា **ខ្មែរ | English** នៅក្នុង Side Drawer ទំព័រទាំងមូលប្តូរភ្លាមៗដោយមិនចាំបាច់ Reload
- ជម្រើសភាសាត្រូវបានរក្សាទុកក្នុង `localStorage` (key: `savegoal:language`)
- អក្សរខ្មែរប្រើ font **Kantumruy Pro** ហើយអក្សរឡាតាំងប្រើ **Inter** តាម `@fontsource` ដំណើរការ offline

---

## 🚀 How to Run

1. Clone ឬ Download Repository:

   ```bash
   git clone <repo-url> savegoal
   cd savegoal
   ```

2. ដំឡើង dependencies និងរត់ development server:

   ```bash
   npm install
   npm run dev
   ```

3. បើក browser ទៅកាន់ `http://localhost:5173/`
4. ចុចប៊ូតុង `+` បង្កើត Goal ដំបូង, ចុច Goal ដើម្បីមើលលម្អិត, ចុច ☰ ដើម្បីបើក menu, មើល Statistics និងធុងសម្រាម។

**Scripts ផ្សេងទៀត**

```bash
npm run build      # Build production
npm run preview    # មើល production build
npm run lint       # ពិនិត្យកូដជាមួយ ESLint
npm run format     # រៀបកូដជាមួយ Prettier
npm run test       # រត់ unit tests (Vitest)
```

---

## 👤 Author

**Built with ❤️ and code by Mr. Siev E**
