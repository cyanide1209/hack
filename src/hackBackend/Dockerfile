FROM alpine
RUN apk update && \
    apk add --no-cache openrc \
        apache2 \
        apache2-utils \
        php$phpverx-apache2 \
        php-mysqli \
        mysql-client \
        curl
VOLUME ["/etc/mysql", "/var/lib/mysql"]

EXPOSE 80/tcp
EXPOSE 80/udp

ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2
ENV MYSQL_ROOT_PASSWORD password
ENV MYSQL_PWD password

WORKDIR /var/www/localhost/htdocs
RUN rm /var/www/localhost/htdocs/index*
COPY  index.php /var/www/localhost/htdocs 
COPY  login.php /var/www/localhost/htdocs 
COPY nonProfitCollapse.csv /var/www/localhost/htdocs
RUN mkdir /var/www/localhost/htdocs/admin

CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]
