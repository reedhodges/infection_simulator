import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
import random

GRID_SIZE = 50
NUM_DOTS = 150
INFECTION_CHANCE = 0.9
RECOVERY_TIME = 30

fig, ax = plt.subplots()

# add some space for the key
ax.set_xlim(0, GRID_SIZE)
ax.set_ylim(-10, GRID_SIZE)

dots = []
positions = []
infected = []
infection_timers = []

for i in range(NUM_DOTS):
    color = 'r' if i == 0 else 'b'
    dot, = ax.plot([], [], 'o', color=color)
    dots.append(dot)
    positions.append([random.randint(0, GRID_SIZE), random.randint(0, GRID_SIZE)])
    infected.append(i == 0)
    infection_timers.append(0 if i == 0 else -1)

healthy_text = ax.text(1, -5, '', fontsize=12)
infected_text = ax.text(15, -5, '', fontsize=12)
recovered_text = ax.text(30, -5, '', fontsize=12)

def init():
    for dot in dots:
        dot.set_data([], [])
    healthy_text.set_text('')
    infected_text.set_text('')
    recovered_text.set_text('')
    return dots + [healthy_text, infected_text, recovered_text]

def update(frame):
    global infected, infection_timers
    new_infections = []

    for i, dot in enumerate(dots):
        direction = random.randint(0, 3)
        if direction == 0:
            positions[i][0] = max(0, positions[i][0] - 1)
        elif direction == 1:
            positions[i][0] = min(GRID_SIZE, positions[i][0] + 1)
        elif direction == 2:
            positions[i][1] = max(0, positions[i][1] - 1)
        elif direction == 3:
            positions[i][1] = min(GRID_SIZE, positions[i][1] + 1)

        dot.set_data(positions[i][0], positions[i][1])

        if infected[i]:
            infection_timers[i] += 1
            if infection_timers[i] >= RECOVERY_TIME:
                infected[i] = False
                dot.set_color('g')

    for i in range(NUM_DOTS):
        if infected[i]:
            for j in range(NUM_DOTS):
                if not infected[j] and np.linalg.norm(np.array(positions[i]) - np.array(positions[j])) <= 2:
                    if random.random() < INFECTION_CHANCE:
                        new_infections.append(j)

    for j in new_infections:
        if not infected[j]:
            infected[j] = True
            dots[j].set_color('r')

    healthy_count = infected.count(False) - infection_timers.count(RECOVERY_TIME)
    infected_count = infected.count(True)
    recovered_count = infection_timers.count(RECOVERY_TIME)
    healthy_text.set_text(f'Healthy: {healthy_count}')
    infected_text.set_text(f'Infected: {infected_count}')
    recovered_text.set_text(f'Recovered: {recovered_count}')

    return dots + [healthy_text, infected_text, recovered_text]

anim = FuncAnimation(fig, update, frames=np.arange(100), init_func=init, blit=True)

plt.show()
