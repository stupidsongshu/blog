> [练习数据](./mysql-practice-data.md)

## MySQL 目录结构
- bin: 可执行文件
- data: 数据文件
- docs: 文档
- include: 包含的头文件
- lib: 存储库文件
- share: 错误消息和字符集文件

## 语句规范
- 关键字与函数名称全部大写
- 数据库名称、表名称、字段名称全部小写
- SQL 语句必须以分号结尾

## 配置文件
配置文件修改后需要重启服务才会生效
- 默认存储引擎：default-storage-engine=INNODB

## 登录
`mysql -uroot -p -P3306 -h127.0.0.1`

端口号默认为3306，端口号没改时 `-P` 可不写；host 默认为本地 127.0.0.1，连接本地数据库时 `-h` 可不写

## 退出
- `mysql> exit;`
- `mysql> quit;`
- `mysql> \q;`

## 提示符
| 参数 | 描述 |
| --- | ---- |
| \D  | 完整日期 |
| \d  | 当前数据库 |
| \h  | 服务器名称 |
| \u  | 当前用户 |

- 登录时修改：
`mysql -uroot -p --prompt "\u@\h \d>"`
- 登录后修改：`prompt \u@\h \d>`

## 数据类型
### 字符型
| 数据类型     | 存储需求 |
| ----------- | ------ |
| CHAR(M)     | M 个字节，0 <= M >= 255 |
| VARCHAR(M)  | L+1 个字节，其中 L <= M 且 0 <= M >= 65535 |
| TINYTEXT    | L+1 个字节，其中 L < $2^8$ |
| TEXT        | L+2 个字节，其中 L < $2^{16}$ |
| MEDIUMTEXT  | L+3 个字节，其中 L < $2^{24}$ |
| LONGTEXT    | L+4 个字节，其中 L < $2^{32}$ |
| ENUM('value1','value2',...) | 1或2个字节，取决于枚举值的个数（最多65535个值） |
| SET('value1','value2',...) | 1、2、3、4或8个字节，取决于set成员的数目（最多64个成员） |

### 整型
| 数据类型 | 存储范围 | 字节 |
| ------- | ------ | ---- |
| TINYINT | 有符号值：-128 ~ 127 ($-2^{7}$ ~ $2^{7} - 1$)<br>无符号值：0 ~ 255 (0 ~ $2^{8} - 1$) | 1 |
| SMALLINT | 有符号值：-32768 ~ 32767 ($-2^{15}$ ~ $2^{15} - 1$)<br>无符号值：0 ~ 65535 (0 ~ $2^{16} - 1$) | 2 |
| MEDIUMINT | 有符号值：-8388608 ~ 8388607 ($-2^{23}$ ~ $2^{23} - 1$)<br>无符号值：0 ~ 65535 (0 ~ $2^{24} - 1$) | 3 |
| INT | 有符号值：-2147483648 ~ 2147483647 ($-2^{31}$ ~ $2^{31} - 1$)<br>无符号值：0 ~ 4294967295 (0 ~ $2^{32} - 1$) | 4 |
| BIGINT | 有符号值：-9223372036854775808 ~ 9223372036854775807 ($-2^{63}$ ~ $2^{63} - 1$)<br>无符号值：0 ~ 18446744073709551615 (0 ~ $2^{64} - 1$) | 8 |

### 浮点型
| 数据类型 | 存储范围 |
| ------- | ------ |
| FLOAT[(M,D)] | -3.402823466E+38 ~ -1.175494351E-38、0 和 1.175494351E-38 ~ 3.402823466E+38 <br> M 是数字总位数，D 是小数点后面的位数。如果 M 和 D 被省略，根据硬件允许的限制来保存值。单精度浮点数精确到大约7位小数位。 |
| DOUBLE[(M,D)] | -1.7976931348623157E+308 ~ -2.2250738585072014-308、0 和 2.2250738585072014-308 ~ 1.7976931348623157E+308 |

