-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Credentials" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "teacherId" INTEGER,
    "studentId" INTEGER,
    "adminId" INTEGER,
    CONSTRAINT "Credentials_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Credentials_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Credentials_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Credentials" ("adminId", "email", "id", "password", "studentId", "teacherId", "type") SELECT "adminId", "email", "id", "password", "studentId", "teacherId", "type" FROM "Credentials";
DROP TABLE "Credentials";
ALTER TABLE "new_Credentials" RENAME TO "Credentials";
CREATE UNIQUE INDEX "Credentials_email_key" ON "Credentials"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
