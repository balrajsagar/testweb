#! /bin/bash

tag="$1"
sed -i "s/tagVersion/$tag/g" task24x7-node-front-prod.yml
