-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `login` VARCHAR(255) NOT NULL,
    `password` CHAR(60) NOT NULL,
    `email` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `User_login_key`(`login`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserCalendars` (
    `userId` INTEGER NOT NULL,
    `calendarId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `calendarId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserEvents` (
    `userId` INTEGER NOT NULL,
    `eventId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `eventId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Calendar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `color` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `calendarId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `color` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `startAt` TIMESTAMP(0) NOT NULL,
    `endAt` TIMESTAMP(0) NOT NULL,
    `category` ENUM('arrangement', 'reminder', 'task') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserCalendars` ADD CONSTRAINT `UserCalendars_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCalendars` ADD CONSTRAINT `UserCalendars_calendarId_fkey` FOREIGN KEY (`calendarId`) REFERENCES `Calendar`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEvents` ADD CONSTRAINT `UserEvents_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEvents` ADD CONSTRAINT `UserEvents_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_calendarId_fkey` FOREIGN KEY (`calendarId`) REFERENCES `Calendar`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
