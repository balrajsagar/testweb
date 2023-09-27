#! /bin/bash

tag="$1"
sed -i "s/tagVersion/$tag/g" agile-singledb-node-frontend-pg-master.yml