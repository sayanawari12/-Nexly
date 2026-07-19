/*
  Warnings:

  - Added the required column `familyId` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RefreshToken" ADD COLUMN     "familyId" UUID NOT NULL,
ADD COLUMN     "ipAddress" VARCHAR(45),
ADD COLUMN     "parentToken" VARCHAR(255),
ADD COLUMN     "userAgent" TEXT;

-- CreateIndex
CREATE INDEX "RefreshToken_familyId_idx" ON "RefreshToken"("familyId");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_idx" ON "RefreshToken"("userId");
