-- CreateEnum
CREATE TYPE "ProblemStatus" AS ENUM ('DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ProblemVisibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "authorId" UUID,
ADD COLUMN     "examples" JSONB,
ADD COLUMN     "explanation" TEXT,
ADD COLUMN     "hints" JSONB,
ADD COLUMN     "inputFormat" TEXT,
ADD COLUMN     "lastEditorId" UUID,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "outputFormat" TEXT,
ADD COLUMN     "status" "ProblemStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "visibility" "ProblemVisibility" NOT NULL DEFAULT 'PUBLIC';

-- AlterTable
ALTER TABLE "TestCase" ADD COLUMN     "orderIndex" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Problem_status_idx" ON "Problem"("status");

-- CreateIndex
CREATE INDEX "Problem_visibility_idx" ON "Problem"("visibility");

-- CreateIndex
CREATE INDEX "Problem_difficulty_idx" ON "Problem"("difficulty");

-- CreateIndex
CREATE INDEX "TestCase_problemId_idx" ON "TestCase"("problemId");

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_lastEditorId_fkey" FOREIGN KEY ("lastEditorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
