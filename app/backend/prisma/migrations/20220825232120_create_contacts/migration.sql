-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL,
    "phone" TEXT,
    "whatsapp" BOOLEAN DEFAULT false,
    "email" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
