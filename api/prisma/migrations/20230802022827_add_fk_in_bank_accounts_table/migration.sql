-- AddForeignKey
ALTER TABLE "bank_acounts" ADD CONSTRAINT "bank_acounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