### 日期时间型
| 数据类型   | 字节 | 日期格式             | 最小值 | 最大值 |
| --------- | --- | ------------------- | ----- | ----- |
| YEAR      | 1   | YYYY                | 1901  | 2155  |
| TIME      | 3   | HH:MM:SS            | -838:59:59 | 838:59:59 |
| DATE      | 4   | YYYY-MM-DD          | 1000-01-01 | 9999-12-31 |
| TIMESTAMP | 4   | YYYY-MM-DD HH:MM:SS | 19700101080001 | 2037 年 |
| DATETIME  | 8   | YYYY-MM-DD HH:MM:SS | 1000-01-01 00:00:00 | 9999-12-31 23:59:59 |

## 数据库
- 显示当前版本：`SELECT VERSION();` （或 `mysql -V` 或 `mysql --version`）
- 显示当前日期时间：`SELECT NOW();`
- 显示当前用户：`SELECT USER();`
- 查看当前打开的数据库：`SELECT DATABASE();`
- 查看数据库：`SHOW DATABASES;`
- 打开数据库：`USE db_name;`
- 查看数据库创建信息：`SHOW CREATE DATABASE db_name;`
- 创建数据库：`CREATE {DATABASE | SCHEMA} [IF NOT EXISTS] db_name [DEFAULT] CHARACTER SET [=] charset_name;`
- 修改数据库：`ALTER {DATABASE | SCHEMA} [db_name] [DEFAULT] character set [=] charset_name;`
- 删除数据库：`DROP {DATABASE | SCHEMA} [IF EXISTS] db_name;`
:::tip
说明：参数中 **{} 为必填项，[] 为可选项**
:::

## 数据表
数据表是二维表格，**行**也称**记录**，**列**也称**字段**。

### 查看数据表
`SHOW TABLES [FROM db_name] [LIKE 'pattern' | WHERE expr];`
### 查看数据表创建信息
`SHOW CREATE TABLE table_name;`
### 创建数据表
```sql
CREATE TABLE [IF NOT EXISTS] table_name (
  column_name data_type,
  ...
);
```
### 查看数据表结构
- `SHOW COLUMNS FROM table_name;`
- `SHOW FULL COLUMNS FROM table_name;`
- `desc table_name;`
- `describe table_name;`

### 查看数据表索引
- `SHOW INDEXES FROM table_name;`
- 网格形式：`SHOW INDEXES FROM table_name\G;`

### 修改数据表表名
- `ALTER TABLE table_name RENAME [TO | AS] new_table_name;`
- `RENAME table table_name TO new_table_name[,table_name2 TO new_table_name2,...];`

## 数据表列（字段）
### 修改数据表
#### 添加列
- 添加单列：
  - `ALTER TABLE table_name ADD [COLUMN] col_name col_definition [FIRST | AFTER col_name];`
- 添加多列：
  - ```sql
    ALTER TABLE table_name 
    ADD [COLUMN] col_name col_definition [FIRST | AFTER col_name],
    ADD [COLUMN] col_name col_definition [FIRST | AFTER col_name],
    ...
    ```
  - `ALTER TABLE table_name ADD [COLUMN] (col_name col_definition,...);` 这种添加多列时，列需要加括号，不能指定位置，都会被添加到最后。
#### 删除列
- 删除单列：
  - `ALTER TABLE table_name DROP [COLUMN] col_name;`
- 删除多列：
  - ```sql
    ALTER TABLE table_name
    DROP [COLUMN] col_name,
    DROP [COLUMN] col_name,
    ...
    ```

#### 修改列
CHANGE 比 MODIFY 更强大，除了可以改列定义，还能修改列名称。
- MODIFY: `ALTER TABLE table_name MODIFY [COLIMN] col_name col_definition [FIRST | AFTER col_name];`
- CHANGE: `ALTER TABLE table_name CHANGE [COLUMN] col_name new_col_name col_definition [FIRST | AFTER col_name];`
:::warning
⚠️注意：高精度更新为低精度（如 INT 改为 TINYINT）时可能造成数据丢失
:::

#### 修改约束
主键约束
- 添加：`ALTER TABLE table_name ADD [CONSTRAINT [symbol]] PRIMARY KEY [INDEX TYPE] (index_col_name);`
- 删除：`ALTER TABLE table_name DROP PRIMARY KEY;`

