import { createInsertSchema } from "drizzle-zod";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { z } from "zod";

export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  plaidId: text('plaid_id'),
  name: text('name').notNull(),
  userId: text('user_id').notNull(),
});

export const accountsRelations = relations(accounts, ({ many }) => ({
  transactions: many(transactions)
}));

// createInsertSchema: create a schema for insert data
export const insertAccountSchema = createInsertSchema(accounts);

// create a table for categories
export const categories = pgTable('categories', {
  id: text('id').primaryKey(),
  plaidId: text('plaid_id'),
  name: text('name').notNull(),
  userId: text('user_id').notNull(),
});

// create a relation for categories
export const categoriesRelations = relations(categories, ({ many }) => ({
  transactions: many(transactions)
}));

// create a schema for insert data
export const insertCategorySchema = createInsertSchema(categories);

// create a table for transactions
export const transactions = pgTable('transactions', {
  id: text('id').primaryKey(),
  amount: integer('amount').notNull(),
  payee: text('payee').notNull(),
  notes: text('notes'),
  date: timestamp('date', { mode: 'date' }).notNull(),
  accountId: text('account_id').references(() => accounts.id, {
    onDelete: 'cascade',
  }).notNull(),
  categoryId: text('category_id').references(() => categories.id, {
    onDelete: 'set null',
  }),
});

// create a relation for transactions
export const transactionsRelations = relations(transactions, ({ one }) => ({
  account: one(accounts, {
    fields: [transactions.accountId],
    references: [accounts.id]
  }),
  categories: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id]
  })
}));

// create a schema for insert data
export const insertTransactionSchema = createInsertSchema(transactions, {
  date: z.coerce.date()
})

