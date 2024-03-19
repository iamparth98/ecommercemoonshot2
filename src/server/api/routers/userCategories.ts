import { db } from "@/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userCategoryRouter = createTRPCRouter({
  userCategoryList: publicProcedure.query(async () => {
    const userCategories = await db.category.findMany();
    return userCategories;
  }),
});
