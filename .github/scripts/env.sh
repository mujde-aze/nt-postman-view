#!/bin/bash

set -e

{
echo REACT_APP_API_KEY="${{ secrets.REACT_APP_API_KEY }}"
echo REACT_APP_AUTH_DOMAIN="${{ secrets.REACT_APP_AUTH_DOMAIN }}"
echo REACT_APP_PROJECT_ID="${{ secrets.REACT_APP_PROJECT_ID }}"
echo REACT_APP_STORAGE_BUCKET="${{ secrets.REACT_APP_STORAGE_BUCKET }}"
echo REACT_APP_MESSAGING_SENDER_ID="${{ secrets.REACT_APP_MESSAGING_SENDER_ID }}"
echo REACT_APP_APP_ID="${{ secrets.REACT_APP_APP_ID }}"
echo REACT_APP_MEASUREMENT_ID="${{ secrets.REACT_APP_MEASUREMENT_ID }}"
} >> .env
