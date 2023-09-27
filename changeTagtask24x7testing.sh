#! /bin/bash

tag="$1"
sed -i "s/tagVersion/$tag/g" agile-singledb-node-frontend-task24x7testing.yml