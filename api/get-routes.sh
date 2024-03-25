#!/bin/sh

grep -E "^app\.(get|put|post|delete)" main.js | sort | sed "s/.*'\(.*\)'.*/\1/"
