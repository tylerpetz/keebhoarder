/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `List` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Item_name_userId_idx";

-- DropIndex
DROP INDEX "List_name_userId_idx";

-- DropIndex
DROP INDEX "Photo_name_userId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Item_userId_key" ON "Item"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "List_userId_key" ON "List"("userId");
