/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_tagId_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
