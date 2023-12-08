# shift + enter run the current line
mtcars |> head()

# install package with
suppressMessages(webr::install("ggplot2"))

suppressMessages(library(dplyr))
library(ggplot2)

diamonds |>
    slice_sample(n = 500) |>
    ggplot() +
    geom_point(aes(x = carat, y = price, color = cut))
