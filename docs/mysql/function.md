# 函数

## 信息函数
|名称|描述|
|-|-|
|USER()|当前用户|
|DATABASE()|当前数据库|
|VERSION()|版本信息|
|CONNECTION_ID()|连接ID|
|LAST_INSERT_ID()|最后插入记录的ID号|

## 字符函数
|函数名称|描述|
|-|-|
|CONCAT()|字符串拼接|
|CONCAT_WS()|使用指定的分隔符进行字符连接|
|LOWER()|将字符串中的字符转化为小写|
|UPPER()|将字符串中的字符转化为大写|
|LEFT()|获取左侧字符|
|RIGHT()|获取右侧字符|
|LENGTH()|获取字段长度<br>1个汉字算3个字符，1个数字或字母算1个字符|
|CHAR_LENGTH()|获取字段长度<br>1个汉字、数字、字母都算1个字符|
|LTRIM()|删除前导空格|
|RTRIM()|删除后续空格|
|TRIM()|删除前导和后续空格|
|SUBSTRING(str,pos,len)|字符串截取<br>pos为截取位置，可为负值；<br>len为截取长度|
|REPLACE()|字符串替换|
|[NOT] LIKE()|模式匹配<br>`%` 代表任意个字符<br>`_` 代表任意一个字符|
|FORMAT()|数字格式化|
|STR_TO_DATE()|把字符串转换为日期类型|

```sql
-- 删除前导指定字符
SELECT TRIM(LEADING '?' FROM '??Hello? MySQL???'); -- 'Hello? MySQL???'
-- 删除后续指定字符
SELECT TRIM(TRAILING '?' FROM '??Hello? MySQL???'); --' Hello? MySQL???'
-- 删除前导和后续指定字符
SELECT TRIM(BOTH '?' FROM '??Hello? MySQL???'); -- 'Hello? MySQL'

SELECT SUBSTRING('abc123', 1, 3); -- 'abc'
SELECT SUBSTRING('abc123', -3, 2); -- '12'
SELECT SUBSTRING('abc123', -1, 2); -- '3'
SELECT SUBSTRING('abc123', 0, 3); -- ''

SELECT SUBSTRING('你abc我123他', 1, 0); -- ''
SELECT SUBSTRING('你abc我123他', 1, 1); -- '你'
SELECT SUBSTRING('你abc我123他', 1, 2); -- '你a'
SELECT SUBSTRING('你abc我123他', 1, 3); -- '你ab'

SELECT REPLACE('??Hello? MySQL???','?',''); -- 'Hello MySQL'

SELECT REPLACE('??Hello? MySQL???','??','!'); -- '!Hello? MySQL!?'

# 查找包含 % 的记录（由于 % 表示任意个字符有特殊意义，所以需要结合使用 ESCAPE）
SELECT * FROM tdb_goods WHERE goods_name LIKE '%1%%' ESCAPE '1';

SELECT STR_TO_DATE(NOW(), '%Y-%m-%d %H:%i:%s') AS result; -- 2024-03-31 10:36:08
SELECT STR_TO_DATE('2024-3-31 10:36:8', '%Y-%m-%d %H:%i:%s') AS result; -- 2024-03-31 10:36:08
```

## 数值运算符与函数
|名称|描述|
|-|-|
|ABS()|取绝对值|
|CEIL()|进一取整，又叫向上取整|
|FLOOR()|舍一取整，又叫向下取整|
|ROUND()|四舍五入（两个参数分别为字段名称、小数位数）|
|DIV|整数除法|
|MOD 或者 %|取余数，又叫取模|
|MOD()|取余函数|
|POWER()|幂运算|
|TRUNCATE()|数字截取|