唯一约束
- 添加：`ALTER TABLE table_name ADD [CONSTRAINT [symbol]] UNIQUE [INDEX | KEY] [index_name] [index_type] (index_col_name,...);`
- 删除：`ALTER TABLE table_name DROP {INDEX | KEY} index_name;`
  :::tip
  index_name: 索引名称，可以通过 `SHOW INDEXES FROM table_name;\G` 进行查看
  :::

外键约束
- 添加：`ALTER TABLE table_name ADD [CONSTRAINT [symbol]] FOREIGN KEY [index_name] (index_col_name,...) reference_definition;`
- 删除：`ALTER TABLE table_name DROP FOREIGN KEY fk_symbol;`
  :::tip
  fk_symbol: 外键约束名称，可以通过 `SHOW CREATE TABLE table_name;` 进行查看
  :::

默认约束
- 添加：`ALTER TABLE table_name ALTER [COLUMN] col_name SET DEFAULT literal;`
- 删除：`ALTER TABLE table_name ALTER [COLUMN] col_name DROP DEFAULT;`

### 约束
- 约束保证数据的完整性和一致性
- 约束类型按功能分为：
  - NOT NULL 非空约束
  - DEFAULT 默认约束
  - PRIMARY KEY 主键约束
  - UNIQUE KEY 唯一约束
  - FOREIGN KEY 外键约束
- 按约束个数分为：
  - 列级约束：约束一个数据列（字段）
  - 表级约束：约束多个数据列（字段）
  :::warning
  列级约束既可以在列定义时声明，也可以在列定义后声明；

  表级约束只能在列定义后声明。

  NOT NULL、DEFAULT 这两种约束只有列级约束，不存在表级约束；

  PRIMARY KEY、UNIQUE KEY、FOREIGN KEY 可以存在列级约束或表级约束。
  :::

#### UNSIGNED
无符号
- 只能针对数值型字段，包括整型和浮点型

#### AUTO_INCREMENT
自动编号
- 必须与主键组合使用
- 默认情况下，起始值为1，每次的增量为1
- 只能针对数值型字段，包括整型和浮点型
:::warning
- AUTO_INCREMENT 字段必须也是 PRIMARY KEY；但 PRIMARY KEY 字段不一定必须是 AUTO_INCREMENT
- AUTO_INCREMENT 字段类型必须是数值类型（整型、浮点型），如果是浮点型，那么小数位位数必须是零
:::

#### NOT NULL
非空约束

#### DEFAULT
默认约束
- 当插入记录时，如果没有明确为字段赋值，则自动赋予默认值

#### PRIMARY KEY
主键约束
- 主键保证记录的唯一性
- 主键自动为 `NOT NULL`
- 每张数据表只能存在一个主键

#### UNIQUE KEY
唯一约束
- 唯一约束可以保证记录的唯一性
- 唯一约束的字段可以为空值 `NULL`
- 每张数据表可以存在多个唯一约束
:::tip
唯一约束的字段可以为空值 `NULL`，表明多个字段都可以是空值，但实际存储时只有一个为空
:::

#### FOREIGN KEY
外键约束，保持数据一致性、完整性，实现一对一、一对多关系。

:::tip
子表：具有外键列的表

父表：子表的参照表
:::

外键约束的要求：
- 父表和子表必须使用相同的存储引擎且只能为 InnoDB，而且禁止使用临时表
- 外键列和参照列必须具有相似的数据类型
  - 数字的长度且符号位必须相同
  - 字符的长度可以不同
- 外键列和参照列必须创建索引
  - 如果外键列（子表）不存在索引的话，MySQL将自动创建索引
  - 如果参照列（父表）不存在索引的话，MySQL将不会自动创建索引
```sql
CREATE TABLE t_province(
  id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20) NOT NULL
);
```
```sql
CREATE TABLE t_user(
  id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  pid SMALLINT UNSIGNED,
  FOREIGN KEY (pid) REFERENCES t_province (id)
);
```

