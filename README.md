# zce.me

> zce.me site

```shell
$ sudo git clone https://github.com/zce/zce.github.io.git -b home --depth 1 --single-branch /var/www/zce.me
$ sudo ln -s /var/www/zce.me/zce.me.conf /etc/nginx/sites-available/zce.me.conf
$ sudo ln -s /etc/nginx/sites-available/zce.me.conf /etc/nginx/sites-enabled/zce.me.conf
$ sudo rm -rf /etc/nginx/sites-enabled/default
$ sudo rm -rf /etc/nginx/sites-available/default
$ sudo systemctl reload nginx
# letsencrypt renew
$ sudo /etc/letsencrypt/acme.sh --issue --home /etc/letsencrypt --domain blog.zce.me --webroot /var/www/blog.zce.me/system/nginx-root --reloadcmd "nginx -s reload" --accountemail w@zce.me
```
