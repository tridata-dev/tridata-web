PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "penguins"(
"species" TEXT, "island" TEXT, "bill_length_mm" TEXT, "bill_depth_mm" TEXT,
 "flipper_length_mm" TEXT, "body_mass_g" TEXT, "sex" TEXT, "year" TEXT);
INSERT INTO penguins VALUES('Adelie','Torgersen','39.1','18.7','181','3750','male','2007');
INSERT INTO penguins VALUES('Adelie','Torgersen','39.5','17.4','186','3800','female','2007');
INSERT INTO penguins VALUES('Adelie','Torgersen','40.3','18','195','3250','female','2007');
INSERT INTO penguins VALUES('Adelie','Torgersen','NA','NA','NA','NA','NA','2007');
INSERT INTO penguins VALUES('Adelie','Torgersen','36.7','19.3','193','3450','female','2007');
INSERT INTO penguins VALUES('Adelie','Torgersen','39.3','20.6','190','3650','male','2007');
INSERT INTO penguins VALUES('Adelie','Torgersen','38.9','17.8','181','3625','female','2007');
COMMIT;
