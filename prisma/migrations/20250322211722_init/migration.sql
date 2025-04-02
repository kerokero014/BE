/*
  Warnings:

  - You are about to drop the column `name` on the `RecipeIngredient` table. All the data in the column will be lost.
  - Added the required column `ingredientId` to the `RecipeIngredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `RecipeIngredient` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `quantity` on the `RecipeIngredient` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Ingredient" ALTER COLUMN "mealId" DROP NOT NULL,
ALTER COLUMN "nutritionalValue" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RecipeIngredient" DROP COLUMN "name",
ADD COLUMN     "ingredientId" INTEGER NOT NULL,
ADD COLUMN     "unit" TEXT NOT NULL,
DROP COLUMN "quantity",
ADD COLUMN     "quantity" DECIMAL(65,30) NOT NULL;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
