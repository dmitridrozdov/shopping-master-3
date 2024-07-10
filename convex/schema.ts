import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({

  currentproducts: defineTable({
    user: v.id('users'),
    authorId: v.string(),
    authorImageUrl: v.string(),
    category: v.string(),
    product: v.string(),
  })
    .searchIndex('search_product', { searchField: 'product' })
    .searchIndex('search_category', { searchField: 'category' }),

    users: defineTable({
        email: v.string(),
        clerkId: v.string(),
        name: v.string(),
    }),

    products: defineTable({
        category: v.string(),
        product: v.string(),
      })
        .searchIndex('search_product', { searchField: 'product' })
        .searchIndex('search_category', { searchField: 'category' }),
})