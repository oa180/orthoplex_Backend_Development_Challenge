-- AlterTable
ALTER TABLE "User" ADD COLUMN     "changedAt" TIMESTAMP(3),
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;