library(dplyr)

starwars

starwars %>% filter(skin_color == "light", eye_color == "brown")
