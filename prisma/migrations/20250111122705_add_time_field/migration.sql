-- CreateEnum
CREATE TYPE "Period" AS ENUM ('MORNING', 'AFTERNOON', 'NIGHT');

-- AlterTable
ALTER TABLE "Tasks" ADD COLUMN     "period" "Period" NOT NULL DEFAULT 'MORNING';
