# worker.py

import time
import logging
from celery import Celery

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

celery = Celery('worker', broker='redis://localhost:6379/0', backend='redis://localhost:6379/1')

@celery.task(name='tasks.add')
def add(a, b):
    logging.info(f"Adding {a} and {b}")
    time.sleep(5)  # 5-second delay
    result = a + b
    logging.info(f"Result: {result}")
    return result

if __name__ == '__main__':
    logging.info("Starting Celery worker")
    celery.start()