外键约束的参照操作：
- CASCADE: 从父表删除（`ON DELETE`）或更新（`ON UPDATE`）行时，自动删除或更新子表中匹配的行
- SET NULL: 从父表删除或更新行时，设置子表中的外键列为 NULL。如果使用该选项，必须保证子表列没有指定 NOT NULL
- RESTRICT: 拒绝对父表的删除或更新操作
- NO ACTION: 标准 SQL 的关键字，在 MySQL 中与 RESTRICT 相同
```sql
CREATE TABLE t_user1(
  id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  pid SMALLINT UNSIGNED,
  FOREIGN KEY (pid) REFERENCES t_province (id) ON DELETE CASCADE
);
```


## 数据表行（记录）
### 插入记录-标准方式
`INSERT [INTO] table_name [(col_name,...)] {VALUES | VALUE} (expr | DEFAULT,...)[,(expr | DEFAULT,...),...];`

- 为所有字段赋值时，其中 AUTO_INCREMENT 字段可以赋值为 NULL 或 DEFAULT，这样可以保证其原来的自增特性
- 当字段定义时有默认约束，赋值时写为 DEFAULT 可以为其赋为默认值

```sql
# SHOW CREATE TABLE t_users;
| t_users | CREATE TABLE `t_users` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `password` varchar(32) NOT NULL,
  `age` tinyint(3) unsigned DEFAULT '18',
  `sex` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci |

# 例如，一次插入多条记录：
INSERT INTO t_users VALUES
(NULL,'Tom','123456',28,0),
(DEFAULT,'Bob',md5('123456'),DEFAULT,1);
```

### 插入记录-INSERT SET
这种方式一次只能插入一条记录，但可以使用子查询（SubQuery）

`INSERT [INTO] table_name SET col_name={expr | DEFAULT},...`

### 插入记录-INSERT SELECT
将查询结果插入到指定数据表

`INSERT [INTO] table_name [(col_name,...)] SELECT ...`

### 更新记录-单表更新
`UPDATE [LOW_PRIORITY] [IGNORE] table_reference SET col_name1={expr1 | DEFAULT}[,col_name2={expr2 | DEFAULT},...] [WHERE where_condition]`
:::warning
如果没有 WHERE 条件，所有记录的都将被更新
:::

### 更新记录-多表更新
`UPDATE table_references SET col_name1={expr1 | DEFAULT}[,col_name2={expr2 | DEFAULT},...] [WHERE where_condition]`

:::tip
table_references 语法结构：
```sql
table_reference
{[INNER | CROSS] JOIN | {LEFT | RIGHT} [OUTER] JOIN}
table_reference
ON condition_expr
```

###  数据表参照
table_reference

`table_name [[AS] alias] | table_subquery [AS] alias`

数据表可以使用 `table_name AS alias_name` 或 `tabel_name alias_name` 赋予别名；table_subquery 可以作为子查询使用在 FROM 子句中，这样的子查询必须为其赋予别名。

### 连接类型
- 使用关键字 `ON` 来设定连接条件，也可以使用 `WHERE` 来代替。
- 通常使用关键字 `ON` 来设定连接条件，使用关键字 `WHERE` 进行结果集记录的过滤。
#### INNER JOIN
内连接：显示左表及右表符合连接条件的记录（左表和右表的交集）

在 MySQL 中，`INNER JOIN`、`CROSS JOIN`、 `JOIN` 是等价的
#### LEFT [OUTER] JOIN
左外连接：显示左表的全部记录及右表符合连接条件的记录
#### RIGHT [OUTER] JOIN
右外连接：显示右表的全部记录及左表符合连接条件的记录

### 外连接
以左外连接为例：A LEFT JOIN B join_condition

数据表 B 的结果集依赖数据表 A

数据表 A 的结果集根据左连接条件依赖所有数据表（B 表除外）

左外链接条件决定如何检索数据表 B（在没有指定 WHERE 条件的情况下）

如果数据表 A 的某条记录符合 WHERE 条件，但是在数据表 B 不存在符合连接条件的记录，将生成一个所有列为空的额外的 B 行

