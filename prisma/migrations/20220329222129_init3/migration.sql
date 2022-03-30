/*
  Warnings:

  - The `category` column on the `Item` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "category",
ADD COLUMN     "category" TEXT[];

-- DropEnum
DROP TYPE "Category";
