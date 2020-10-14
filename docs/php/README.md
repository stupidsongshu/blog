# PHP

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
