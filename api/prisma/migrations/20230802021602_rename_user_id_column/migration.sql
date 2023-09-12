/*
  Warnings:

  - You are about to drop the column `userId` on the `bank_acounts` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `bank_acounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bank_acounts" DROP COLUMN "userId",
ADD COLUMN     "user_id" UUID NOT NULL;
