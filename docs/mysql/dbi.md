# 索引

## 什么情况下需要创建索引？
- 字段的数值有唯一性限制：比如用户名
  - 索引本身可以起到约束的作用，比如唯一索引、主键索引都是可以起到唯一性约束的，因此在数据表中，如果某个字段是唯一性的，就可以直接创建唯一性索引，或者主键索引。
- 频繁作为 `WHERE` 查询条件的字段，尤其在数据表大的情况下
  - 在数据量大的情况下，某个字段在 SQL 查询的 WHERE 条件中经常被使用到，那么就需要给这个字段创建索引了。创建普通索引就可以大幅提升数据查询的效率。
- 需要经常 `GROUP BY` 和 `ORDER BY` 的列
  - **索引就是让数据按照某种顺序进行存储或检索**，因此当使用 `GROUP BY` 对数据进行分组查询，或者使用 `ORDER BY` 对数据进行排序的时候，就需要对分组或者排序的字段进行索引。
  - 实际上多个单列索引在多条件查询时只会生效一个索引（MySQL 会选择其中一个限制最严格的作为索引），所以在**多条件联合查询的时候最好创建联合索引**。
- `UPDATE`、`DELETE` 的 `WHERE` 条件列，一般也需要创建索引
  - 原理是需要先根据 `WHERE` 条件列检索出来这条记录，然后再对它进行更新或删除。
  - 如果进行更新的时候，更新的字段是非索引字段，提升的效率会更明显，这是因为**非索引字段更新不需要对索引进行维护**。
- `DISTINCT` 字段需要创建索引
- 多表 `JOIN` 连接操作时：
  - 连接表的数量尽量不要超过 3 张，因为每增加一张表就相当于增加了一次嵌套的循环，数量级增长会非常快，严重影响查询的效率
  - 对 `WHERE` 条件创建索引，因为 `WHERE` 才是对数据条件的过滤。如果在数据量非常大的情况下，没有 `WHERE` 条件过滤是非常可怕的。
  - 对用于连接的字段创建索引，并且该字段在多张表中的类型必须一致

## 什么情况下不需要创建索引？
- 表记录太少，比如少于 1000 个
- `WHERE` 条件（包括 `GROUP BY`、`ORDER BY`）里用不到的字段不需要创建索引，索引的价值是快速定位，如果起不到定位的字段通常是不需要创建索引的。
- **大量重复数据**的字段不用创建索引，比如性别字段
  - 特例：重复值高的字段一般不创建索引，重复率高于10%可以考虑不创建索引，具体情况也要具体分析，通常都不应该给性别字段创建索引，因为重复度高，但是如果数据集是女人国，男性比例只有0.01%，在想要查询哪些为男性的情况时使用索引进行查询效率会更高。这种情况也适用于某种疾病（发病率很低）正样本的查询，是否患有某个罕见病的数值为0或者1，且疾病的发病率（数值=1的情况）往往很低，如果想要查询哪些人患了这种疾病，那么将这个字段创建索引后查询的效率会更高，因为想要查找的这个人群区分度还是很高的。
- **频繁更新的字段**不一定要创建索引。因为更新数据的时候也需要更新索引，如果索引太多，在更新索引的时候也会造成负担，从而影响效率。

## 什么情况下索引失效？
- 如果对索引进行了**表达式计算**，索引会失效。这是因为需要把索引字段的取值都取出来，然后依次进行表达式的计算来进行条件判断，因此采用的就是全表扫描的方式
- 如果对索引使用**函数**，索引也会失效。
- 在 `WHERE` 子句中，如果在 `OR` 前的条件列进行了索引，而在 `OR` 后的条件列没有进行索引，那么索引会失效。
  - 因为 `OR` 的含义是两个只要满足一个即可，因此只有一个条件列进行了索引是没有意义的，只要有条件列没有进行索引，就会进行全表扫描，因此索引的条件列也会失效。
- 使用 `LIKE` 进行模糊查询的时候，前面不能是 `%`
- 索引列尽量设置为 `NOT NULL` 约束
  - [MySQL 官方文档](https://dev.mysql.com/doc/refman/8.4/en/data-size.html)建议尽量将数据表的字段设置为 `NOT NULL` 约束，这样做的好处是可以更好地使用索引，节省空间，甚至加速 SQL 的运行
  - 判断索引列是否为 `NOT NULL` 往往需要走全表扫描，因此最好在设计数据表的时候就将字段设置为 `NOT NULL` 约束。比如可以将 `INT` 类型字段的默认值设置为 '0'，将字符类型的默认值设置为空字符串 ''。
- 使用时要注意**联合索引的最左原则**
  - 最左原则也就是需要从左到右的使用索引中的字段，一条 SQL 语句可以只使用联合索引的一部分，但是需要从最左侧开始，否则就会失效。（**语句中只用到联合索引的一部分时，需要考虑最左匹配原则；如果联合索引中的字段在语句都被用到了，就不需要考虑最左匹配原则了，此时索引不会失效**）
  - [mysql会一直向右匹配直到遇到范围查询(>、<、between、like)就停止匹配，本身字段也用到了索引，但后面的字段就失效](https://www.manongjc.com/detail/29-rnpuppiqpcxkbpn.html)

要尽可能扩展索引，而不是新建索引，因为索引数量过多需要维护的成本也会变大，导致写效率变低。同时还需要定期查询使用率低的索引，对于从未使用过的索引可以进行删除，这样才能让索引在 SQL 查询中发挥最大价值。
```sql
-- MySQL 中的 performance_schema.table_io_waits_summary_by_index_usage 数据表，
-- 它表明了每个索引进行统计的 I/O 等待事件，其中 COUNT_STAR 代表了事件的次数。
-- 过滤掉一些系统表，查看数据表中有哪些索引不经常使用的 SQL 语句如下：
SELECT OBJECT_SCHEMA, OBJECT_NAME, INDEX_NAME, COUNT_STAR
FROM performance_schema.table_io_waits_summary_by_index_usage
WHERE INDEX_NAME IS NOT NULL
AND COUNT_STAR = 0
AND OBJECT_SCHEMA != 'mysql'
AND OBJECT_SCHEMA != 'performance_schema';
```