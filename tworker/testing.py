from worker import add
import time

result = add.delay(1, 2)

print(result.status)

time.sleep(5)

print(result.get())