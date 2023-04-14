-- sql engine is using duckdb
-- see https://duckdb.org/docs/data/overview for more info
SELECT *
FROM read_csv_auto("https://raw.githubusercontent.com/tidyverse/nycflights13/main/data-raw/weather.csv")