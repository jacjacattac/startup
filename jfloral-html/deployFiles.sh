#!/bin/bash
printf "is this freaking working\n"
while getopts k:h: flag
do
    case "${flag}" in
        k) key=${OPTARG};;
        h) hostname=${OPTARG};;
    esac
done

if [[ -z "$key" || -z "$hostname" ]]; then
    printf "\nMissing required parameter.\n"
    printf "  syntax: deployFiles.sh -k <pem key file> -h <hostname>\n\n"
    exit 1
file
printf "\n----> Deploying files to $hostname with $key\n"

# Step 1
printf "\n----> Clear out the previous distribution on the target.\n"
ssh -i "$key" ubuntu@$hostname << ENDSSH
rm -rf services/public
mkdir -p services/public
ENDSSH

# Step 2
printf "\n----> Copy the distribution package to the target.\n"
scp -r -i "$key" * ubuntu@$hostname:services/public