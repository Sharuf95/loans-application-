CREATE TABLE "loans" (
        "loan_id"       INTEGER NOT NULL,
        "firstName"     TEXT NOT NULL,
        "lastName"      TEXT NOT NULL,
        "email" TEXT NOT NULL UNIQUE,
        "loan_amount"   INTEGER NOT NULL,
        "purpose"       TEXT,
        "status"        TEXT DEFAULT 'PENDING',
        PRIMARY KEY("loan_id" AUTOINCREMENT)
);