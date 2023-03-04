CREATE TABLE "loans" (
"loan_id "	INTEGER NOT NULL,
"firstName"	TEXT NOT NULL,
"lastName"	TEXT NOT NULL,
"email"	TEXT NOT NULL UNIQUE,
"purpose"	TEXT NOT NULL,
"status"	TEXT NOT NULL DEFAULT 'PENDING',
PRIMARY KEY("loan_id " AUTOINCREMENT)
);