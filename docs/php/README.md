# PHP
```php
# php-fpm.d/www.conf
; The timeout for serving a single request after which the worker process will
; be killed. This option should be used when the 'max_execution_time' ini option
; does not stop script execution for some reason. A value of '0' means 'off'.
; Available units: s(econds)(default), m(inutes), h(ours), or d(ays)
; Default Value: 0
request_terminate_timeout = 60


# php.ini
; Maximum execution time of each script, in seconds
; http://php.net/max-execution-time
; Note: This directive is hardcoded to 0 for the CLI SAPI
max_execution_time = 60
```
## array
### [array_column](https://www.php.net/manual/zh/function.array-column.php)
返回数组中指定的一列
```php
// [
//   { "id": 1, "ip": "127.0.0.1" },
//   { "id": 2, "ip": "192.168.0.1" }
// ]
$list = array(array('id'=>1,'ip'=>'127.0.0.1'),array('id'=>2,'ip'=>'192.168.0.1'));
$ip = array_column($list, 'ip'); // ["127.0.0.1","192.168.0.1"]
```

## str

## ThinkPHP
### cache
```php
$key = 'Test';
$data = 'Hello World';

// 获取
$test = cache($key);
// 存储
cache($key, $data, 300); // 300秒过期
// 清空
cache($key, null)
```
