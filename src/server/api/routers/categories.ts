import { db } from "@/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const categoryRouter = createTRPCRouter({
  categoryList: publicProcedure.query(async () => {
    const categories = await db.category.findMany();
    return categories;
  }),
});
