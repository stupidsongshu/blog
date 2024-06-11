# 连接查询
:::tip
## SQL 标准
目前存在 SQL-86、SQL-89、SQL92、SQL99、SQL:2003、SQL:2008、SQL:2011 和 SQL:2016 等其他的标准。最重要的 SQL 标准是 SQL92 和 SQL99。
- 一般来说 SQL92 的形式更简单，但是写的 SQL 语句会比较长，可读性较差。
- SQL99 相比于 SQL92 来说，语法更加复杂，但可读性更强。
:::
## SQL92
SQL92 中有 5 种连接方式，分别是笛卡尔积、等值连接、非等值连接、自连接、外连接（左连接、右连接）。
### 笛卡尔积
笛卡尔乘积是一个数学运算。假设有两个集合 X 和 Y，那么 X 和 Y 的笛卡尔积就是 X 和 Y 的所有可能组合，也就是第一个对象来自于 X，第二个对象来自于 Y 的所有可能。

笛卡尔积也称为**交叉连接**，英文是 `CROSS JOIN`，它的作用就是可以把任意表进行连接，即使这两张表不相关。但我们通常进行连接还是需要筛选的，因此需要在连接后面加上 WHERE 子句，也就是作为过滤条件对连接数据进行筛选。比如后面的等值连接。
```sql
SELECT * FROM player, team
```

### 等值连接
两张表的等值连接就是用两张表中都存在的列进行连接，结果为这两张表的交集部分。也可以对多张表进行等值连接。
```sql
-- 针对 player 表和 team 表都存在 team_id 这一列，我们可以用等值连接进行查询
SELECT player_id, player.team_id, player_name, height, team_name
FROM player, team
WHERE player.team_id = team.team_id
```

### 非等值连接
进行多表查询的时候，如果连接多个表的条件是等号时，就是等值连接，其他的运算符连接就是非等值查询。

### 自连接
自连接可以对多个表进行操作，也可以对同一个表进行操作。也就是说查询条件使用了当前表的字段。

### 外连接
除了查询满足条件的记录以外，外连接还可以查询某一方不满足条件的记录。两张表的外连接，会有一张是主表，另一张是从表。如果是多张表的外连接，那么第一张表是主表，即显示全部的行，而剩下的表则显示对应连接的信息。在 SQL92 中采用 `(+)` 代表从表所在的位置，而且在 SQL92 中，只有左外连接和右外连接，没有全外连接。
- 左外连接，指的是左边的表是主表，需要显示左边表的全部行，而右侧的表是从表。
- 右外连接，指的是右边的表是主表，需要显示右边表的全部行，而左侧的表是从表。
```sql
-- SQL92
SELECT * FROM player, team where player.team_id = team.team_id(+)
-- SQL99
SELECT * FROM player LEFT JOIN team on player.team_id = team.team_id
```
```sql
-- SQL92
SELECT * FROM player, team where player.team_id(+) = team.team_id
-- SQL99
SELECT * FROM player RIGHT JOIN team on player.team_id = team.team_id
```

## SQL99
### 交叉连接
交叉连接 `CROSS JOIN` 实际上就是 SQL92 中的笛卡尔乘积。
```sql
SELECT * FROM player CROSS JOIN team

-- 如果多张表进行交叉连接，比如表 t1，表 t2，表 t3 进行交叉连接
SELECT * FROM t1 CROSS JOIN t2 CROSS JOIN t3
```

### 自然连接
自然连接 `NATURAL JOIN` 会自动查询两张连接表中所有相同的字段，然后进行等值连接。可以理解为 SQL92 中的等值连接。
```sql
-- SQL92
SELECT player_id, a.team_id, player_name, height, team_name
FROM player as a, team as b
WHERE a.team_id = b.team_id
-- SQL99 NATURAL JOIN
SELECT player_id, team_id, player_name, height, team_name
FROM player
NATURAL JOIN team
```

### ON 连接
`ON` 连接用来指定我们想要的连接条件
```sql
SELECT player_id, player.team_id, player_name, height, team_name
FROM player
JOIN team
ON player.team_id = team.team_id
```

### USING 连接
当我们进行连接的时候，可以用 USING 指定数据表里的同名字段进行等值连接。
```sql
SELECT player_id, team_id, player_name, height, team_name
FROM player
JOIN team
USING(team_id)
```

### 自连接
自连接的原理在 SQL92 和 SQL99 中都是一样的，只是表述方式不同。

### 外连接
- 左外连接：`LEFT JOIN` 或 `LEFT OUTER JOIN`
- 右外连接：`RIGHT JOIN` 或 `RIGHT OUTER JOIN`
- 全外连接：`FULL JOIN` 或 `FULL OUTER JOIN`
```sql
-- 全外连接
SELECT * FROM player FULL JOIN team ON player.team_id = team.team_id
```
全外连接实际上是左外连接和右外连接的结合，全外连接会返回左表和右表中的所有行。当表之间有匹配的行，会显示内连接的结果。当某行在另一个表中没有匹配时，那么会把另一个表中选择的列显示为空值。
也就是说，全外连接的结果 = 左右表匹配的数据 + 左表没有匹配到的数据 + 右表没有匹配到的数据。

