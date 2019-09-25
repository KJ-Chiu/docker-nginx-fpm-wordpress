#!/usr/bin/zsh
source /home/CHIU/.profile
docker build -t asia.gcr.io/kjchiu-blog/blog.dotslash.tw ./
docker push asia.gcr.io/kjchiu-blog/blog.dotslash.tw