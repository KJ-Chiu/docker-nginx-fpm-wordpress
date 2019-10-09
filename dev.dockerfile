FROM asia.gcr.io/kjchiu-blog/blog.dotslash.tw-fpm-nginx
COPY config/nginx.default.conf /etc/nginx/conf.d/default.conf
COPY config/php.ini /etc/php7/php.ini
COPY wordpress /mysite
RUN  rm /mysite/wp-config.php
RUN  chown -R nginx:nginx /mysite