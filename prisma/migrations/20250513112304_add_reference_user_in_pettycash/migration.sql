/*
  Warnings:

  - You are about to drop the `pettycash` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `pettycash`;

-- CreateTable
CREATE TABLE `pettycashes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `descript` VARCHAR(255) NULL,
    `status` INTEGER NULL,
    `createdAt` DATETIME(0) NULL,
    `updatedAt` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pettycashes` ADD CONSTRAINT `pettycashes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
