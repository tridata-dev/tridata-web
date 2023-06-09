# install package with
# import micropip; micropip.install("library")
import numpy as np
import matplotlib.pyplot as plt

dt = 0.01
t = np.arange(0, 30, dt)
nse1 = np.random.randn(len(t))  # white noise 1
nse2 = np.random.randn(len(t))  # white noise 2

# Two signals with a coherent part at 10 Hz and a random part
s1 = np.sin(2 * np.pi * 10 * t) + nse1
s2 = np.sin(2 * np.pi * 10 * t) + nse2

fig, axs = plt.subplots(2, 1)
axs[0].plot(t, s1, t, s2)
axs[0].grid(True)

cxy, f = axs[1].cohere(s1, s2, 256, 1.0 / dt)
axs[1].set_ylabel("Coherence")

fig.tight_layout()
plt.show()
# a builtin helper to show matplotlib plots
show_matplotlib(plt)
