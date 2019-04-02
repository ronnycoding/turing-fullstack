#!/bin/bash
set -e

source /.env
DIR="/backup"

if [[ -z "$(ls -A $DIR | grep data-dump.sql)" ]]; then
	echo "Error local database not found"
	exit 1
fi

echo "Importing database";
echo "mysql -h $DEPLOY_DB_HOST -P $DEPLOY_DB_PORT -u $DEPLOY_DB_USER -p$DEPLOY_DB_PASSWORD $DEPLOY_DB_DATABASE < $DIR/data-dump.sql"
mysql -h $DEPLOY_DB_HOST -P $DEPLOY_DB_PORT -u $DEPLOY_DB_USER -p$DEPLOY_DB_PASSWORD $DEPLOY_DB_DATABASE < $DIR/data-dump.sql

exec "$@"