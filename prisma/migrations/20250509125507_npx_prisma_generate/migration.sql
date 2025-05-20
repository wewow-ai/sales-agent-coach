-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);
