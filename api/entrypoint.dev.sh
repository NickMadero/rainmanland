#!/bin/sh

# Start the SSH agent
eval "$(ssh-agent)"

# add EC2 to known_hosts
ssh-keyscan ${EC2_PUBLIC_IP} >> ~/.ssh/known_hosts

# Establish the SSH tunnel
ssh -N -L 127.0.0.1:${SSH_TUNNEL_CLIENT_PORT}:127.0.0.1:${MYSQL_PORT} -p 22 -i /root/.ssh/id_rsa ${SSH_USERNAME}@${EC2_PUBLIC_IP} &

# Store the SSH tunnel process ID
ssh_pid=$!

# Start the API using Node's development server
npm run start & wait

# Terminate the SSH tunnel when the application exits
kill $ssh_pid

