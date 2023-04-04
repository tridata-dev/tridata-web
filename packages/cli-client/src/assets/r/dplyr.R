library(dplyr)

starwars
starwars %>% filter(skin_color == "light", eye_color == "brown")

# install package with
webr::install("ggplot2")