如果使用内连接查找的记录在连接数据表中不存在，并且在 `WHERE` 子句中尝试以下操作：`col_name IS NULL`，如果 col_name 被定义为 `NOT NULL`，MySQL 将在找到符合连接条件的记录后停止搜索更多的行。

### 自身连接
同一个数据表对其自身进行连接，自身连接时必须给表起别名

```sql
# 多表连接
SELECT goods_id,goods_name,goods_price,cate_name,brand_name
FROM tdb_goods AS g
INNER JOIN tdb_goods_cates AS c ON g.cate_id=c.cate_id
INNER JOIN tdb_goods_brands AS b ON g.brand_id=b.brand_id;
```

:::

```sql
# 例如
CREATE TABLE tdb_goods_cates(
  cate_id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  cate_name VARCHAR(40) NOT NULL
);

# 写入结果
INSERT tdb_goods_cates (cate_name)
SELECT goods_cate FROM tdb_goods GROUP BY goods_cate;

# 多表更新
UPDATE tdb_goods
INNER JOIN tdb_goods_cates
ON goods_cate=cate_name
SET goods_cate=cate_id;
```

### 更新记录-多表更新之一步到位
创建数据表的同时将查询结果写入到数据表
```sql
CREATE TABLE [IF NOT EXISTS] table_name
[(create_definition,...)]
select_statement
```
```sql
# 创建表并写入结果
CREATE TABLE tdb_goods_brands(
  brand_id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  brand_name VARCHAR(40) NOT NULL
)
SELECT brand_name FROM tdb_goods GROUP BY brand_name;

# 多表更新
UPDATE tdb_goods AS g INNER JOIN tdb_goods_brands AS b
ON g.brand_name=b.brand_name
SET g.brand_name=b.brand_id;
```

### 删除记录-单表删除
`DELETE FROM table_name [WHERE where_condition];`
:::warning
如果没有 WHERE 条件，所有记录的都将被删除
:::

### 删除记录-多表删除
语法：
```sql
DELETE table_name[.*] [, table_name[.*], ...]
FROM table_references
[WHERE where_condition]
```
例如，删除表 tdb_goods 中相同名称重复的商品记录，保留 id 较小的记录：
```sql
DELETE t1
FROM tdb_goods AS t1
LEFT JOIN
(SELECT goods_id,goods_name FROM tdb_goods GROUP BY goods_name HAVING count(goods_name)>=2) AS t2
ON t1.goods_name = t2.goods_name
WHERE t1.goods_id > t2.goods_id;
```

### 查找记录
```sql
SELECT select_expr[,select_expr,...]
[
  FROM table_references
  [WHERE where_condition]
  [GROUP BY {col_name | position} [ASC | DESC],...]
  [HAVING where_condition]
  [ORDER BY {col_name | expr | position} [ASC | DESC],...]
  [LIMIT {[offset,] row_count | row_count OFFSET offset}]
]
```
select_expr 为查询表达式

默认为 ASC 升序排序

#### 查询表达式-select_expr
- 每一个表达式表示想要的一列，必须有至少一个
- 多个列之间以英文逗号分隔
- 星号 * 表示所有列，table_name.* 可以表示命名表的所有列
- 查询表达式可以使用 `col_name [AS] alias_name` 为其赋予别名，别名可用于 `GROUP BY`, `ORDER BY`, `HAVING` 子句

:::warning
col_name [AS] alias_name 中的 AS 可以省略，但在起别名时建议不要省略
:::

#### 条件表达式-WHERE
对记录进行过滤
- 如果没有指定 WHERE 子句，将操作所有记录
- 在 WHERE 表达式中可以使用 MySQL 支持的函数或运算符

#### 查询结果分组
`[GROUP BY {col_name | position} [ASC | DESC],...]`

#### 分组条件
`[HAVING where_condition]`

#### 对查询结果进行排序
`[ORDER BY {col_name | expr | position} [ASC | DESC],...]`

#### 限制查询结果返回的数量
`[LIMIT {[offset,] row_count | row_count OFFSET offset}]`


