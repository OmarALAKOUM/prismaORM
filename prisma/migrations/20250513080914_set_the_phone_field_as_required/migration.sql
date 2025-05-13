/*
  Warnings:

  - You are about to drop the column `omar` on the `pettycash` table. All the data in the column will be lost.
  - You are about to drop the column `omar` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phoneNo]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `pettycash` DROP COLUMN `omar`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `omar`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `email`;

-- CreateIndex
CREATE UNIQUE INDEX `User_phoneNo_key` ON `User`(`phoneNo`);
