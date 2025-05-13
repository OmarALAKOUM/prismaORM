/*
  Warnings:

  - You are about to drop the `pointofsaleproduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `pointofsaleproduct` DROP FOREIGN KEY `PointOfSaleProduct_pointOfSaleId_fkey`;

-- DropForeignKey
ALTER TABLE `pointofsaleproduct` DROP FOREIGN KEY `PointOfSaleProduct_productId_fkey`;

-- DropTable
DROP TABLE `pointofsaleproduct`;

-- CreateTable
CREATE TABLE `_PointOfSaleToProduct` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PointOfSaleToProduct_AB_unique`(`A`, `B`),
    INDEX `_PointOfSaleToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PointOfSaleToProduct` ADD CONSTRAINT `_PointOfSaleToProduct_A_fkey` FOREIGN KEY (`A`) REFERENCES `pointofsales`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PointOfSaleToProduct` ADD CONSTRAINT `_PointOfSaleToProduct_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
