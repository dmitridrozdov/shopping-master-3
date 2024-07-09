import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    category: v.string(),
    product: v.string(),
  })
    .searchIndex('search_product', { searchField: 'product' })
    .searchIndex('search_category', { searchField: 'category' })
})