FROM asia.gcr.io/kjchiu-blog/blog.dotslash.tw-fpm-nginx
COPY config/nginx.default.conf /etc/nginx/conf.d/default.conf
COPY config/php.ini /etc/php7/php.ini
COPY wordpress /mysite
COPY config/prod-wp-config.php /mysite/wp-config.php
COPY config/prod-plugins/jsm-force-ssl /mysite/wp-content/plugins/jsm-force-ssl
RUN  chown -R nginx:nginx /mysite