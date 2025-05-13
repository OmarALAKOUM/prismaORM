/*
  Warnings:

  - You are about to drop the `pointofsale` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `pointofsaleproduct` DROP FOREIGN KEY `PointOfSaleProduct_pointOfSaleId_fkey`;

-- DropIndex
DROP INDEX `PointOfSaleProduct_pointOfSaleId_fkey` ON `pointofsaleproduct`;

-- DropTable
DROP TABLE `pointofsale`;

-- CreateTable
CREATE TABLE `pointofsales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `address` VARCHAR(255) NULL,
    `abc` VARCHAR(255) NULL,
    `phone` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NULL,
    `updatedAt` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PointOfSaleProduct` ADD CONSTRAINT `PointOfSaleProduct_pointOfSaleId_fkey` FOREIGN KEY (`pointOfSaleId`) REFERENCES `pointofsales`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
