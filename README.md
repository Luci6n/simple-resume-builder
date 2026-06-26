# Simple Resume Builder
A simple resume builder designed to help create an ATS-friendly resume without a hitch (sort of). Just fill in the information, save it as a PDF, andddddd you are good to go.

## Features
- Live resume preview
- ATS-friendly PDF layout
- Local storage persistence (so you won't cry after accidentally close it)
- Light and dark mode toggle (dark mode is kinda ugly for now sowwy)
- Reverse layout toggle

## Project Structure
```
├── assets
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
├── components
│   ├── creator
│   └── preview
│       ├── Education.tsx
│       ├── Experience.tsx
│       ├── Header.tsx
│       ├── Projects.tsx
│       └── Summary.tsx
├── data
│   └── resumeData.ts
├── hooks
│   └── useResumeEditor.ts
├── pages
│   ├── Creator.tsx
│   └── Preview.tsx
├── utils
│   └── resumeEditor.ts
├── types
│   └── common.ts
├── App.css
├── App.tsx
├── index.css
└── main.tsx
```

## Installation and Usage
```sh
npm i
npm run dev
```

If using bun:
```sh
bun install
bun dev
```

After fill up all the information, you may click on the "Save as PDF" button to take a look on your freshly newborn resume.

## To-do in future
- [X] include delete/remove functionality
- [X] refactoring code (since now just everything in one big component lol)
- [X] improve dark mode styling
- [ ] Section modification, draggable to reorder, adding new section
- [ ] AI assisted in generating content of resume

## Contribution / Issue
Any contribution is welcome, just create a pull request, and I will go and take a look on it from time to time (probably) <br>
And any bugs spotted you are so welcome to create an issue

## License
[MIT](./LICENSE)

---

Build with love, probably, Idk, I just build this project just in case I need to create another resume lol 
