FROM asia.gcr.io/kjchiu-blog/blog.dotslash.tw-fpm-nginx
COPY config/nginx.default.conf /etc/nginx/conf.d/default.conf
COPY config/nginx.default.conf.ssl /etc/nginx/conf.d/default.conf.ssl
COPY config/php.ini /etc/php7/php.ini
COPY wordpress /mysite
COPY config/prod-wp-config.php /mysite/wp-config.php
COPY config/prod-plugins/jsm-force-ssl /mysite/wp-content/plugins/jsm-force-ssl
RUN  chown -R nginx:nginx /mysite
COPY letsencrypt.sh /letsencrypt.sh
RUN chmod +x /letsencrypt.sh
CMD /usr/sbin/php-fpm7; /usr/sbin/nginx; /letsencrypt.sh; tail -f /var/log/nginx/access.log;