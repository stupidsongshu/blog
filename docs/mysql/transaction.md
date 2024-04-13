# 事务

在 MySQL 5.5 版本之前，默认的存储引擎是 MyISAM，在 5.5 版本之后默认存储引擎是 [InnoDB](https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html)。InnoDB 和 MyISAM 区别之一就是 InnoDB 支持事务，也可以说这是 InnoDB 取代 MyISAM 的重要原因。

事务保证了一次处理的完整性，也保证了数据库中的数据一致性。它是一种高级的数据处理方式，如果我们在增加、删除、修改的时候某一个环节出了错，它允许我们回滚还原。正是因为这个特点，事务非常适合应用在安全性高的场景里，比如金融行业等。

```sql
-- 查看存储引擎（可以看到 MySQL 中只有 InnoDB 支持事务）
SHOW ENGINES;
+--------------------+---------+----------------------------------------------------------------+--------------+------+------------+
| Engine             | Support | Comment                                                        | Transactions | XA   | Savepoints |
+--------------------+---------+----------------------------------------------------------------+--------------+------+------------+
| ndbcluster         | NO      | Clustered, fault-tolerant tables                               | NULL         | NULL | NULL       |
| FEDERATED          | NO      | Federated MySQL storage engine                                 | NULL         | NULL | NULL       |
| MEMORY             | YES     | Hash based, stored in memory, useful for temporary tables      | NO           | NO   | NO         |
| InnoDB             | DEFAULT | Supports transactions, row-level locking, and foreign keys     | YES          | YES  | YES        |
| PERFORMANCE_SCHEMA | YES     | Performance Schema                                             | NO           | NO   | NO         |
| MyISAM             | YES     | MyISAM storage engine                                          | NO           | NO   | NO         |
| ndbinfo            | NO      | MySQL Cluster system information storage engine                | NULL         | NULL | NULL       |
| MRG_MYISAM         | YES     | Collection of identical MyISAM tables                          | NO           | NO   | NO         |
| BLACKHOLE          | YES     | /dev/null storage engine (anything you write to it disappears) | NO           | NO   | NO         |
| CSV                | YES     | CSV storage engine                                             | NO           | NO   | NO         |
| ARCHIVE            | YES     | Archive storage engine                                         | NO           | NO   | NO         |
+--------------------+---------+----------------------------------------------------------------+--------------+------+------------+
```

## [事务的特性 ACID](https://dev.mysql.com/doc/refman/8.0/en/mysql-acid.html)
- A 是**原子性**（`Atomicity`）。原子的概念就是不可分割，可以把它理解为组成物质的基本单位，也是进行数据处理操作的基本单位。
- C 是**一致性**（`Consistency`）。一致性指的就是数据库在进行事务操作后，会由原来的一致状态，变成另一种一致的状态。也就是说当事务提交后，或者当事务发生回滚后，数据库的完整性约束不能被破坏。
- I 是**隔离性**（`Isolation`）。它指的是每个事务都是彼此独立的，不会受到其他事务的执行影响。也就是说一个事务在提交之前，对其他事务都是不可见的。
- D 是**持久性**（`Durability`）。事务提交之后对数据的修改是持久性的，即使在系统出故障的情况下，比如系统崩溃或者存储介质发生故障，数据的修改依然是有效的。因为当事务完成，数据库的日志就会被更新，这时可以通过日志，让系统恢复到最后一次成功的更新状态。

ACID 可以说是事务的四大特性，在这四个特性中，原子性是基础，隔离性是手段，一致性是约束条件，持久性是目的。

## 事务的控制
```sql
-- 显式开启一个事务
START TRANSACTION 或者 BEGIN

-- 提交事务。当提交事务后，对数据库的修改是永久性的。
COMMIT

-- 回滚事务。撤销正在进行的所有没有提交的修改，或者将事务回滚到某个保存点。
-- SAVEPOINT：在事务中创建保存点，方便后续针对保存点进行回滚。一个事务中可以存在多个保存点。
ROLLBACK 或者 ROLLBACK TO [SAVEPOINT]

-- 删除某个保存点
RELEASE SAVEPOINT

-- 设置事务的隔离级别
SET TRANSACTION
```

### [autocommit](https://dev.mysql.com/doc/refman/8.0/en/innodb-autocommit-commit-rollback.html)
事务有两种方式，分别为**隐式事务**和**显式事务**。隐式事务实际上就是自动提交，Oracle 默认不自动提交，需要手写 COMMIT 命令，而 **MySQL 默认自动提交**（即在 MySQL 中当 autocommit=1 时，每条 SQL 语句都会自动进行提交）。

```sql
-- 默认情况下
SELECT @@autocommit;
+--------------+
| @@autocommit |
+--------------+
|            1 |
+--------------+

SHOW VARIABLES LIKE 'autocommit';
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| autocommit    | ON    |
+---------------+-------+
```

```sql
-- 关闭自动提交
SET autocommit = 0;

SELECT @@autocommit;
+--------------+
| @@autocommit |
+--------------+
|            0 |
+--------------+

SHOW VARIABLES LIKE 'autocommit';
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| autocommit    | OFF   |
+---------------+-------+
```

```sql
-- 开启自动提交
SET autocommit = 1;

SELECT @@autocommit;
+--------------+
| @@autocommit |
+--------------+
|            1 |
+--------------+

SHOW VARIABLES LIKE 'autocommit';
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| autocommit    | ON    |
+---------------+-------+
```