:::tip
SQL92 和 SQL99 标准下的连接查询操作的方式略有不同，连接操作基本上可以分成三种情况：
- **内连接**：将多个表之间满足连接条件的数据行查询出来。它包括了**等值连接**、**非等值连接**和**自连接**。
- **外连接**：会返回一个表中的所有记录，以及另一个表中匹配的行。它包括了**左外连接**、**右外连接**和**全外连接**。
- **交叉连接**：也称为**笛卡尔积**，返回左表中每一行与右表中每一行的组合。在 SQL99 中使用的是 `CROSS JOIN`。

在这三种连接操作中，SQL92 和 SQL99 存在着明显的区别：
1. SQL92 中的 WHERE 和 SQL99 中的 JOIN：

在 SQL92 中进行查询时，会把所有需要连接的表都放到 FROM 之后，然后在 WHERE 中写明连接的条件。

而 SQL99 在这方面更灵活，它不需要一次性把所有需要连接的表都放到 FROM 之后，而是采用 JOIN 的方式每次连接一张表，可以多次使用 JOIN 进行连接。

2. 建议多表连接使用 SQL99 标准，因为层次性和可读性更强。
```sql
SELECT ...
FROM table1
  JOIN table2 ON table1 和 table2 的连接条件
    JOIN table3 ON table2 和 table3 的连接条件

-- 嵌套逻辑类似 for 循环
for t1 in table1:
  for t2 in table2:
    if condition1:
      for t3 in table3:
        if condition2:
          output t1 + t2 + t3
```
SQL99 采用的这种嵌套结构非常清爽，即使再多的表进行连接也都清晰可见。如果采用 SQL92，可读性就会大打折扣。
:::

:::warning
## 不同 DBMS 中使用连接需要注意的地方
### 1. 不是所有的 DBMS 都支持全外连接
Oracle、DB2、SQL Server 支持全外连接，但 MySQL、Access、SQLite、MariaDB 等数据库软件不支持全外连接。
```sql
-- 想在 MySQL 中写全外连接可以用 左外连接 UNION 右外连接，比如：
SELECT * FROM player LEFT JOIN team ON player.team_id = team.team_id
UNION
SELECT * FROM player RIGHT JOIN team ON player.team_id = team.team_id
```
### 2. Oracle 没有表别名 AS
为了让 SQL 查询语句更简洁，经常会使用表别名 `AS`，不过在 Oracle 中是不存在 `AS` 的，使用表别名的时候，直接在表名后面写上表别名即可，比如 `player p`，而不是 `player AS p`。
### 3. SQLite 的外连接只有左连接
SQLite 是一款轻量级的数据库软件，在外连接上只支持左连接，不支持右连接，如果想使用右连接的方式，比如 table1 RIGHT JOIN table2，在 SQLite 中可以写成 table2 LEFT JOIN table1，这样就可以得到相同的效果。
### 4. 控制连接表的数量
多表连接就相当于嵌套 for 循环一样，非常消耗资源，会让 SQL 查询性能下降得很严重，因此不要连接不必要的表。在许多 DBMS 中，也都会有最大连接表的限制。
### 5. 在连接时不要忘记 WHERE 语句
多表连接的目的不是为了做笛卡尔积，而是筛选符合条件的数据行，因此在多表连接的时候使用 WHERE 语句可以过滤掉不必要的数据行返回。
### 6. 使用自连接而不是子查询
一般情况建议使用自连接，因为在许多 DBMS 的处理过程中，对于自连接的处理速度要比子查询快得多。

可以这样理解：子查询实际上是通过未知表进行查询后的条件判断，而自连接是通过已知的自身数据表进行条件判断，因此在大部分 DBMS 中都对自连接处理进行了优化。
:::

## Join
JOIN 类型分为：内连接（INNER）、全外连接（FULL OUTER）、左外连接（LEFT OUTER）、右外连接（RIGHT OUTER）、交叉连接（CROSS）

<!-- ![INNER JOIN](/mysql/inner_join.jpg) -->
<img :src="$withBase('/mysql/inner_join.jpg')" alt="INNER JOIN">

<!-- ![LEFT OUTER JOIN](/mysql/left_outer_join.jpg) -->
<img :src="$withBase('/mysql/left_outer_join.jpg')" alt="LEFT OUTER JOIN">

<!-- ![RIGHT OUTER JOIN](/mysql/right_outer_join.jpg) -->
<img :src="$withBase('/mysql/right_outer_join.jpg')" alt="RIGHT OUTER JOIN">

<!-- ![FULL OUTER JOIN](/mysql/full_outer_join.jpg) -->
<img :src="$withBase('/mysql/full_outer_join.jpg')" alt="FULL OUTER JOIN">

<!-- ![UNION ALL](/mysql/full_outer_join_union_all.jpg) -->
<img :src="$withBase('/mysql/full_outer_join_union_all.jpg')" alt="UNION ALL">
