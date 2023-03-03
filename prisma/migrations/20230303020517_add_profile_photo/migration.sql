/*
  Warnings:

  - Added the required column `photo` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `membership` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "photo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "membership" TEXT NOT NULL;
