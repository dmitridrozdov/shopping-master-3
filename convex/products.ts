import { ConvexError, v } from "convex/values";

import { mutation, query } from "./_generated/server";

// create product mutation
export const createProduct = mutation({
  args: {
    category: v.string(),
    product: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("User not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .collect();

    if (user.length === 0) {
      throw new ConvexError("User not found");
    }

    return await ctx.db.insert("products", {
        category: args.category,
        product: args.product,
    });
  },
});

// this query will get the products by the search query.
export const getProductsBySearch = query({
  args: {
    search: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.search === "") {
      return await ctx.db.query("products").order("desc").collect();
    }

    const authorSearch = await ctx.db
      .query("products")
      .withSearchIndex("search_product", (q) => q.search("product", args.search))
      .take(10);

    if (authorSearch.length > 0) {
      return authorSearch;
    }
  },
});