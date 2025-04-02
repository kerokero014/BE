/*
  Warnings:

  - Made the column `nutritionalValue` on table `Ingredient` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quantity` on table `Ingredient` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Ingredient" ALTER COLUMN "nutritionalValue" SET NOT NULL,
ALTER COLUMN "quantity" SET NOT NULL;