## 子查询
子查询(SubQuery)是指出现在其他 SQL 语句内的 SELECT 子句。
```sql
SELECT * FROM t1 WHERE col1=(SELECT col2 FROM t2);

# 其中，SELECT * FROM t1 称为 Outer Query/Outer Statement
# SELECT col2 FROM t2 称为 SubQuery
```

- 子查询指嵌套在查询内部，且必须始终出现在圆括号内
- 子查询可以包含多个关键字或条件，如 DISTINCT、GROUP BY、ORDER BY、LIMIT、函数等
- 子查询的外层查询可以是：SELECT, INSERT, UPDATE, SET, DO
- 子查询可以返回标量、一行、一列、子查询
### 使用比较运算符的子查询
比较运算符：`=`、`>`、`>=`、`<`、`<=`、`!=`、`<>`、`<=>`

语法结构：operand comparison_operator [ANY | SOME | ALL] (subquery)

用 `ANY`, `SOME`, `ALL` 修饰（`ANY` 与 `SOME` 相同）

![子查询](/mysql-subquery-any-some-all.jpg)
### 使用 IN 或 NOT IN 的子查询
语法结构：operand comparison_operator [[NOT] IN] (subquery)

`=ANY` 或 `=SOME` 与 `IN` 等效；

`!=ALL` 或 `<>ALL` 与 `NOT IN` 等效

### 使用 EXISTS 或 NOT EXISTS 的子查询
如果子查询返回任何行，EXISTS 将返回 TRUE，否则返回 FALSE


## 字符函数
|函数名称|描述|
|-|-|
|CONCAT()|字符串拼接|
|CONCAT_WS()|使用指定的分隔符进行字符连接|
|LOWER()|转换称小写字符|
|UPPER()|转换称大写字符|
|LEFT()|获取左侧字符|
|RIGHT()|获取右侧字符|
|LENGTH()|获取字段长度，1个汉字算3个字符，1个数字或字母算1个字符|
|CHAR_LENGTH()|获取字段长度，1个汉字、数字、字母都算1个字符|
|LTRIM()|删除前导空格|
|RTRIM()|删除后续空格|
|TRIM()|删除前导和后续空格|
|SUBSTRING(str,pos,len)|字符串截取<br>pos为截取位置，可为负值；<br>len为截取长度，不能为负值|
|REPLACE()|字符串替换|
|[NOT] LIKE()|模式匹配<br>`%` 代表任意个字符<br>`_` 代表任意一个字符|
|FORMAT()|数字格式化|

```sql
# 删除前导指定字符
SELECT TRIM(LEADING '?' FROM '??Hello? MySQL???');
Hello? MySQL???

# 删除后续指定字符
SELECT TRIM(TRAILING '?' FROM '??Hello? MySQL???');
Hello? MySQL???

# 删除前导和后续指定字符
SELECT TRIM(BOTH '?' FROM '??Hello? MySQL???');
Hello? MySQL

SELECT REPLACE('??Hello? MySQL???','?','');
Hello MySQL

SELECT REPLACE('??Hello? MySQL???','??','!');
!Hello? MySQL!?

# 查找包含 % 的记录（由于 % 表示任意个字符有特殊意义，所以需要结合使用 ESCAPE）
SELECT * FROM tdb_goods WHERE goods_name LIKE '%1%%' ESCAPE '1';
```

## 数值运算符与函数
|名称|描述|
|-|-|
|ABS()|取绝对值|
|CEIL()|进一取整，又叫向上取整|
|FLOOR()|舍一取整，又叫向下取整|
|ROUND()|四舍五入|
|DIV|整数除法|
|MOD 或者 %|取余数，又叫取模|
|MOD()|取余函数|
|POWER()|幂运算|
|TRUNCATE()|数字截取|

