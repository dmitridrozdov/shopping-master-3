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