/*
  Warnings:

  - The `quantity` column on the `Ingredient` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `unit` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "unit" TEXT NOT NULL,
DROP COLUMN "quantity",
ADD COLUMN     "quantity" DECIMAL(65,30);