```sql
SELECT ABS(1); -- 1
SELECT ABS(-1.2); -- 1.2
SELECT CEIL(3.1415926); -- 4
SELECT FLOOR(3.1415926); -- 3

SELECT ROUND(3.4); -- 3
SELECT ROUND(3.5); -- 4
SELECT ROUND(3.4,0); -- 3
SELECT ROUND(3.5,0); -- 4
SELECT ROUND(3.5,-1); -- 0

SELECT ROUND(3.1415926,0); -- 3
SELECT ROUND(3.1415926,1); -- 3.1
SELECT ROUND(3.1415926,2); -- 3.14
SELECT ROUND(3.1415926,3); -- 3.142

SELECT 5 / 3; -- 1.6667
SELECT 5 DIV 3; -- 1

SELECT 5 % 3; -- 2
SELECT 5 MOD 3; -- 2
SELECT MOD(5, 3) -- 2
SELECT MOD(5.1, 3) -- 2.1

SELECT POWER(2,10); -- 1024

SELECT TRUNCATE(3333.1415926,3); -- 3333.141
SELECT TRUNCATE(3333.1415926,2); -- 3333.14
SELECT TRUNCATE(3333.1415926,1); -- 3333.1
SELECT TRUNCATE(3333.1415926,0); -- 3333
SELECT TRUNCATE(3333.1415926,-1); -- 3330
SELECT TRUNCATE(3333.1415926,-2); -- 3300
```

## 比较运算符与函数
|名称|描述|
|-|-|
|[NOT] BETWEEN ... AND ...|[不]在范围之内|
|[NOT] IN()|[不]在列出值范围内|
|IS [NOT] NULL|[不]为空|

```sql
SELECT 15 BETWEEN 10 AND 20; -- 1
SELECT 20 BETWEEN 10 AND 20; -- 1
SELECT 25 BETWEEN 10 AND 20; -- 0

SELECT 15 IN(5,10,15,20); -- 1
SELECT 13 IN(5,10,15,20); -- 0

SELECT NULL IS NULL; -- 1
SELECT '' IS NULL; -- 0
SELECT 0 IS NULL; -- 0
```

## 日期时间函数
|名称|描述|
|-|-|
|CURDATE() 或 CURRENT_DATE()|系统当前日期（**年月日**）|
|CURTIME() 或 CURRENT_TIME()|系统当前时间（**时分秒**）|
|NOW() 或 CURRENT_TIMESTAMP()|系统当前时间（**年月日时分秒**）|
|DATE()|返回时间的**年月日**部分|
|TIME()|返回时间的**时分秒**部分|
|YEAR()|返回时间的**年份**部分|
|MONTH()|返回时间的**月份**部分|
|DAY()|返回时间的**天数**部分|
|HOUR()|返回时间的**小时**部分|
|MINUTE()|返回时间的**分钟**部分|
|SECOND()|返回时间的**秒**部分|
|EXTRACT()|抽取具体的年、月、日、时、分、秒|
|DATEDIFF()|日期差值|
|DATE_ADD()|日期变化|
|DATE_FORMAT()|日期格式化|

:::warning
DATE 日期格式必须是 yyyy-mm-dd 的形式。

如果要进行日期比较，就要使用 `DATE()` 函数，不要直接使用日期与字符串进行比较。

因为很多时候无法确认字段的数据类型是字符串还是 datetime 类型，所以使用 `DATE()` 比较日期是更安全的。

SELECT * FROM heros WHERE birthdate>'2016-10-01'; -- 不安全

SELECT * FROM heros WHERE DATE(birthdate)>'2016-10-01'; -- 安全
:::

