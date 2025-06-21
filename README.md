MinimalAccounting Project Plan
1. Feature Breakdown
Chart of Accounts

Create new accounts with name and type (Asset, Liability, Equity, Expense, Revenue)
Edit existing accounts
Delete accounts
List all accounts with filtering by type
Display account details

Journal Entry

Create journal entries with multiple lines
Each line includes account selection, debit, and credit amounts
Date selection for entry
Memo field for additional notes
Validation to ensure total debit equals total credit
List and view journal entries

2. Task Assignment
Developer 1 (Junior)

Frontend Tasks:
Implement AccountForm.tsx component
Create account list view with filtering
Set up Tailwind CSS styling for account-related UI
Implement basic form validation


Backend Tasks:
Create GET and POST API routes for accounts
Set up Prisma client integration for account operations



Developer 2 (Junior)

Frontend Tasks:
Implement JournalEntry.tsx component with dynamic line items
Create date picker integration
Implement running totals display
Style journal entry form using Tailwind CSS and shadcn components


Backend Tasks:
Create POST API route for journal entries
Implement debit/credit validation logic
Set up journal entry list endpoint



Leadership Responsibilities (You)

Define project architecture and standards
Review code and provide feedback
Ensure consistent UI/UX across components
Handle Prisma schema setup and migrations
Implement error handling and validation middleware
Coordinate task progress and resolve blockers

3. File and Folder Structure
MinimalAccounting/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── accounts/
│   │   │   │   ├── route.ts
│   │   │   │   ├── [id]/route.ts
│   │   │   ├── journal-entries/
│   │   │   │   ├── route.ts
│   │   ├── accounts/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   ├── [id]/edit/page.tsx
│   │   ├── journal-entries/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   ├── components/
│   │   ├── AccountForm.tsx
│   │   ├── JournalEntry.tsx
│   │   ├── ui/
│   │   │   └── (shadcn components)
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── validation.ts
│   ├── styles/
│   │   └── globals.css
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js

4. API Planning
Accounts (CRUD)

GET /api/accounts: List all accounts, optional type filter
GET /api/accounts/[id]: Get single account details
POST /api/accounts: Create new account
Body: { name: string, type: string }


PUT /api/accounts/[id]: Update account
Body: { name: string, type: string }


DELETE /api/accounts/[id]: Delete account

Journal Entries

POST /api/journal-entries: Create journal entry
Body: { date: string, memo?: string, lines: { accountId: string, debit: number, credit: number }[] }
Validation: Ensure sum(debit) = sum(credit)


GET /api/journal-entries: List journal entries with pagination