### completion_type
- completion=0 是**默认情况**。也就是说当执行 `COMMIT` 的时候会提交事务，在执行下一个事务时，还需要使用 `START TRANSACTION` 或者 `BEGIN` 来开启。
    ```sql
    -- 默认情况下
    SELECT @@completion_type;
    +-------------------+
    | @@completion_type |
    +-------------------+
    | NO_CHAIN          |
    +-------------------+

    SHOW VARIABLES LIKE 'completion_type';
    +-----------------+----------+
    | Variable_name   | Value    |
    +-----------------+----------+
    | completion_type | NO_CHAIN |
    +-----------------+----------+
    ```
- completion=1 时，在提交事务后，相当于执行了 `COMMIT AND CHAIN`，也就是开启一个**链式事务**，即在提交事务之后会开启一个相同隔离级别的事务（换种说法是在提交之后相当于在下一行写了一个 `START TRANSACTION` 或 `BEGIN`）。
    ```sql
    -- 设置为 1
    SET @@completion_type = 1;

    SELECT @@completion_type;
    +-------------------+
    | @@completion_type |
    +-------------------+
    | CHAIN             |
    +-------------------+

    SHOW VARIABLES LIKE 'completion_type';
    +-----------------+-------+
    | Variable_name   | Value |
    +-----------------+-------+
    | completion_type | CHAIN |
    +-----------------+-------+
    ```
- completion=2 时， COMMIT=`COMMIT AND RELEASE`，也就是在提交后会自动与服务器断开连接。
    ```sql
    -- 设置为 2
    SET @@completion_type = 2;

    SELECT @@completion_type;
    +-------------------+
    | @@completion_type |
    +-------------------+
    | RELEASE           |
    +-------------------+

    SHOW VARIABLES LIKE 'completion_type';
    +-----------------+---------+
    | Variable_name   | Value   |
    +-----------------+---------+
    | completion_type | RELEASE |
    +-----------------+---------+
    ```

## 事务并发
SQL-92 标准中定义了事务并发处理时存在的 3 种异常情况：
- 脏读（Dirty Read）：读到了其他事务还没有提交的数据（事务A会读到事务B未提交的数据，在事务B回滚后，事务A读到的就是脏数据）。
- 不可重复读（Nonrepeatable Read）：对某数据进行读取，发现两次读取的结果不同，也就是说没有读到相同的内容。这是因为有其他事务对这个数据同时进行了修改或删除。
- [幻读（Phantom Read）](https://dev.mysql.com/doc/refman/8.0/en/innodb-next-key-locking.html)：事务 A 根据条件查询得到了 N 条数据，但此时事务 B 更改或者增加了 M 条符合事务 A 查询条件的数据，这样当事务 A 再次进行查询的时候发现会有 N+M 条数据，产生了幻读。

:::tip
不可重复读和幻读都是在先后两次读取的时候发现不一致的情况，但是两种读取略有差别：

不可重复读是同一条记录的内容被修改了，重点在于UPDATE或DELETE

幻读是查询某一个范围的数据行变多了或者少了，重点在于INSERT
:::

## [事务隔离级别](https://dev.mysql.com/doc/refman/8.0/en/innodb-transaction-isolation-levels.html)

[🔥 廖雪峰-事务Demo](https://www.liaoxuefeng.com/wiki/1177760294764384/1179611198786848)

SQL-92 标准定义了 4 种隔离级别来解决这些异常情况：
- 读未提交（READ UNCOMMITTED ）：允许读到未提交的数据，这种情况下查询是不会使用锁的，可能会产生脏读、不可重复读、幻读等情况。
- 读已提交（READ COMMITTED）：只能读到已经提交的内容，可以避免脏读的产生，属于 RDBMS 中**常见的默认隔离级别**（比如 `Oracle `和 `SQL Server`），但如果想要避免不可重复读或者幻读，就需要在 SQL 查询的时候编写带加锁的 SQL 语句。
- 可重复读（REPEATABLE READ）：保证一个事务在相同查询条件下两次查询得到的数据结果是一致的，可以避免不可重复读和脏读，但无法避免幻读。**`MySQL` 默认的隔离级别就是可重复读**。
- 可串行化（SERIALIZABLE）：将事务进行串行化，也就是在一个队列中按照顺序执行，可串行化是最高级别的隔离等级，可以解决事务读取中所有可能出现的异常情况，但是它牺牲了系统的并发性。

|                             | 脏读 | 不可重复读 | 幻读 |
| --------------------------- | --- | --------- | ----- |
| 读未提交（READ UNCOMMITTED ） | 允许 | 允许 | 允许 |
| 读已提交（READ COMMITTED）    | 禁止 | 允许 | 允许 |
| 可重复读（REPEATABLE READ）   | 禁止 | 禁止 | 允许 |
| 可串行化（SERIALIZABLE）      | 禁止 | 禁止 | 禁止 |

可串行化能避免所有的异常情况，而读未提交则允许异常情况发生。

```sql
-- 查看下当前会话的隔离级别
SELECT @@transaction_isolation;
+-------------------------+
| @@transaction_isolation |
+-------------------------+
| REPEATABLE-READ         |
+-------------------------+

SHOW VARIABLES LIKE 'transaction_isolation';
+-----------------------+-----------------+
| Variable_name         | Value           |
+-----------------------+-----------------+
| transaction_isolation | REPEATABLE-READ |
+-----------------------+-----------------+
```

```sql
-- 设置当前会话的隔离级别（降到最低）
SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

SHOW VARIABLES LIKE 'transaction_isolation';
+-----------------------+------------------+
| Variable_name         | Value            |
+-----------------------+------------------+
| transaction_isolation | READ-UNCOMMITTED |
+-----------------------+------------------+
```

隔离级别越低，意味着系统吞吐量（并发程度）越大，但同时也意味着出现异常问题的可能性会更大。在实际使用过程中我们往往需要在性能和正确性上进行权衡和取舍，没有完美的解决方案，只有适合与否。
