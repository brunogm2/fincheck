-- DropForeignKey
ALTER TABLE "bank_acounts" DROP CONSTRAINT "bank_acounts_user_id_fkey";

-- AddForeignKey
ALTER TABLE "bank_acounts" ADD CONSTRAINT "bank_acounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