```sql
SELECT CURDATE(); -- 2020-12-05
SELECT CURRENT_DATE; -- 2020-12-05
SELECT CURRENT_DATE(); -- 2020-12-05

SELECT CURTIME(); -- 17:25:03
SELECT CURRENT_TIME; -- 17:25:03
SELECT CURRENT_TIME(); -- 17:25:03

SELECT NOW(); -- 2020-12-05 17:25:03
SELECT CURRENT_TIMESTAMP; -- 2020-12-05 17:25:03
SELECT CURRENT_TIMESTAMP(); -- 2020-12-05 17:25:03

SELECT DATE(NOW()); -- 2024-03-30
SELECT TIME(NOW()); -- 13:58:02

SELECT DATE('2020-12-05 17:25:03'); -- 2020-12-05
SELECT DATE('2020/12/05 17:25:03'); -- 2020-12-05
SELECT TIME('2020-12-05 17:25:03'); -- 17:25:29
SELECT TIMESTAMP('2020-12-05 17:25:03'); -- 2020-12-05 17:25:03
SELECT TIMESTAMP('2020-12-5'); -- 2020-12-05 00:00:00

SELECT YEAR('2020-12-05'); -- 2020
SELECT YEAR('2020-12-05 17:25:03'); -- 2020
SELECT MONTH('2020-12-05 17:25:03'); -- 12
SELECT DAY('2020-12-05 17:25:03'); -- 5
SELECT HOUR('2020-12-05 17:25:03'); -- 17
SELECT MINUTE('2020-12-05 17:25:03'); -- 25
SELECT SECOND('2020-12-05 17:25:03'); -- 3

SELECT EXTRACT(YEAR FROM '2020-12-05 17:25:03'); -- 2020
SELECT EXTRACT(MONTH FROM '2020-12-05 17:25:03'); -- 12
SELECT EXTRACT(DAY FROM '2020-12-05 17:25:03'); -- 5
SELECT EXTRACT(HOUR FROM '2020-12-05 17:25:03'); -- 17
SELECT EXTRACT(MINUTE FROM '2020-12-05 17:25:03'); -- 25
SELECT EXTRACT(SECOND FROM '2020-12-05 17:25:03'); -- 3

SELECT DATEDIFF('2020-01-23','2020-04-12'); -- -80
SELECT DATEDIFF('2020-10-01','2020-07-05'); -- 88

SELECT DATE_ADD('2020-07-05', interval 1 YEAR); -- 2021-07-05
SELECT DATE_ADD('2020-07-05', interval 12 MONTH); -- 2021-07-05
SELECT DATE_ADD('2020-07-05', interval 365 DAY); -- 2021-07-05
SELECT DATE_ADD('2020-07-05', interval -365 DAY); -- 2019-07-06
SELECT DATE_ADD('2020-07-05', interval 4 WEEK); -- 2020-08-02

SELECT DATE_FORMAT('2020-7-5 23:24:9','%m/%d/%Y %H:%i:%s'); -- 07/05/2020 23:24:09
SELECT DATE_FORMAT(NOW(),'%m/%d/%Y %H:%i:%s'); -- 07/05/2020 23:30:04
```

## 转换函数
转换函数可以转换数据之间的类型
|名称|描述|
|-|-|
|CAST()|数据类型转换，参数是一个表达式，表达式通过 AS 关键词分割了两个参数，分别是原始数据和目标数据类型|
|COALESCE()|返回第一个非空数值|
```sql
SELECT CAST(123.123 AS INT); -- 运行结果会报错
SELECT CAST(123.123 AS DECIMAL(8,2)); -- 123.12
SELECT CAST(123.125 AS DECIMAL(5,2)); -- 123.13
SELECT CAST(123.1 AS DECIMAL(6,3)); -- 123.100

SELECT CAST('123' AS UNSIGNED); -- 123
SELECT CAST('123.123' AS UNSIGNED); -- 123
SELECT CAST('-123' AS SIGNED); -- -123
SELECT CAST('-123.123' AS SIGNED); -- -123

SELECT CAST('123a' AS UNSIGNED); -- 123
SELECT CAST('a123' AS UNSIGNED); -- 0

SELECT COALESCE(NULL,1,2); -- 1
SELECT COALESCE('1',Null,2); -- '1'
SELECT COALESCE(0,'Hello',Null); -- 0
```
`CAST` 函数在转换数据类型的时候，不会四舍五入，如果原数值有小数，那么转换为整数类型的时候就会报错。不过你可以指定转化的小数类型，在 MySQL 和 SQL Server 中，可以用 `DECIMAL(a,b)` 来指定，其中 a 代表整数部分和小数部分加起来最大的位数，b 代表小数位数，比如 `DECIMAL(8,2)` 代表的是精度为 8 位（整数加小数位数最多为 8 位），小数位数为 2 位的数据类型。