```sql
SELECT ABS(-1); // 1
SELECT CEIL(3.1415926); // 4
SELECT FLOOR(3.1415926); // 3
SELECT ROUND(3.1415926); // 3
SELECT ROUND(3.1415926,0); // 3
SELECT ROUND(3.1415926,1); // 3.1
SELECT ROUND(3.1415926,2); // 3.14
SELECT ROUND(3.1415926,3); // 3.142
SELECT ROUND(3.1415926,-1); // 0

SELECT 5 / 3; // 1/6667
SELECT 5 DIV 3; // 1

SELECT 5 % 3; // 2
SELECT 5 MOD 3; // 2

SELECT POWER(2,10); // 1024

SELECT TRUNCATE(3333.1415926,3); // 3333.141
SELECT TRUNCATE(3333.1415926,2); // 3333.14
SELECT TRUNCATE(3333.1415926,1); // 3333.1
SELECT TRUNCATE(3333.1415926,0); // 3333
SELECT TRUNCATE(3333.1415926,-1); // 3330
SELECT TRUNCATE(3333.1415926,-2); // 3300
```

## 比较运算符与函数
|名称|描述|
|-|-|
|[NOT] BETWEEN ... AND ...|[不]在范围之内|
|[NOT] IN()|[不]在列出值范围内|
|IS [NOT] NULL|[不]为空|

```sql
SELECT 15 BETWEEN 10 AND 20; // 1
SELECT 20 BETWEEN 10 AND 20; // 1
SELECT 25 BETWEEN 10 AND 20; // 0

SELECT 15 IN(5,10,15,20); // 1
SELECT 13 IN(5,10,15,20); // 0

SELECT NULL IS NULL; // 1
SELECT '' IS NULL; // 0
SELECT 0 IS NULL; // 0
```

## 日期时间函数
|名称|描述|
|-|-|
|CURDATE() CURRENT_DATE()|系统当前日期|
|CURTIME() CURRENT_TIME()|系统当前时间，不包含具体的日期|
|NOW() CURRENT_TIMESTAMP()|系统当前时间，包含具体的日期+时间|
|DATE()|返回时间的日期部分|
|YEAR()|返回时间的年份部分|
|MONTH()|返回时间的月份部分|
|DAY()|返回时间的天数部分|
|HOUR()|返回时间的小时部分|
|MINUTE()|返回时间的分钟部分|
|SECOND()|返回时间的秒部分|
|EXTRACT()|抽取具体的年、月、日、时、分、秒|
|DATEDIFF()|日期差值|
|DATE_ADD()|日期变化|
|DATE_FORMAT()|日期格式化|
:::warning
`DATE` 日期格式必须是 yyyy-mm-dd 的形式。如果要进行日期比较，就要使用 `DATE` 函数，不要直接使用日期与字符串进行比较
:::
```sql
SELECT CURDATE(); # 2020-12-05
SELECT CURRENT_DATE; # 2020-12-05
SELECT CURRENT_DATE(); # 2020-12-05

SELECT CURTIME(); # 17:25:03
SELECT CURRENT_TIME; # 17:25:03
SELECT CURRENT_TIME(); # 17:25:03

SELECT NOW(); # 2020-12-05 17:25:03
SELECT CURRENT_TIMESTAMP; # 2020-12-05 17:25:03
SELECT CURRENT_TIMESTAMP(); # 2020-12-05 17:25:03

SELECT DATE('2020-12-05 17:25:03'); # 2020-12-05
SELECT DATE('2020/12/05 17:25:03'); # 2020-12-05
SELECT TIME('2020-12-05 17:25:03'); # 17:25:29
SELECT TIMESTAMP('2020-12-05 17:25:03'); # 2020-12-05 17:25:03
SELECT TIMESTAMP('2020-12-5'); # 2020-12-05 00:00:00

SELECT YEAR('2020-12-05'); # 2020
SELECT YEAR('2020-12-05 17:25:03'); # 2020
SELECT MONTH('2020-12-05 17:25:03'); # 12
SELECT DAY('2020-12-05 17:25:03'); # 5
SELECT HOUR('2020-12-05 17:25:03'); # 17
SELECT MINUTE('2020-12-05 17:25:03'); # 25
SELECT SECOND('2020-12-05 17:25:03'); # 3

SELECT EXTRACT(YEAR FROM '2020-12-05 17:25:03'); # 2020
SELECT EXTRACT(MONTH FROM '2020-12-05 17:25:03'); # 12
SELECT EXTRACT(DAY FROM '2020-12-05 17:25:03'); # 5
SELECT EXTRACT(HOUR FROM '2020-12-05 17:25:03'); # 17
SELECT EXTRACT(MINUTE FROM '2020-12-05 17:25:03'); # 25
SELECT EXTRACT(SECOND FROM '2020-12-05 17:25:03'); # 3

SELECT DATEDIFF('2020-01-23','2020-04-12'); // -80
SELECT DATEDIFF('2020-10-01','2020-07-05'); // 88

SELECT DATE_ADD('2020-07-05', interval 1 YEAR); // 2021-07-05
SELECT DATE_ADD('2020-07-05', interval 12 MONTH); // 2021-07-05
SELECT DATE_ADD('2020-07-05', interval 365 DAY); // 2021-07-05
SELECT DATE_ADD('2020-07-05', interval -365 DAY); // 2019-07-06
SELECT DATE_ADD('2020-07-05', interval 4 WEEK); // 2020-08-02

SELECT DATE_FORMAT('2020-7-5 23:24:9','%m/%d/%Y %H:%i:%s'); // 07/05/2020 23:24:09
SELECT DATE_FORMAT(NOW(),'%m/%d/%Y %H:%i:%s'); // 07/05/2020 23:30:04
```

