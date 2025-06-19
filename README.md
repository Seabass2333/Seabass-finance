# My Money

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Introduction

**My Money** is a modern web application designed for personal finance management. Built with Next.js, Shadcn-UI, Hono, Neon, Drizzle, and Tailwind CSS, this application provides a user-friendly interface that allows users to efficiently manage their finances. The primary goal is to help users categorize and track their income and expenses, presenting financial data in an easily digestible format.

## Getting Started

First, run the development server. Recommended package managers are `pnpm` or `bun`.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## mock data

2024/04/01 - 2024/06/26

## Features

- **User Authentication**: Secure login and registration to protect user data.
- **Expense Tracking**: Easily log and categorize your expenses for better financial oversight.
- **Income Management**: Record and categorize your income sources.
- **Budgeting Tools**: Set budgets and track your spending against them to maintain financial discipline.
- **Data Visualization**: Interactive charts and tables to visualize your financial data, making it easier to understand your financial health at a glance.

## License

This project is licensed under the [MIT License](link-to-license).

## Structure

- **Hono**: api tool, using to fetch api (app/api/[[...route]]/\*)
- **drizzle**: db tool, using to operate database (drizzle)
- **Neon**: database, using to store data (db)