## 聚合函数
|名称|描述|
|-|-|
|AVG()|平均值|
|MAX()|最大值|
|MIN()|最小值|
|SUM()|求和|
|COUNT()|总行数|
:::tip
`AVG`、`MAX`、`MIN` 等聚集函数会自动忽略值为 `NULL` 的数据行，`MAX` 和 `MIN` 函数也可以用于字符串类型数据的统计，如果是英文字母，则按照 A—Z 的顺序排列，越往后数值越大。如果是汉字则按照全拼拼音进行排列。
```sql
SELECT MIN(CONVERT(`name` USING gbk)),MAX(CONVERT(`name` USING gbk)) FROM heros;
```

`COUNT(字段名)` 会忽略值为 `NULL` 的数据行，而 `COUNT(*)` 只是统计数据行数，不管某个字段是否为 `NULL`
```sql
-- 查询最大生命值(hp_max)大于 6000，且有次要定位(role_assist)的英雄数量
SELECT COUNT(*) FROM heros WHERE hp_max > 6000 AND role_assist IS NOT NULL;
SELECT COUNT(role_assist) FROM heros WHERE hp_max > 6000;
```
:::
```sql
-- 对数据行中不同的取值进行聚集：先用 DISTINCT 函数取不同的数据，然后再使用聚集函数
-- 查询不同的生命最大值的英雄数量
SELECT COUNT(DISTINCT hp_max) FROM heros;

-- 统计不同生命最大值英雄的平均生命最大值，保留小数点后两位
SELECT ROUND(AVG(DISTINCT hp_max), 2) FROM heros;
```
## 加密函数
|名称|描述|
|-|-|
|MD5()|信息摘要算法|
|PASSWORD()|密码算法|
:::warning
在 mysql 5.7.9 以后移除了 PASSWORD() 函数
:::
```sql
SELECT MD5('root'); -- 63a9f0ea7bb98050796b649e85481845

# 修改 MySQL 客户端用户密码[有版本兼容性问题]
SET PASSWORD=PASSWORD('root');
```

## 自定义函数
用户自定义函数（user-defined function, UDF）是一种对 MySQL 扩展的途径，其用法与内置函数相同。

```sql
# 创建自定义函数
CREATE FUNCTION function_name
RETURNS
{STRING|INTEGER|REAL|DECIMAL}
routine_body

# 删除自定义函数
DROP FUNCTION [IF EXISTS] function_name;
```

:::tip
关于函数体
- 函数体由合法的 SQL 语句构成
- 函数体可以是简单的 SELECT 或 INSERT 语句
- 函数体如果为复合结构则使用 BEGIN...END 语句
- 复合结构可以包含声明，循环，控制结构
:::

## 创建不带参数的自定义函数
```sql
# 设置编码
ALTER DATABASE db_name CHARACTER SET gbk;

CREATE FUNCTION f1()
RETURNS varchar(30)
RETURN DATE_FORMAT(NOW(),'%Y年%m月%d日 %H时:%i分:%s秒');

SELECT f1(); -- 2020年07月06日 23点45分01秒
```

:::tip
`SHOW FUNCTION STATUS LIKE "function_name%";`

查看数据库编码: `show variables like 'char%';`

设置数据库编码: `SET character_set_database=gbk;`
:::

## 创建带参数的自定义函数
```sql
CREATE FUNCTION f2(num1 SMALLINT UNSIGNED, num2 SMALLINT UNSIGNED)
RETURNS FLOAT(10,2) UNSIGNED
RETURN (num1+num2)/2;

SELECT f2(13,14); -- 13.50
```

## 创建具有复合结构函数体的自定义函数
```sql
CREATE TABLE t_user(id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, name varchar(10) NOT NULL);

INSERT INTO t_user(name) VALUES('hello');
INSERT INTO t_user(name) VALUES('world');

# 将分隔符由默认的 ; 修改为 //
DELIMITER //

# 自定义函数：新增用户，并返回插入 id
CREATE FUNCTION f3(username varchar(10))
RETURNS INT UNSIGNED
BEGIN
  INSERT INTO t_user(name) VALUES(username);
  RETURN LAST_INSERT_ID();
END;

# 将分隔符修改为默认的 ;
DELIMITER ;

SELECT f3('mysql'); # 3

SELECT * FROM t_user;
+----+-------+
| id | name  |
+----+-------+
|  1 | hello |
|  2 | world |
|  3 | mysql |
+----+-------+
```