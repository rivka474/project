
# ProjectVidislavsky

פרויקט לדוגמה עבור המורה, מבוסס Node.js ו-TypeScript.

## מבנה הפרויקט

- `client/` - צד לקוח, כולל קובץ `index.html`.
- `server/` - צד שרת ב-TypeScript:
  - `index.ts` - קובץ הכניסה לשרת.
  - `client-server.ts` - לוגיקת צד שרת.
  - `uploads/` - תיקיית העלאות קבצים.
  - `package.json`, `tsconfig.json` - קבצי הגדרות.

## טכנולוגיות

- Node.js
- TypeScript
- Express
- Mongoose
- Multer (להעלאת קבצים)

## התקנה והרצה

1. התקנת תלויות:
	```powershell
	cd server
	npm install
	```
2. קומפילציה והרצה:
	```powershell
	npx tsc
	node dist/index.js
	```

## שימוש

- העלאת קבצים דרך השרת.
- שמירת נתונים ב-MongoDB.
- ממשק משתמש בסיסי ב-HTML.
