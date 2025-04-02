/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `Dislike` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,userId]` on the table `FavoriteFood` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Dislike_name_userId_key" ON "Dislike"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteFood_name_userId_key" ON "FavoriteFood"("name", "userId");
