#!/usr/bin/env bash

PROJECT=luckyshop
TAR_FILE=${PROJECT}-web.tar.gz
TARGET_FILE=build

REMOTE_USER=wywu
REMOTE_SSH_KEY=~/.ssh/id_rsa
REMOTE_DIR=/www/luckyshop

echo "$1"

if [ "$1" == "production" ];then
    REMOTE_HOST=120.55.89.147
    python lib/upload.py
else
    REMOTE_HOST=121.41.6.238
fi

echo "Start deploy LuckyShop Web Project to ${REMOTE_HOST}...."
tar czf ${TAR_FILE} ${TARGET_FILE}
echo "Start copy tar file to Server: ${REMOTE_HOST}...."
scp -i ${REMOTE_SSH_KEY} ${TAR_FILE} ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}/

ssh -i ${REMOTE_SSH_KEY} ${REMOTE_USER}@${REMOTE_HOST} "cd ${REMOTE_DIR} && tar xzf ${TAR_FILE}"
ssh -i ${REMOTE_SSH_KEY} ${REMOTE_USER}@${REMOTE_HOST} "cd ${REMOTE_DIR} && cp -rf build/* ./"
ssh -i ${REMOTE_SSH_KEY} ${REMOTE_USER}@${REMOTE_HOST} "cd ${REMOTE_DIR} && rm -rf build/ && rm ${TAR_FILE}"
ssh -i ${REMOTE_SSH_KEY} ${REMOTE_USER}@${REMOTE_HOST} "cd ${REMOTE_DIR} && find ./ -type f -mtime +1 -execdir rm -- {} \;"
ssh -i ${REMOTE_SSH_KEY} ${REMOTE_USER}@${REMOTE_HOST} "sudo nginx -s reload"

echo "Finish deploying project...."
