#!/bin/sh
apk add netcat-openbsd bc curl wget
apk add libressl
cd /tmp/
curl https://get.acme.sh | sh
if [ -e /etc/nginx/conf.d/default.conf.origin ]
then
    cp /etc/nginx/conf.d/default.conf.origin /etc/nginx/conf.d/default.conf
fi
/root/.acme.sh/acme.sh --issue --nginx -d blog.dotslash.tw
if [ -e /root/.acme.sh/blog.dotslash.tw/blog.dotslash.tw.cer ]
then
    mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.origin
    cp /etc/nginx/conf.d/default.conf.ssl /etc/nginx/conf.d/default.conf
fi
/usr/sbin/nginx -s reload