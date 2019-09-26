FROM asia.gcr.io/kjchiu-blog/blog.dotslash.tw-fpm-nginx
COPY config/nginx.default.conf /etc/nginx/conf.d/default.conf
COPY wordpress /mysite
COPY config/prod-wp-config.php /mysite/wp-config.php