-- CreateIndex
CREATE INDEX "Item_name_userId_idx" ON "Item"("name", "userId");

-- CreateIndex
CREATE INDEX "List_name_userId_idx" ON "List"("name", "userId");

-- CreateIndex
CREATE INDEX "Photo_name_userId_idx" ON "Photo"("name", "userId");
