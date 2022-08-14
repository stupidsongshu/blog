# Java

- [Linux权限管理之基本权限](http://www.imooc.com/learn/481)
- [Linux软件安装管理](http://www.imooc.com/learn/447)
- [Linux达人养成计划 I](http://www.imooc.com/learn/175)
- [Linux服务管理](http://www.imooc.com/learn/537)
- [用iptables搭建一套强大的安全防护盾](http://www.imooc.com/learn/389)
- [版本管理工具介绍—Git篇](http://www.imooc.com/learn/208)
- [JAVA遇见HTML——JSP篇](http://www.imooc.com/learn/166)
- [项目管理利器——maven](http://www.imooc.com/learn/443)
- [与MySQL的零距离接触](http://www.imooc.com/learn/122)

## Javadoc
- [Oracle 官方的 Javadoc 地址](https://docs.oracle.com/en/java/javase/11/docs/api/index.html)
- Javadoc 命令文档：
  - [Windows](https://docs.oracle.com/en/java/javase/11/tools/javadoc.html)
  - [Unix](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/javadoc.html)

## JDK 和 JRE
- JDK（Java Development Kit）是 Java 的开发套件
- JRE（Java Runtime Environment）是 Java 的运行环境
- JDK 中包含了 JRE，而且还包含了很多和开发调试程序有关的工具，如javap、jar、jps、jstack、jmap、jstat、jhat、Jvisualvm
- JDK 中自带的工具文档：
  - [Java8](https://docs.oracle.com/javase/8/docs/technotes/tools/index.html)
  - [Java11](https://docs.oracle.com/en/java/javase/11/tools/tools-and-command-reference.html)

:::tip
- 表达式（expression）：Java 中最基本的一个运算。比如一个加法
运算表达式，`1+2`是一个表达式，`a+b`也是。
- 语句（statement）：类似于平时说话时的一句话，由表达式组成，
以`;`结束。`1+2;` `a+b;` `System.out.println("Hello World!");` 都是语句。
- 代码块：一对大括号括起来的就是一个代码块。
:::

:::tip
### bit位 byte字节
- 一个二进制的位叫做一个 bit。俗称小 b。宽带中的单位，都是小 b
- 八个二进制的位，组成一个 byte，俗称大 B。硬盘等存储的单位，都是大 B
- byte 是计算机中基本的衡量存储的单位，计算机在对外使用时不会用小 b 作为划分存储的单位
:::

# 基本数据类型
## 数字的基本数据类型
### 整数类型
- byte 占用1个 byte，值域是 -128 ~ 127
- short 占用2个 byte，值域是 -32768 ~ 32767
- int 占用4个 byte，值域是 $-2^{31}$ ~ $2^{31} - 1$，即-2147483648 ~ 2147483647 **（Java 中整数缺省是 *int* 类型）**
- long 占用8个 byte，值域是 -9223372036854774808 ~ 9223372036854774807
### 浮点（小数）类型
- float 有精度，值域复杂 ±340282346638528859811704183484516925440
- double 精度是 float 的一倍，占用8个 byte **（Java 中浮点数缺省是 *double* 类型）**
### 符号位
首位为符号位，0表示正数，1表示负数


## 布尔数据类型
- boolean 占用4个 byte，值域是 true, false。

## 字符数据类型
- char 占用2个 byte，值域是所有字符（最多 65535个）

# 运算符
运算符对一个或者多个值进行运算，并得出一个运算结果。

除赋值运算符外，运算符本身不会更改变量的值

- 取模运算符(用来计算余数)
- 比较运算符(>、>=、<、<=、!=、==)
- 布尔运算符(!、&、&&、|、||)
- 小括号运算符(决定运算符的顺序)

## 运算符优先级
- ()
- !
- *、/、%
- +、-
- \>、>=、<、<=
- ==
- !=
- &、&&、|、||
- =

:::tip
- 等号的优先级最低
- 算数运算符优先级高于比较运算符
- 比较运算符优先级高于布尔运算符
:::

## 位运算符
- 以 0 开头的整数为八进制，比如 05 就是十进制的 5，011 就是十进制的 9
- 以 0x 开头的整数位十六进制，比如 0xF 就是十进制的 15，0x11 就是十进制的 17
### 按位运算符
- 按位并（AND）：&
- 按位或（OR）：|
- 按位异或（XOR）：^
- 按位取反：~

<details>
<summary>用十进制表示 ~0xFF 的计算结果</summary>

:::tip
**答案：-256**

首先是字面值的缺省值的知识点。`0xFF`是一个整数字面值（literal value），整数字面值的缺省类型是int，即它是一个32bit（也就是4byte）的数据。只写FF意思是前面补0，也就是说 `int a = 0xFF;` 等价于 `int a = 0x000000FF;`

然后是取反，就是每位都取反。取反后的结果就是`0xFFFFFF00`

为什么`0xFFFFFF00`会是-256呢？这和负数的表示方式有关系，负数（首个bit为1的数）的表示方式是补码。补码的规则是，正数的补码就是正数本身，负数的补码是除符号位以外，各位取反，然后末位加1，也就说，-256在变成补码之前是`0x80000100`，除符号位各位取反之后是`0xFFFFFEFF`，末位再加个1，就变成了`0xFFFFFF00`。也就是`0x000000FF`各位取反的结果，所以`~0x000000FF`是十进制的-256的补码形态。

```java
public class Reverse {
  public static void main(String[] args) {
    int origin = 0x000000FF;
    int originReverse = ~origin;
    int originReverseManually = 0xFFFFFF00;
    System.out.println(origin);
    System.out.println(originReverse);
    System.out.println(originReverseManually);
  }
}
```
补充码是专门为计算机设计的一种优化计算的用来表示负数的编码方式，是一种非常精妙而自然的设计。
:::
</details>

### 位移运算符
- \>>：带符号右移，符号位不动(移动后不改变正负性)，其余位右移，符号位后边补 0，**效果是除2操作**
- \>>>：无符号右移，符号位一起右移(移动后会巨变成较大的正数)，左边补 0
- <<：左移，右边补 0。左移没有带符号位一说，因为符号位在最左侧，**效果是乘2操作**

:::tip
位运算符用处
- 按位运算符：掩码（MASK）
- 位移运算符：高效除以或乘以 2
:::


## 数据类型自动转换
### 自动类型转换
- **不会出现问题的类型转换**，编程语言可以做自动类型转换，比如低精度的数字向高精度的数字转换。
- 自动类型转换可以发生在算数运算，也可以发生在赋值。
  :::tip
  int 除以 int 还是 int，不会变成浮点数
  ```java
  int a = 10;
  int b = 3;
  double c = 3;
  System.out.println(a / b); // 3
  System.out.println(10 / 3); // 3
  System.out.println(a / c); // 3.3333333333333335
  System.out.println(10 / 3.0); // 3.3333333333333335
  ```
  :::
### 数值精度顺序
byte < short < int < long < float < double
### char 可以转换为 int
char 和 short 虽然同样是两个 byte，但是因为 char 是无符号数，值域超出了 short 可以表示的范围，所以不可以自动转为 short。
```java
char a1 = 'A';
int b1 = a1;
System.out.println(b1); // 65
```
## 数据类型强制转换
### 强制类型转换
- **可能出现问题的类型转换**，需要使用强制类型转换，比如高精度数值向低精度数值转换
- 强制类型转换也是操作符，语法是用小括号括起来的目标类型放在被转换的值前面
- 强制转换可能会造成数据精度丢失
```java
int intVal = 99;
long longVal = 9999999999L;
intVal = (int) longVal;
System.out.println(intVal); // 1410065407

float floatVal = 11.11f;
double doubleVal = 22.123456;
floatVal = (float) doubleVal;
System.out.println(floatVal); // 22.123455

int a2 = 65;
char b2 = (char) a2;
System.out.println(b2); // A
```
### 数值溢出
- 数值计算一旦溢出，结果将失去其原有意义。比如两个正数会加出负数。
- 要对能够处理的值有大概的估计。
- BigInt

## 字符集编码
Java 中用的是 UTF-16 编码的 Unicode。UTF-16用16个 bit，即2个 byte，这也是 char 占用2个 byte 的原因。当把 char 转成数字的时候，需要用 int。
### 字符集（Charset）
- 字符集就是字符的集合，一般会包含一种语言的字符。比如 GBK 是包含所有常用汉字字符的字符集；ASCII 是包含英文字符的字符集。
- 字符就是 Java 中的 char，char 是 character 的简写。
#### 常用的字符集
- ASCII 码
- Unicode 包含世界上所有常用字符，编码也有几种，包括 UTF-8（8-bit Unicode Transformation Format ），UTF-16 等。
-  Unicode，GBK 等所有常用的字符集，都会兼容 ASCII。比如字符 A 在这些所有常用的字符集里，都是对应数字 65。

### 编码（Encoding）
- char 代表一个字符，char 的本质也是数字。
- 将数字映射到字符，就叫编码。
- 将一个字符集映射到数字，就是给这个字符集编码。
- 编码是有标准的，所有的计算机系统按照同一个编码标准执行。
- 有时候编码和字符集会混用。

## 字符串
### String
- 特点：**不可变**（immutable）。String 用来存储字符的数据是 private 的，而且不提供任何修改内容的方法，所以 String 对象一旦生成，其内容就是完全不可能被修改的
- 字符串可以和任何类型进行加法运算，则会将这个值的字符拼接到字符串上
- 字符串的加法运算符符合加法运算符本身的优先级
- 字符串可以使用 `+=` 操作符来拼接
- 字符串类型的名字叫做 String
- 字符串不是 Java 中的基本数据类型，但是也可以使用类似的语法 `String str = "abc";` 来创建
- String 不是 Java 中的保留字

### StringBuilder
- **可变**，非常方便地用来拼接和处理字符串的类
- 操作的方法都会返回this自引用
```java
public class LearnStringBuilder {
  public static void main(String[] args) {
    // StringBuilder 是可变的
    // 对它进行操作的方法都会返回this自引用，这样我们就可以一直点下去，对String进行构造
    StringBuilder strBuilder = new StringBuilder();
    long longVal = 123456789;

    strBuilder.append(true).append("abc").append(longVal);

    System.out.println(strBuilder.toString()); // trueabc123456789
    System.out.println(strBuilder.reverse().toString()); // 987654321cbaeurt
    System.out.println(strBuilder.reverse().toString()); // trueabc123456789
    System.out.println(strBuilder.toString()); // trueabc123456789
    System.out.println(strBuilder.delete(0, 4).toString()); // abc123456789
    System.out.println(strBuilder.insert(3,"LLLLL").toString()); // abcLLLLL123456789
  }
}
```

# overload
一个类中如果定义了名字相同，签名不同的方法，就叫做方法的重载。
## 方法签名
- 方法签名：**方法名** + 依次**参数类型**。注意，**返回值**不属于方法签名。
- 方法签名是一个方法在一个类中的唯一标识。同一个类中方法可以重名，但是签名不可以重复。
## 重载的参数匹配规则
方法调用的时候，参数不必完全类型一样。对于数字类型的参数，实参可以自动类型转换成形参类型即可，另外如果参数满足自动类型转换的方法有多个，那么方法调用将采取就近原则(byte short int long float double)。
```java
public class Test {
  public String name;
  public double count;
  public double soldPrice;

  public double buy() {
    System.out.println("buy()被调用了");
    return buy(1);
  }
  public double buy(int count) {
    System.out.println("buy(int)被调用了");
    return buy(count, false);
  }
  public double buy(double count) {
    System.out.println("buy(double)被调用了");
    if (this.count < count) {
      return -1;
    }
    this.count -= count;
    double totalCost = count * soldPrice;
    return totalCost;
  }
  public double buy(int count, boolean isVip) {
    System.out.println("buy(int,boolean)被调用了");
    if (this.count < count) {
      return -1;
    }
    this.count -= count;
    double totalCost = count * soldPrice;
    if (isVip) {
      totalCost *= 0.95;
    }
    return totalCost;
  }
}

Test test = new Test();
test.buy(); // buy() => buy(int) => buy(int, boolean)
test.buy(10); // buy(int) => buy(int, boolean)
test.buy(10.0); // buy(double)
byte countByte = 10;
test.buy(countByte); // buy(int) => buy(int, boolean)
byte long = 10;
test.buy(countByte); // buy(double)
```

# constructor
- 构造方法：方法名与类名相同，且没有返回值的方法。(有返回值也没用，`new` 语句返回的永远是创建出来的对象引用)
- 如果没有显示地添加类构造方法，Java会给每个类自动添加一个无参数的构造方法，否则就不会自动添加。
- 添加了有参数的构造方法后，在使用 `new` 创建对象时必须传递参数。
- 构造方法无法被点操作符调用或者在普通方法里被调用，只能通过 `new` 语句在创建对象时被调用。
## 构造方法重载
- 语法为 `this(实参列表)`
- 在构造方法里才能调用重载的构造方法，必须位于构造方法的第一行，后面可以有代码
- 构造方法不能自己调用自己，这会是一个死循环
- 在调用重载的构造方法时，不可以使用成员变量。因为用语意上讲，这个对象还没有被初始化完成，处于中间状态

# static
```java
public static double DISCOUNT_FOR_VIP = 0.95;
public static double getVIPDiscount() {
  return DISCOUNT_FOR_VIP;
}
```
## 静态变量
- 静态变量如果不赋值，Java 会给它赋以其类型的初始值
- 静态变量一般习惯使用全大写字母加下划线分割
- 有 public 修饰符的静态变量，所有的代码都可以使用；没有 public 修饰符的静态变量，只能被当前包的代码使用
## 静态方法
- 没有 `this` 自引用，它不属于某个实例，所以不能直接访问成员变量
- 静态方法可以访问静态变量，包括自己类的静态变量和在访问控制符允许的别的类的静态变量
- 当然在静态方法里面，也可以自己创建对象或者通过参数，获得对象的引用，进而访问成员变量和方法
- 静态方法可以被继承，但父子类的方法签名及返回值类型都必须相同
- 静态方法推荐用类名调用，也可以使用实例对象调用（不推荐）
- 静态方法没有多态，被实际调用的静态方法与引用类型有关，而与引用指向的对象的类型无关（*与之相反的是，父子类引用赋值的 override 覆盖多态*）

# 可见性修饰符
可见性修饰符用在类、成员方法、构造方法、静态方法和属性上，其可见性的范围是一样的
- private: 仅当前类可见
- 缺省(default): 仅当前包可见
- protected = default + 继承者可见
- public: 全局可见

访问控制符的包可见性：
| 类内部     | 本包       | 子类      | 外部包     |
| --------- | --------- | --------- | --------- |
| private   |           |           |           |
| default   | default   |           |           |
| protected | protected | protected |           |
| public    | public    | public    | public    |

:::warning
#### 子类覆盖父类的方法，不可以用可见性更低的修饰符，但是可以用更高的修饰符
这与多态有关，可见性更低的修饰符会引起冲突
:::

:::tip
成员变量应该都声明为 private，如果要读写这些成员变量最好使用 get/set 方法，这些方法应该是 public 的，这样做的好处是，如果有需要，可以通过代码检查每个属性值是否合法。

构造方法使用 private + public static 的组合，就可以在 static 方法里判断，然后不符合条件直接返回null或者抛出异常，避免创建一个状态不对的对象。

```java
public class Test {
  private int id;
  private String name;
  private double price;
  public static double DISCOUNT = 0.95;

  /**
   * 有些时候，会把所有的构造方法都定义成 private 的，
   * 然后使用静态方法调用构造方法，
   * 这样的好处是可以通过代码，检查每个属性值是否合法。
   */
  private Test(int id, String name, double price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
  public static Test createTest(int id, String name, double price) {
    if (price < 0) {
      return null;
    }
    return new Test(id, name, price);
  }

  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public double getPrice() {
    return price;
  }
  public void setPrice(double price) {
    this.price = price;
  }
}
```
:::

## final
- 修饰类
  - 不能被子类继承 extends
- 不能修饰构造方法，否则会报错
- 修饰成员变量
  - 必须被赋值且只能被赋值一次，赋值后不能再次修改
  - 要么在声明时赋值，要么在构造方法中赋值
- 修饰静态变量
  - 必须被赋值且只能被赋值一次，赋值后不能再次修改
  - 要么在声明时赋值，要么在 static 代码块中赋值
- 修饰成员方法
  - 不能被子类覆盖 override
- 修饰形参
  - 只能在方法调用传递参数时被实参赋值，不能再次修改
- 修饰局部变量
  - 必须被赋值且只能被赋值一次，赋值后不能再次修改
- 修饰引用
  - 类似 JavaScript 中的 `const`

# 组合与继承
## 组合
- 组合：在自己的类里使用别的类，这两个类之间地关系我们叫做"has-a"
## extends
- 继承是一种"is-a"的关系，也就是说，在用类构造的世界中，"子类（Sub Class）是父类（Parent Class）的一种特殊类别"
- Java中只允许一个类有一个直接的父类，即所谓的单继承
- 子类继承了父类所有的属性和方法，但是子类并不能访问父类的 private 的成员（包括方法和属性）
- 继承不是组合，继承也不只是为了能简单的拿来父类的属性和方法。如果仅仅如此，原封不动的拿来主义，组合也能做到
- 继承不是通过组合的方式来实现的。和组合相比，继承更像是"融合"，即合二为一，父类与子类可以互相影响，比如子类可以重写覆盖父类方法
### override
- 覆盖才是继承的精髓和终极奥义
- 通过使用和父类方法签名一样，且返回值类型也必须一样(不能是类型兼容)的方法，可以让子类覆盖(override)掉父类的方法
- 也就是说，子类并不是只能把父类的方法拿过来，而且可以通过覆盖来替换其中不适合子类的方法
### super
- super 是子类和父类交流的桥梁，但并不是父类的引用（可以认为，创建子类对象的同时创建了一个隐藏的父类对象）
- 使用 super 调用父类的构造方法时，必须是子类构造方法的第一个语句
- 使用 super 可以访问父类的方法和属性（当然必须满足访问控制符的控制）
- super 调用构造方法时，不可以使用 super 访问父类的属性和方法，不可以使用子类成员变量和方法，可以使用静态变量和方法
:::warning
在构造方法内，使用`this`调用重载的构造方法需要位于*第一行语句*，使用`super`调用父类的构造方法也需要位于*第一行语句*，所以此时`this`和`super`不可以同时调用。

`new`操作符是创建对象，构造方法是初始化对象。子类的对象内含了一个父类的对象，这个父类的对象也要初始化，就靠调用父类对应的构造方法。所以**子类的构造方法肯定会调用一下父类的构造方法，无论是隐式的调用，还是`super()`显式的调用**。

```java
// Merchandise.java
public class Merchandise {
  private String name;
  private String id;
  private int count;
  private double soldPrice;
  private double purchasePrice;

  public Merchandise(String name, String id, int count, double soldPrice, double purchasePrice) {
    this.name = name;
    this.id = id;
    this.count = count;
    this.soldPrice = soldPrice;
    this.purchasePrice = purchasePrice;
  }
  public Merchandise(String name, String id, int count, double soldPrice) {
    this(name, id, count, soldPrice, soldPrice * 0.8);
  }
  /**
   * 子类的构造方法肯定会调用一下父类的构造方法，
   * 如果父类没有缺省的构造方法(即无参的构造方法)，
   * 子类在隐式或使用 super() 显式调用父类构造方法时会报错，
   * 此时子类的构造方法内必须显式地使用 super 进行调用并传入参数
   */
  // public Merchandise() {
  //   this("无名", "000", 0, 1.2, 1);
  // }
}

// Phone.java
public class Phone extends Merchandise {
  private double screenSize;
  private double cpuHZ;
  private int memoryG;
  private int storageG;
  private String brand;
  private String os;
  private static int MAX_BUY_ONE_ORDER = 5;

  public Phone(
    String name, String id, int count, double soldPrice, double purchasePrice,
    double screenSize, double cpuHZ, int memoryG, int storageG, String brand, String os
  ) {
    super(name, id, count, soldPrice * 1.2, purchasePrice);
    // this(); // 会报错，this() 与 super() 都需要位于第一行语句，使用下面的 init 方法可以解决
    init(screenSize, cpuHZ, memoryG, storageG, brand, os);
  }
  public Phone() {
    // 父类没有缺省的构造方法时，子类的构造方法内必须显式地使用 super 进行调用并传入参数
    super("无名", "000", 0, 1.2, 1);
    init(4.5, 4.6, 6, 128, "Unknown", "Unknown");
  }

  public void init(double screenSize, double cpuHZ, int memoryG, int storageG, String brand, String os) {
    this.screenSize = screenSize;
    this.cpuHZ = cpuHZ;
    this.memoryG = memoryG;
    this.storageG = storageG;
    this.brand = brand;
    this.os = os;
  }
}
```
:::

### 父类和子类的引用赋值关系
- **父类的引用可以指向子类的对象**，也就是说，可以用子类的引用给父类的引用赋值，因为子类继承了父类的方法和属性，所以父类的对象能做到的，子类的对象肯定能做到，我们可以在子类的对象上执行父类的方法；但是反之不行，不能让子类的引用指向父类的对象，因为父类并没有子类的属性和方法
- **引用类型（"名"）决定可以调用的方法，引用指向的对象的类型决定实际调用的是哪个类的方法**，所以引用指向的对象要么是其本身要么是其子类。如`Merchandise m = (Phone) phone;`，Phone 是 Merchandise 的子类，Merchandise 是 m 的引用类型，此时只能通过父类的引用，像父类一样操作子类的对象，所以 m 只能调用 Merchandise 中定义的方法；对于实际调用的方法，具体执行的是哪个类 (可能是Phone，可能是Phone的父类) 里定义的方法要看覆盖情况。
- 确定父类的引用是指向的子类或者子类的子类对象，那么可以**强制类型转换**。**能转换的类型（包含）在实际指向的对象类型与引用的类型（父类）之间，即只能往其类型本身或其父类类型转，最后保证满足条件父类的引用指向子类的对象**。
```java
// ShellColorChangePhone extends Phone
// Phone extends Merchandise
// TODO 父类和子类的引用赋值关系: 父类的引用可以指向子类的对象(或者说可以用子类的引用给父类的引用赋值)，反之不行
ShellColorChangePhone shellColorChangePhone = new ShellColorChangePhone();
Merchandise merchandise = new Phone();
Merchandise merchandise1 = shellColorChangePhone;
Phone phone3 = shellColorChangePhone;

// TODO 确定父类的引用实际指向的是子类Phone或者Phone的子类对象，那么可以强制类型转换
Merchandise merchandise2 = (Phone) merchandise;
Merchandise merchandise3 = (Merchandise) merchandise;
Phone phone4 = (Phone) merchandise;

// TODO 确定父类的引用实际指向的是子类ShellColorChangePhone或者ShellColorChangePhone的子类对象，那么可以强制类型转换
Merchandise merchandise4 = (Merchandise) merchandise1;
Merchandise merchandise5 = (Phone) merchandise1;
Merchandise merchandise6 = (ShellColorChangePhone) merchandise1;
Phone phone5 = (Phone) merchandise1;
Phone phone6 = (ShellColorChangePhone) merchandise1;
ShellColorChangePhone shellColorChangePhone1 = (ShellColorChangePhone) merchandise1;

// TODO 会出错，只能往其类型本身或其父类类型转
//  因为merchandise实际指向的是一个Phone类型的对象，所以merchandise只能转为Phone(其类型本身)或Merchandise(其父类类型)，不能转成ShellColorChangePhone(Phone的子类)
// ShellColorChangePhone shellColorChangePhone2 = (ShellColorChangePhone) merchandise;
```

### 多态
程序的执行就是找到要执行的代码，并且知道执行的代码能访问哪些数据，这些数据从哪里来。

多态的核心问题就是：要调用哪个类的哪个方法，这个方法用到的数据（this 引用）是谁。

override 和继承有关，子类如果有签名相同的方法，会覆盖父类中的方法。overload 是同一个类中的方法可以有不同的参数。
#### override 覆盖-动态多态
父类的引用指向子类对象时：
- 可以调用只在父类中的方法（继承），可以调用子类覆盖了父类的方法（覆盖，多态）
- 如果这个方法的代码中又调用了别的方法，那么还是会遵循以上规则。例如，父类中有 m1、m2 两个方法，且 m1 调用了 m2，如果子类覆盖了 m2 方法，那么实际指向的为子类对象在调用 m1 时，m1 中调用的 m2 会是子类中覆盖后的 m2
#### overload 重载-静态多态
- overload 重载实际调用的方法和参数的引用类型有关，和引用实际指向的类型无关，因为调用时参数类型是确定的，所以在编译期就知道该调用哪个方法，跟 override 覆盖相反。
- 如果引用类型没有完全匹配，则会根据参数当前类型，沿着继承关系找到最近一个与之匹配类型的父类的方法
- 静态方法和成员方法的重载寻找顺序是一样的

## Object 万类之祖
### equals()
- 比较对象：需要根据业务逻辑自己实现 equals 和 hashCode，覆盖掉 Object 的 equals 和 hashCode。约定俗称的覆盖原则是，`equals()`为`true`是`hashCode()`相等的充分不必要条件。`equals()`返回`true`时，`hashCode()`应该相等；反之，`hashCode()`相等时，`equals()`不一定为`true`
- 比较字符串：每个 String 都会创建一个新的 String 对象，由于 String 操作频繁且是**不可变**的，所以 Java 对 String 做了特殊优化，当长度较短时，如果内容跟已存在的一样，那么会直接返回这个对象，减少重复创建相同内容的对象
- `==`比较的是两者实际指向的地址，所以比较对象或字符串时用 `equals` 而不是 `==`
  ```java
  String s1 = "aaabbb";
  String s2 = "aaa" + "bbb";
  // 字符串长度较短时触发了 Java 对 String 的优化，
  // s1、s2 指向同一个对象，所以用 == 操作符比较时也返回 true
  System.out.println(s1 == s2); // true
  System.out.println(s1.equals(s2)); // true

  Scanner scanner = new Scanner(System.in);
  System.out.println("请输入一个较长的字符串");
  s1 = scanner.nextLine();
  System.out.println("请再次输入上一个较长的字符串");
  s2 = scanner.nextLine();
  System.out.println(s1 == s2);
  System.out.println(s1.equals(s2));
  ```
### toString()

## Class 类
- Class 类是代表类的类，每个 Class 类的实例都代表了一个类
- 访问方式：`类名.class` 或 `实力对象引用.getClass()`
- 通过一个类的 Class 实例，可以获取这个类所有的信息，包括成员变量、方法、参数等
### reflection 反射
- getClass getName getSimpleName
- Field
  - getName getType
  - getField get set
  - getDeclaredField getDeclaredFields setAccessible
- Method
  - getMethod invoke
  - getDeclaredMethod setAccessible invoke

## Enum 枚举
- 枚举是有固定个数实例的类，其父类是`Enum`
- 枚举的实例对象必须在类的第一行开始定义
- 构造方法必须是私有的`private`，默认不修饰也是`private`
- 其他跟普通类类似，也可以有成员变量、成员方法等
- 使用`values()`获取所有的枚举，使用`valueOf()`获取指定名称的枚举，使用`==`比较枚举
```java
public enum Category {
  // 开始的地方必须是以这种形式创建所有的枚举对象
  FOOD(1),
  COOK(2),
  SNACK(3),
  CLOTHES(4),
  ELECTRIC(5);

  private int id;

  // 构造方法必须是 private, 不写默认也是 private
  Category(int id) {
    this.id = id;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  @Override
  public String toString() {
    return "Category{" +
            "id=" + id +
            '}';
  }
}

public class UseEnum {
  public static void main(String[] args) {
    // values 获取所有枚举
    for (Category category : Category.values()) {
      System.out.println("------" + category.getId() + "------");
      System.out.println("ordinal: " + category.ordinal());
      System.out.println("name: " + category.name());
      System.out.println(category.toString());
    }

    // valueOf 根据名字获取枚举
    System.out.println(Category.valueOf("FOOD"));
    // 直接通过名字获取枚举
    System.out.println(Category.FOOD);

    System.out.println("请输入枚举的名称:");
    Scanner scanner = new Scanner(System.in);
    String categoryName1 = scanner.nextLine();
    Category category1 = Category.valueOf(categoryName1.trim().toUpperCase());
    System.out.println("枚举信息: " + category1);

    System.out.println("请输入要比较的枚举的名称");
    String categoryName2 = scanner.next();
    Category category2 = Category.valueOf(categoryName2.trim().toUpperCase());
    System.out.println("第2次的枚举信息: " + category2.toString());

    // 枚举的比较
    System.out.println(category1 == category2);
  }
}
```

## interface 接口
- 接口里的变量都是默认且只能用`public static final`修饰，这三个修饰符可以省略
- 接口里的方法默认是用`public abstract`修饰，这两个修饰符可以省略。(抽象)方法有名字、参数和返回值，没有方法体，以分号结束
- 接口不可以继承类，接口可以用`extends`继承多个接口，继承的接口可以有重复的方法，但是签名相同时返回值必须完全一样，否则会有编译错误
- 通过`extends`或`implements`的对象都可通过`instanceof`进行检测
- 接口甚至可以没有任何方法的定义，只是规定一种类型
- 接口注释最好写一下
### default
- 接口中缺省的实现方法用`default`(Java 8)修饰，有方法体
- 接口中可以有私有方法(Java 9)，不需要用`default`修饰，接口里的私有方法，可以认为是代码直接插入到使用的地方
- 实现有缺省方法的接口后，面对每个缺省的方法，一个类可以有三个选择：
  - 1. 默认继承，相当于把这部分代码拷贝到了当前类中
  - 2. 覆盖，重新实现
  - 3. 重新声明此方法为`abstract`，相当于把这部分代码拒之门外，由于有`abstract`方法，所以类必须是抽象类
:::tip
### 接口中的`this`
接口中的方法（包括缺省方法）有`this`自引用，但是只能调用接口（包括继承的接口）里的方法。
因为能`new`出实例来的，肯定是实现了所有方法的，`this`自引用就是指向那个对象，所以使用起来不会有问题。
:::
### 接口与类的区别
- 接口不能使用`new`创建实例
- 一个类可以`implements`实现多个接口，但是只能`extends`继承一个父类
- 类可以有成员变量，而接口不可以有成员变量（接口中定义的变量都是静态变量，不是实例级别的），接口只能有缺省方法
- 一个类实现一个接口，接口可以为实现类带来更多的行为（通过 Java 8 中新支持的 `default` 方法），但是无法带来更多的实例状态（也就是成员变量）

## 抽象类
- 抽象类用`abstract`修饰，抽象类可以继承别的类或者抽象类，也可以实现接口
- 抽象类可以有抽象方法(也可以甚至没有抽象方法)，抽象方法可以自己定义，也可以来自实现的接口
- 抽象类不可以被实例化，抽象类里构造方法的语法和类一样

## 内部类
### 静态内部类
- 静态内部类，是在类中使用`static`修饰的类，和静态方法、静态变量一样都是类的静态组成部分
- 静态内部类也是类，在继承、实现接口方面都是一样的
- 静态内部类，可以有访问控制符
- 静态内部类和静态方法一样**没有`this`自引用**
- 外部类可以访问静态内部类的`private`成员
- 静态内部类和静态方法一样没有`this`自引用，只能访问外部类的静态成员，但可以通过引用外部类的对象间接访问外部类的成员
:::tip
实现单例：
- JVM规范只是规定类在第一次使用之前就必须初始化好，实际情况下类都是在第一次使用时加载和初始化的，而且类的初始化只会执行一次。使用这个性质，可以把需要单例的类A的实例作为一个别的类B的静态变量，可以保证只有在通过B用到A的这个静态变量时候才会创建这个A的实例。也就完美的以最安全、最小代价、最简单可靠的代码，实现了单例模式。
- 无论是什么类，现代JVM都是在用到的时候才会初始化，配合JVM初始化类的特点，内部类可以实现一种安全的单例模式。Math类中就是使用这种方式创建的Random对象。
:::

### 成员内部类
- 成员内部类，是在类中直接定义的类，和成员方法、成员变量一样都是类的组成部分
- 成员内部类，**不可以包含任何静态的成分**（除了可以有`final static`的基本数据类型变量），比如静态方法、静态变量、静态内部类，否则会造成内外部类初始化问题。
- 成员内部类，可以有访问控制符
- 外部类可以访问成员内部类的`private`成员
- 成员内部类可以访问外部类成员：成员内部类中有一个外部类的引用，其访问外部类的对象的成员就是使用这个引用，完整写法是：`类名.this.属性/方法`(具体见 PhoneExpire.java `return PhoneExpire.this.memoryG;`)
- 如果是在内部类的宿主类的外部创建内部类的对象，那么需要指定这个引用是谁，完整写法是：`类引用.new 类名`(具体见 UseInterface.java `PhoneExpire.Memory memory = phoneExpire.new Memory("CHINESE");`)

### 局部内部类
- 局部内部类，是在类的方法（成员方法/构造方法）中直接定义的类，和成员方法、成员变量一样都是类的组成部分
- 局部内部类的特性**类似于类的方法中的局部变量**
- 局部内部类，**不可以包含任何静态的成分**（除了可以有`final static`的基本数据类型变量），比如静态方法、静态变量、静态内部类，否则会造成内外部类初始化问题。
- 局部内部类，**不可以有访问控制符**
- 局部内部类可以访问外部类成员：局部内部类中有一个外部类的引用，其访问外部类的对象的成员就是使用这个引用，完整写法是：`类名.this.属性/方法`
- 局部内部类还**可以访问方法的参数和局部变量，但都必须是实际`final`的**（参数和局部变量都只能被赋值一次，能被`final`修饰）

## 匿名类
- 匿名类的语法是`new`后面跟一个接口或者抽象类
- 匿名类可以放在任何可以使用`new`创建对象的地方
  - 在类的直接内部时，对标 **成员内部类** 和 **静态内部类**
  - 在类的方法内部时，对标 **局部内部类**
- 匿名类可以简单快速地创建一个接口或者抽象类的实例
:::tip
实际用的比较多的是匿名类和静态内部类（为了单例），成员内部类和局部内部类用的比较少。

静态内部类可以用来实现接口，但是这个实现仅供自己内部使用。比如说，如果一个Map的value是一种叫做 Item 的接口，那么某个类可能使用一个自己的静态内部类实现这个接口，然后创建instance放到map里

静态内部类可以实现单例模式，这个属于“取巧”，和语法本身无关，和 JVM 初始化 class 有关。

静态内部类可以创建一些自己内部使用的数据结构，例如在 JDK 的 java.util.HashMap 源代码里面用到了静态内部类封装数据

成员内部类和静态内部类一样，如果需要跟外部类的成员变量互相操作，就可以考虑使用成员内部类

局部内部类呢，说实话确实用的比较少。可能有时候调用一些方法，方法的参数是某个接口（没错又是接口），没办法就弄一个局部内部类实现一下接口，然后调用方法。但是这个时候呢，其实用匿名类更方便，所以局部内部类很尬

匿名类也一样，就是为了实现接口，创建线程的Runnable接口实现的时候会用到很多
:::

## 非公有类
- 最不特殊的类，可以认为就是被缺省访问控制符修饰的类，和`public class`的区别仅仅是可以被访问的范围不一样
- 如果一个文件只有非公有类，那么类名和文件名可以不一样，当然文件后缀必须是 java

```java
// PhoneExpire.java
public class PhoneExpire extends AbstractExpireDateMerchandise {
    private String brand;
    private String os;
    private double screenSize;
    private double cpuHz;
    private int memoryG;
    private int storageG;
    private static int MAX_BUY_ONE_ORDER = 5;
    private CPU cpu;
    private Memory memory;
    private UnitSpec cpuInner;
    private UnitSpec memoryInner;

    // >> TODO 静态内部类，是在类中使用static修饰的类
    // >> TODO 静态内部类和静态方法、静态变量一样，都是类的静态组成部分
    // >> TODO 静态内部类，可以有访问控制符
    // >> TODO 静态内部类也是类，在继承、实现接口方面都是一样的。以后我们讲的类，不特殊说明，在这方面都是一样的
    public static class CPU {
        private double speed;
        private String producer;

        public CPU(double speed, String producer) {
            this.speed = speed;
            this.producer = producer;
        }

        public double getSpeed() {
            // >> TODO 静态内部类，代码和这个类本身的访问权限一样，可以访问外部（Phone）的private成员
            // >> TODO 静态内部类是静态的，就好像静态方法一样，没有this自引用，所以不能通过this访问private成员，但可以通过引用访问Phone对象的private成员
            PhoneExpire phoneExpire = new PhoneExpire();
            phoneExpire.memoryG = 99;
            return speed;
        }

        public void setSpeed(double speed) {
            this.speed = speed;
        }

        public String getProducer() {
            return producer;
        }

        public void setProducer(String producer) {
            this.producer = producer;
        }

        @Override
        public String toString() {
            return "CPU{" +
                    "speed=" + getSpeed() +
                    ", producer='" + producer + '\'' +
                    '}';
        }

        // >> TODO 静态内部类，里面可以有任意合法的类的组成部分，包括静态内部类
        public static class ABC {
        }
    }

    public void accessStaticInnerClass() {
        // >> TODO 外部类可以访问静态内部类（CPU）的private成员
        this.cpu.producer = "China";
    }

    // >> TODO 成员内部类，是在类中直接定义类
    // >> TODO 成员内部类，不可以包含任何静态的成分（除了final static的基本数据类型变量），比如静态方法、静态变量、静态内部类，否则会造成内外部类初始化问题。
    // >> TODO 成员内部类，可以有访问控制符。成员内部类和成员方法，成员变量一样，都是类的组成部分
    public class Memory {
        // >> TODO 可以有final static的基本数据类型变量
        final static int size = 999;
        private String producer;

        public Memory(String producer) {
            this.producer = producer;
        }

        public double getMemoryG() {
            // >> TODO 成员内部类访问外部类：成员内部类中有一个外部类的引用，其访问外部类的对象的成员就是使用这个引用，完整写法是：类名.this.属性/方法
            return PhoneExpire.this.memoryG;
        }

        public String getProducer() {
            return producer;
        }

        public void setProducer(String producer) {
            this.producer = producer;
        }

        @Override
        public String toString() {
            return "Memory{" +
                    "memoryG=" + getMemoryG() +
                    "producer='" + producer + '\'' +
                    '}';
        }

        // >> TODO 成员内部类，里面可以有任意合法的类的组成部分，包括成员内部类，但是不可以有静态内部类
        public class ABC {
            public String test() {
                return "Test";
            }
        }
    }

    public void accessInnerClass() {
        // >> TODO 外部类可以访问成员内部类（Memory）的private成员
        this.memory.producer = "Chinese";
    }

    // >> TODO 接口也可以定义为静态内部接口，但是一般不这么做。接口的目的是为了让更多人实现，所以一般会是单独一个文件作为公共接口
    public static interface UnitSpec {
        public double getNumSpec();

        public String getProducer();
    }

    public PhoneExpire(
            String id, String name, int count, double purchasePrice, double soldPrice,
            String brand, String os, double screenSize, double cpuHz, int memoryG, int storageG,
            Date produceDate, Date expirationDate
    ) {
        super(id, name, count, purchasePrice, soldPrice, produceDate, expirationDate);
        init(brand, os, screenSize, cpuHz, memoryG, storageG);

        double localCPUHZ = cpuHz;
        // localCPUHZ = Math.random();
        // 局部内部类
        class CPUInner implements UnitSpec {
            // >> TODO 可以有final static的基本数据类型变量
            final static int abc = 123;
            private String producer;

            public CPUInner(String producer) {
                this.producer = producer;
            }

            @Override
            public double getNumSpec() {
                // >> TODO 局部内部类，代码和这个类本身的访问权限一样，可以访问外部（PhoneExpire）的private属性
                // >> TODO 局部内部类中有一个外部类的引用
                // >> TODO 局部内部类访问外部类的对象的成员属性的完整写法如下，类名.this.属性/方法
                // >> TODO 以上都和成员内部类一样。除此之外，局部内部类还可以访问参数和局部变量，但是它俩必须是实际final的
                return Math.max(PhoneExpire.this.cpuHz, localCPUHZ);
            }

            @Override
            public String getProducer() {
                return producer;
            }

            public void setProducer(String producer) {
                this.producer = producer;
            }

            @Override
            public String toString() {
                return "CPUInner{" +
                        "speed=" + getNumSpec() +
                        "producer='" + producer + '\'' +
                        '}';
            }

            // >> TODO 局部内部类，就好像局部变量一样，方法内部的东西出了代码就不可被访问，
            // >> TODO 所以可以再定义类，但是不能有访问控制符也不能是static，就好像成员变量没有访问控制符没有static一样，但是可以有final
            // >> TODO 记忆要点：和局部变量一样
            final class ABC {
                public void test() {}
            }
        }

        class MemoryInner implements UnitSpec {
            private String producer;

            public MemoryInner(String producer) {
                this.producer = producer;
            }

            @Override
            public double getNumSpec() {
                return memoryG;
            }

            @Override
            public String getProducer() {
                return producer;
            }

            public void setProducer(String producer) {
                this.producer = producer;
            }

            @Override
            public String toString() {
                return "MemoryInner{" +
                        "storage=" + getNumSpec() +
                        "producer='" + producer + '\'' +
                        '}';
            }
        }

        // >> TODO 可以像平常的类一样使用局部内部类
        this.cpuInner = new CPUInner("Default CPU");
        this.memoryInner = new MemoryInner("Default Memory");
    }

    public PhoneExpire() {
        // super("000", "Unknown Phone", 0, 0, 0);
        super("000", "Unknown Phone", 0, 0, new Date(), new Date());
        init("Unknown", "Unknown", 0, 0, 0, 0);
    }

    public void init(String brand, String os, double screenSize, double cpuHz, int memoryG, int storageG) {
        this.brand = brand;
        this.os = os;
        this.screenSize = screenSize;
        this.cpuHz = cpuHz;
        this.memoryG = memoryG;
        this.storageG = storageG;

        // >> TODO 可以像平常的类一样使用静态内部类
        this.cpu = new CPU(cpuHz, "Default");
        // >> TODO 可以像平常的类一样使用成员内部类
        this.memory = new Memory("Default");
    }

    @Override
    public double actualValueNow(double leftDatePercentage) {
        return getSoldPrice() * (leftDatePercentage + 0.5);
    }

    // override
    public void describe() {
        System.out.println("======此手机商品属性如下======");
        super.describe();
        System.out.println(
                "Phone:: 手机厂商为" + brand + "；系统为" + os + "；硬件配置如下：\n" +
                        "屏幕" + screenSize + "寸; " +
                        "cpu主频" + cpuHz + "GHz; " +
                        "内存" + memoryG + "Gb; " +
                        "存储空间" + storageG + "Gb; " +
                        "CPU: " + cpu +
                        " ;Memory: " + memory +
                        " ;CPUInner:" + cpuInner +
                        " ;MemoryInner:" + memoryInner
        );
    }

    public double buy(int count) {
        if (count > MAX_BUY_ONE_ORDER) {
            System.out.println("购买失败，手机一次最多只能买" + MAX_BUY_ONE_ORDER + "个");
            return -2;
        }
        return super.buy(count);
    }

    public String getName() {
        return this.brand + "-" + os + "-" + super.getName();
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getOs() {
        return os;
    }

    public void setOs(String os) {
        this.os = os;
    }

    public double getScreenSize() {
        return screenSize;
    }

    public void setScreenSize(double screenSize) {
        this.screenSize = screenSize;
    }

    public double getCpuHz() {
        return cpuHz;
    }

    public void setCpuHz(double cpuHz) {
        this.cpuHz = cpuHz;
    }

    public int getMemoryG() {
        return memoryG;
    }

    public void setMemoryG(int memoryG) {
        this.memoryG = memoryG;
    }

    public int getStorageG() {
        return storageG;
    }

    public void setStorageG(int storageG) {
        this.storageG = storageG;
    }
}



// >> TODO 非共有类和静态内部类的实际区别就在于能否访问类的private成员。非共有类不能访问private成员，静态内部类可以访问private成员
class Memory {
    private long capacity;
    private String producer;

    public Memory(long capacity, String producer) {
        this.capacity = capacity;
        this.producer = producer;
    }

    public long getCapacity() {
        return capacity;
    }

    public void setCapacity(long capacity) {
        this.capacity = capacity;
    }

    public String getProducer() {
        return producer;
    }

    public void setProducer(String producer) {
        this.producer = producer;
    }

    public void test() {
        // >> TODO 在类的外面的代码，不能访问类的private成员
        // PhoneExpire phoneExpire = null;
        // phoneExpire.screenSize = 7;
    }
}

```

```java
// UseInterface.java
public class UseInterface {
  public static void main(String[] args) {
    Date produceDate = new Date();
    Date expirationDate = new Date(produceDate.getTime() + 365L * 24 * 60 * 60 * 1000);

    PhoneExpire phoneExpire = new PhoneExpire("Phone001", "手机001", 150, 2099, 2499, "HuaWei", "Android", 6.6, 3.1, 4, 64, produceDate, expirationDate);
    phoneExpire.describe();

    System.out.println();
    // >> TODO 静态内部类，可以认为是和静态方法、静态成员一样，是类的一个类内部的一个成员，一个组成部分。
    // >> TODO 所以使用的时候，也可以点出来，只是点出来的是个类而已。点出来以后，该怎么用一个类都行
    PhoneExpire.CPU cpu = new PhoneExpire.CPU(3.3, "CHINA");
    cpu.setProducer("CHINA");
    System.out.println(cpu);

    System.out.println();
    // >> TODO 我们说过，成员内部类里有一个外部类对象的引用。
    // >> TODO 如果是在类内部的成员方法/构造方法创建这个内部类对象，比如Memory，那么这个引用就是this自引用，也就是当前执行方法的对象
    // >> TODO 如果是在成员外部创建内部类的对象，那么就需要指定这个引用是谁，语法如下，有点奇怪，用的比较少
    PhoneExpire.Memory memory = phoneExpire.new Memory("CHINESE");
    System.out.println(memory);
  }
}
```


# 异常
异常也是 Java 中的类，`Throwable`是所有异常的父类
## 异常分类
### 按照异常的继承关系分类
- `Error`
- `Exception`
### 按照处理方式分类
- checked exception: 语法要求必须要用 `try catch` 或者 `throws` 语句处理的异常
- unchecked exception: 语法不要求一定要用 `try catch` 或者 `throws` 语句处理的异常
:::tip
`Error` 和 `RuntimeException` 是 unchecked exception 的父类，我们一般使用 `RuntimeException`(`Exception`是`RuntimeException`的父类)。
:::


# Collection 类
`Collection` 代表一堆元素，中文一般翻译为集合
## List
List 代表有顺序的一组元素，中文一般翻译为链表
## Set
Set 代表一个元素不重复的集合
### HashSet
`HashSet`是使用了元素的 hash 值帮助做去重的，是 Java 中 Set 的最常用的实现类


# 泛型
- 在方法中定义泛型，即 Generic Methods
- 在类型中定义泛型，即 Generic Types。类型可以是类，也可以是接口
- 编译期类型检查、类型擦除（类型擦除指运行时无法获取范型信息。范型仅仅是能用在编译期对引用类型进行类型检查，运行的时候范型信息就被擦除了）
- 赋值时强制类型转换（Java 编译器会在生成的字节码里帮我们加上强制类型转换的语句，省去我们自己写强制类型转换）

## 有界类型
泛型类型不可以调用方法，因为不知道是什么类型，如果需要使用某个类的方法，则需要给定类型的范围
## 协变逆变
Java 泛型对协变和逆变的支持是为了支持范围更广的参数类型
- 协变和逆变是针对引用类型而言的，可以用在返回值类型、参数类型等引用类型上。创建对象的时候不能使用协变和逆变
- 读取用协变，写入用逆变
  - 如果想从一个数据类型里获取数据，使用 ? extends 协变通配符
  - 如果想把对象写入一个数据结构里，使用 ? super 逆变通配符
  - 如果既想存又想取，那就别用通配符
  - Effective Java 里总结出过一个简单的抛弃这些概念的规则：producer-extends, consumer-super（PECS），想让List作为生产者提供数据就用extends，想让List作为消费者放入数据就用super。
:::tip
[范型引用的通配符](https://github.com/geektime-geekbang/LetsJava/blob/master/FAQ/04%E7%AB%A0-%E8%8C%83%E5%9E%8B%E5%BC%95%E7%94%A8%E7%9A%84%E9%80%9A%E9%85%8D%E7%AC%A6%E5%86%8D%E8%A7%A3.md)

```java
// Java 自带的 Collections 类里的 copy 方法，从 src 复制到 desc
// dest 是目标 list，src 是源 list
public static <T> void copy(List<? super T> dest, List<? extends T> src) {
  ...
}
```

producer-extends，consumer-super（PECS）。也就是说，如果一个list（泛指使用泛型的地方，下同）是生产者，程序需要从里面取数据，就应该用extends，比如这里的src。如果一个list是消费者，需要往里面放数据，是消费者，就应该用super，比如这里的dest。

为什么呢？生产者，生产出来的数据应该有更丰富的类型信息，也就是说应该是某个类型（T）或者其子类行，这样读出来才能放心大胆的把它当作T类型使用。所以`List<? extends T>` src的意思是说，读吧，里面的对象要么是T，要么是T的子类，extends嘛。

消费者，规定类型的上界，只要是T或者T的父类，都应该允许写入。如果是规定下界，比如`? extends T`，那么会是什么类型呢？可以是T的任意子类型，那还怎么写入，比如X是T的子类，那么这个list代表的可能就是`List<X>`，写入的时候，如果你只知道这个list里是T的子类，但是不知是哪个子类，写入什么T的子类都有可能出错。
:::
:::warning
使用泛型协变的引用不允许其增加元素
:::


# 自动装箱 自动拆箱
从 Java 第一个版本开始就为每种基本数据类型提供了和其封装类之间的转换功能，以便可以将其当作类而非基本数据类型使用。
比如 List Map 这些类都是操作的 Object，无法操作基本数据类型。
从基本数据类型到封装类，我们叫做自动封箱，英文叫做 auto boxing；反之叫做自动拆箱，英文叫做 auto unboxing
## 数字相关
- 和数字相关的基本数据类型对应的类依次为：`Byte Short Integer Long Float Double`
### Number类
- 所有和数字相关的封装类都继承自Number类
```java
int a = 99;
// 可以使用数字创建一个Integer类
Integer i1 = new Integer(a);
Integer i2 = new Integer("789");
int b = Integer.valueOf(a);
int c = Integer.parseInt("987");

Integer d = 987; // 自动封箱
int e = d; // 自动拆箱

// 自动封箱为Integer，作为Map中的key
Map<Integer, String> int2Str = new HashMap<>();
int2Str.put(1, "壹");
int2Str.put(2, "贰");
int2Str.put(3, "叁");
System.out.println(int2Str.get(1));
// 自动拆箱为int，并给key赋值
for (int key : int2Str.keySet()) {
  System.out.println(key);
}

System.out.println(Integer.toBinaryString(-1024));
System.out.println(Integer.toOctalString(-1024));
System.out.println(Integer.toHexString(-1024));

Number num = 9;
num = new Integer(12345);
Number numD = 9.99;
numD = new Double(12.30294);
// 使用Number类可以方便的进行数字类型的转换
System.out.println("使用number将double转为long：" + numD.longValue());
```

## Character
`char` 对应的类为 `Character`
- 里面有很多 is*** 方法比较实用，比如判断字符是否为数字 `Character.isDigit('0'))`
## Boolean
`boolean` 对应的类为 `Boolean` 
- 布尔值因为只有两个值所以 `Boolean` 类直接提供了这两个值的静态变量：`Boolean.TRUE` 、`Boolean.FALSE`
- 只有不分大小写的 true 才是 `true`，剩下的字符串都是 `false`
  ```java
  System.out.println(Boolean.valueOf(true)); // true
  System.out.println(Boolean.valueOf("true")); // true
  System.out.println(Boolean.valueOf(" true")); // false
  System.out.println(Boolean.valueOf("false")); // false
  System.out.println(Boolean.valueOf("abc")); // false
  ```

## File
- 文件是操作系统对磁盘上数据的组织形式。文件包括文件路径和文件名，文件后缀是文件名的一部分。
- Java 里文件和文件夹都是用 `File` 类表示的
- 文件不一定要有后缀，但是一定要有文件路径和文件名，后缀是为了让操作系统更好的分辨文件的类型，以便对文件进行正确的操作
- 所有的文件，不管是什么后缀名，都是一堆在磁盘上的二进制数据。这些二进制数据需要被正确的解析，文件才能被正确的使用。比如 pptx 文件也可以用文本编辑器打开它，但是文本编辑器并不能正确的解析它。
- 压缩文件其实也只是一个文件，它通过内部的组织，将很多文件的数据以及目录结构信息，压缩到一个文件的内容中

## IO
IO 也可以写做 I/O (Input/Output 的缩写)，也就是输入输出，是指不同系统之间的数据输入输出，比如读写文件数据，读写网络数据等

Java 中有三代 IO 框架：
- 第一代的流式阻塞 IO （Blocking IO）
- 第二代的非阻塞 NIO （New IO）
- 第三代 NIO2（有些地方叫做AIO，即async IO），又进一步支持了异步 IO

### IO 中的类和接口
- InputStream/OutputStream: 输入输出**字节**，是最基础的接口
- Reader/Writer: 增加将 **字节** 编码为 **字符** 的功能，只输入输出字符
- 输入输出是站在程序的角度说的
  - 程序从外部设备读取数据，就是输入、input、reader
  - 程序写入数据到外部设备，就是输出、output、writer

#### InputStream
<!-- ![InputStream](/IO-InputStream.jpg) -->
<img :src="$withBase('/IO-InputStream.jpg')" alt="InputStream">
#### OutputStream
<!-- ![OutputStream](/IO-OutputStream.jpg) -->
<img :src="$withBase('/IO-OutputStream.jpg')" alt="OutputStream">
#### Reader
<!-- ![Reader](/IO-Reader.jpg) -->
<img :src="$withBase('/IO-Reader.jpg')" alt="Reader">
#### Writer
<!-- ![Writer](/IO-Writer.jpg) -->
<img :src="$withBase('/IO-Writer.jpg')" alt="Writer">

:::tip
`System.out.println()`是如何输出到控制台的？可以看看 System 类里是怎么给 out 赋值的

简单来说，这个和操作系统有点关系。不管是什么操作系统（主流的），不管是什么程序，程序和操作系统之间都有一个交流的渠道，就是标准输入输出。具体到 Java 程序，Java 将这个标准输入输出抽象成了 `System.in` 和 `System.out` 。

怎么设置的呢？ java.lang.System 的源代码里有一个 `initializeSystemClass` 方法，里面有个 `setOut0(newPrintStream(fdOut, props.getProperty("sun.stdout.encoding")));`，这个就是给 out 赋值的

`fdOut` 来自 `FileOutputStream fdOut = new FileOutputStream(FileDescriptor.out);`

`FileDescriptor.out` 来自 `public static final FileDescriptor out = standardStream(1);`

`standardStream` 就是程序和操作系统对接标准输入输出的地方，0代表标准输入，1代表标准输出，2代表错误输出
:::

```java
public class WriteFileAppMain {
    public static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) throws IOException {
        File file = createFile();
        writeToFile(file);
    }

    private static File createFile() throws IOException {
        System.out.println("准备创建文件，请输入文件名：");
        String fileName = scanner.nextLine().trim();
        String path = "." + File.separator;
//        File file = new File(path, fileName + ".txt");
        File file = new File(path + fileName + ".txt");
        System.out.println(file);
        if (file.exists() && file.isFile()) {
            System.out.println("目标文件已存在");
//            boolean deleteStatus = file.delete();
//            System.out.println("删除已有文件：" + deleteStatus);
        } else {
            boolean createStatus = file.createNewFile();
            System.out.println("创建文件 " + file.toString() + " : " + createStatus);
        }
        return file;
    }

    private static void writeToFile(File targetFile) {
        // TODO try with resource，帮我们搞定close
        try (
                // TODO 创建一个 outputstream，建立一个从文件到程序的 byte 数据传输流
                FileOutputStream fileOutputStream = new FileOutputStream(targetFile);
                // TODO 建立一个可以消费 inputstream 的 writer，并指定字符集，这样就可以一个个的写入字符了
                OutputStreamWriter outputStreamWriter = new OutputStreamWriter(fileOutputStream, StandardCharsets.UTF_8);
                // TODO 使用 PrintWriter，可以方便的写入一行字符
                PrintWriter printWriter = new PrintWriter(outputStreamWriter);
        ) {
            while (true) {
                // TODO 猜猜System.out是个啥？
                System.out.println("输入的内容会实时写入文件，如果输入空行则结束");
                String string = scanner.nextLine().trim();
                if (string.trim().isEmpty()) {
                    System.out.println("输入结束");
                    break;
                }
                printWriter.println(string);
                printWriter.flush();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

```java
public class ReadFileAppMain {
    // TODO 猜猜 System.in是个啥，其实和output那边的套路是一样的，System.in只能读取标准的输入里的byte
    // TODO 而Scanner可以将这个byte读取出来，转换成String，进而转换成不同的数据类型，比如int，boolean
    private static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) throws FileNotFoundException {
        System.out.println("请输入读取的文件名：");
        String fileName = scanner.nextLine().trim();
        File file = new File("." + File.separator + fileName + ".txt");
        if (!file.isFile()) {
            System.out.println("文件 " + file.toString() + " 不是文件或不存在！");
            return;
        }
        classicReadFile(file);
        lambdaReadFile(file);
    }

    private static void classicReadFile(File file) throws FileNotFoundException {
        System.out.println("---------经典的处理方式-------------");
        try (
                // TODO 建立从文件到程序的数据输入（input）流
                FileInputStream fileInputStream = new FileInputStream(file);
                // TODO 用 InputStreamReader 将这个byte 流套一下，装饰一下，并指定字符编码，让它能够将读出的byte转为字符
                InputStreamReader inputStreamReader = new InputStreamReader(fileInputStream, StandardCharsets.UTF_8);
                // TODO 增加缓存功能，输入输出效率更高，并且可以一次读取一行
                BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
        ) {
            String line = null;
            while ((line = bufferedReader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void lambdaReadFile(File file) throws FileNotFoundException {
        System.out.println("---------lambda 的处理方式-------------");
        try (
                BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(new FileInputStream(file), StandardCharsets.UTF_8));
        ) {
            bufferedReader.lines().map(String::trim).map(String::toUpperCase).forEach(System.out::println);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
```


# Thread
一个程序就是操作系统的一个 `Process` 进程，一个进程下可以有很多 `Thread` 线程
## daemon thread
有些线程就是为了为程序做一些清理或者辅助工作的，最原始的就是 JVM 里的执行 `finalize` 方法的线程。只要从业务逻辑上来说，不应该在没有别的工作线程运行的情况下继续运行的线程就应该是守护线程，比如心跳检查

:::tip
- `Thread` 线程也是一个对象，执行完毕 `Runnable` 接口里的 `run` 方法，线程就结束了
- 如果一个进程里没有线程，或者线程都是守护线程(daemon thread)，那么进程就结束了
- 整个 Java 进程里只要有一个非守护线程在运行，守护线程就不会退出
:::

## interrupt
线程的 `interrupt` 无法真的像这个方法的名字那样让线程中断
:::warning
线程的 `stop` 方法可以让线程结束，但是这会带来很大的隐患，会造成程序状态的错误，比如锁没有释放等。不要在生产的代码里调用这个方法
:::

## 多线程
### 同步控制之 synchronized
- 用 `synchronized` 关键字来修饰成员方法，代表这个方法对于同一个对象来说，同一时间只允许一个线程执行，别的线程如果也调用这个实例的这个方法，就需要等待已经在执行这个方法的线程执行完毕，才能进入方法执行
- 用 `synchronized` 修饰静态方法
- 用 `synchronized` 代码块
### 同步控制之 wait notify
来自 `Object` 类里的方法，当多个线程的互动，需要等待和被唤醒的时候，就可以考虑使用这个语法。

`wait` 方法必须在进入相应对象的 `synchronized` 块中才能调用，执行 `wait` 方法之后自动失去对象的 `monitor`，也就是说别的线程可以进入这个对象的 `synchronized` 代码块了。被唤醒的线程（已经执行过 `wait` 方法）会首先获取之前失去的 `monitor`，然后开始向下执行。

:::warning
如果执行 `notify` 的时候，线程还没有进入 `wait` 状态，那么 `notify` 是没有效果的。先 `notify` 后进入 `wait`，就是所谓的 **lost notification** 问题，可能造成线程无法进行。

注意：`synchronized` 不是**公平锁**
:::
### 线程同步之 join
:::warning
需要在 start 方法调用之后调用 Thread.join()
:::
### volatile
Java 内存模型 JMM（Java Memory Model），可以简单地认为是一套 *happens-before* 标准，规定了内存同步和缓存失效等节点， 限制了**指令重排**。

JMM 是 Java 的内涵之一。Java 字节码（Java Byte Code）使得 Java 在指令层面有了统一的标准。JMM 更让 Java 在执行优化层面也有了统一的标准，让各大厂商可以根据操作系统和硬件，在执行优化上放飞自我。

`volatile` 关键字的变量对指令重排的影响，`volatile` 关键字强制每次都从主存获取变量数据。
### ThreadLocal
线程专属的变量，`ThreadLocal` 的 `get()`/`set(value)` 最终会将 `ThreadLocal` 作为变量传给 `ThreadLocalMap`。`ThreadLocalMap` 里处理 hash 冲突的机制不是像 `HashMap` 一样使用 `List`，它采用的是另一种经典的处理方式，沿着冲突的索引向后查找空闲的位置。

### concurrent
`concurrent` 包的起源是由 Doug Lea 博士开发的。 Doug Lea 博士先是提供了一个独立于 JDK 的 `concurrent` 包，后来主导了 JSR 166，将这个软件包纳入到了 JDK 1.5 中。

JSR（Java Specification Requests）是 Java 演进的标准，每个 Java 版本的新功能都是以 JSR 的形式推进的。

`concurrent` 包基本原理：使用 CAS，避免内核调用。CAS（Compare And Swap）命令是现代 CPU 都支持的一种指令，这个指令对一个数据的写操作，需要三个操作数：**内存里的值的地址、旧的值、新的值**。只有当**内存里的值 == 旧的值**，内存里的值才会被设置为新的值。而且这个操作是**原子操作**，不会被 CPU 执行调度打断。

#### concurrent 包中的 Atomic 类族
