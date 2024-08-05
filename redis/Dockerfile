# Use the official Redis image from the Docker Hub
FROM redis:4-alpine

# If you want to provide a custom configuration file, you can add it like this:
# COPY redis.conf /usr/local/etc/redis/redis.conf

# Expose Redis port
EXPOSE 6379

# Run Redis server
# CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]
CMD [ "redis-server" , "--port",  "6379" ]