## 转换函数
转换函数可以转换数据之间的类型
|名称|描述|
|-|-|
|CAST()|数据类型转换，参数是一个表达式，表达式通过 AS 关键词分割了两个参数，分别是原始数据和目标数据类型|
|COALESCE()|返回第一个非空数值|
```sql
SELECT CAST(123.123 AS INT)  -- 运行结果会报错
SELECT CAST(123.123 AS DECIMAL(8,2)); # 123.12

SELECT COALESCE(NULL,1,2); # 1
SELECT COALESCE(null,1,2); # 1
SELECT COALESCE(null,'1',2); # '1'
SELECT COALESCE(null,'Hello',2); # Hello
```
`CAST` 函数在转换数据类型的时候，不会四舍五入，如果原数值有小数，那么转换为整数类型的时候就会报错。不过你可以指定转化的小数类型，在 MySQL 和 SQL Server 中，可以用 `DECIMAL(a,b)` 来指定，其中 a 代表整数部分和小数部分加起来最大的位数，b 代表小数位数，比如 `DECIMAL(8,2)` 代表的是精度为 8 位（整数加小数位数最多为 8 位），小数位数为 2 位的数据类型。所以 `SELECT CAST(123.123 AS DECIMAL(8,2))` 的转换结果为 123.12。

## 信息函数
|名称|描述|
|-|-|
|DATABASE()|当前数据库|
|VERSION()|版本信息|
|USER()|当前用户|
|CONNECTION_ID()|连接ID|
|LAST_INSERT_ID()|最后插入记录的ID号|

## 聚合函数
|名称|描述|
|-|-|
|AVG()|平均值|
|SUM()|求和|
|MIN()|最小值|
|MAX()|最大值|
|COUNT()|计数|

## 加密函数
|名称|描述|
|-|-|
|MD5()|信息摘要算法|
|PASSWORD()|密码算法|
:::warning
在 mysql 5.7.9 以后移除了 PASSWORD() 函数
:::
```sql
SELECT MD5('root'); // 63a9f0ea7bb98050796b649e85481845

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

SELECT f1(); // 2020年07月06日 23点45分01秒
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

SELECT f2(13,14); # 13.50
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

## Join
JOIN 类型分为：内连接（INNER）、全外连接（FULL OUTER）、左外连接（LEFT OUTER）、右外连接（RIGHT OUTER）、交叉连接（CROSS）

![INNER JOIN](/mysql/inner_join.jpg)

![LEFT OUTER JOIN](/mysql/left_outer_join.jpg)

![RIGHT OUTER JOIN](/mysql/right_outer_join.jpg)

![FULL OUTER JOIN](/mysql/full_outer_join.jpg)

![UNION ALL](/mysql/full_outer_join_union_all.jpg)
