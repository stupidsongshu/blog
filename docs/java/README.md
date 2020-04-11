- [Linux权限管理之基本权限](http://www.imooc.com/learn/481)
- [Linux软件安装管理](http://www.imooc.com/learn/447)
- [Linux达人养成计划 I](http://www.imooc.com/learn/175)
- [Linux服务管理](http://www.imooc.com/learn/537)
- [用iptables搭建一套强大的安全防护盾](http://www.imooc.com/learn/389)
- [版本管理工具介绍—Git篇](http://www.imooc.com/learn/208)
- [JAVA遇见HTML——JSP篇](http://www.imooc.com/learn/166)
- [项目管理利器——maven](http://www.imooc.com/learn/443)
- [与MySQL的零距离接触](http://www.imooc.com/learn/122)

# Javadoc
- [Oracle 官方的 Javadoc 地址](https://docs.oracle.com/en/java/javase/11/docs/api/index.html)
## javadoc 命令文档
- [Windows](https://docs.oracle.com/en/java/javase/11/tools/javadoc.html)
- [Unix](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/javadoc.html)

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
- 枚举的实例对象必须在类的第一行开始定义
- 构造方法必须是私有的 private，默认不修饰也是 private
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

## 静态内部类
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

## 成员内部类
- 成员内部类，是在类中直接定义的类，和成员方法、成员变量一样都是类的组成部分
- 成员内部类，**不可以包含任何静态的成分**（除了可以有`final static`的基本数据类型变量），比如静态方法、静态变量、静态内部类，否则会造成内外部类初始化问题。
- 成员内部类，可以有访问控制符
- 外部类可以访问成员内部类的`private`成员
- 成员内部类可以访问外部类成员：成员内部类中有一个外部类的引用，其访问外部类的对象的成员就是使用这个引用，完整写法是：`类名.this.属性/方法`(具体见 PhoneExpire.java `return PhoneExpire.this.memoryG;`)
- 如果是在内部类的宿主类的外部创建内部类的对象，那么需要指定这个引用是谁，完整写法是：`类引用.new 类名`(具体见 UseInterface.java `PhoneExpire.Memory memory = phoneExpire.new Memory("CHINESE");`)

## 局部内部类
- 局部内部类，是在类的方法（成员方法/构造方法）中直接定义的类，和成员方法、成员变量一样都是类的组成部分
- 局部内部类的特性**类似于类的方法中的局部变量**
- 局部内部类，**不可以包含任何静态的成分**（除了可以有`final static`的基本数据类型变量），比如静态方法、静态变量、静态内部类，否则会造成内外部类初始化问题。
- 局部内部类，**不可以有访问控制符**
- 局部内部类可以访问外部类成员：局部内部类中有一个外部类的引用，其访问外部类的对象的成员就是使用这个引用，完整写法是：`类名.this.属性/方法`
- 局部内部类还**可以访问方法的参数和局部变量，但都必须是实际`final`的**（参数和局部变量都只能被赋值一次，能被`final`修饰）

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
