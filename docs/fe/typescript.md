# TypeScript
- [Github](https://github.com/microsoft/TypeScript)
- [官网](https://www.typescriptlang.org/)
- [中文官网](https://www.typescriptlang.org/zh/)

## 重学TS
- [github](https://github.com/semlinker/awesome-typescript)
- [《重学TS 1.0 系列教程》](https://mp.weixin.qq.com/s/y6C4R04mpvBmyV80p5WOug)
- [《重学TS 2.0 练习题（36道）》](https://github.com/semlinker/awesome-typescript/issues)
- [【前端必备】轻松学 TypeScript](https://space.bilibili.com/406258607/channel/collectiondetail?sid=334301)

## type 与 interface
- type 类型别名，可以用来给类型起一个新的名字，当命名基本类型或联合类型等非对象类型时，非常有用。在 TypeScript 1.6 版本，类型别名开始支持泛型。
- interface 接口只能用于定义对象类型，定义接口时可以声明对象类型上的属性和方法。

### 相同点：
- 类型别名和接口都可以用来描述对象或函数
```ts
type Point1 = {
  x: number;
  y: number;
}
interface Point2 {
  x: number;
  y: number;
}

type SetPoint1 = (x: number, y: number) => void;
interface SetPoint2 {
  (x: number, y: number): void;
}
const setPoint1: SetPoint1 = function (a: number, b: number) {}
const setPoint2: SetPoint2 = function (c: number, d: number) {}
```

- 类型别名(`&`)和接口(`extends`)都支持扩展
```ts
// 类型别名通过 & 来扩展类型别名或接口
// 接口通过 extends 来扩展接口或类型别名
type Animal1 = {
  name: string;
}
interface Animal2 {
  name: string;
}

// 类型别名通过 & 来扩展类型别名定义的类型
type Bear_type1 = Animal1 & {
  honey: boolean;
}
// 接口通过 extends 来扩展已定义的接口类型
interface Bear_interface1 extends Animal2 {
  honey: boolean;
}
const bear_type1: Bear_type1 = {
  name: 'bear_type1',
  honey: false
}
const bear_interface1: Bear_interface1 = {
  name: 'bear_interface1',
  honey: true,
}

// 类型别名通过 & 来扩展已定义的接口类型
type Bear_type2 = Animal2 & {
  honey: boolean;
}
// interface 通过 extends 来扩展类型别名定义的类型
interface Bear_interface2 extends Animal1 {
  honey: boolean;
}
```

### 不同点
- 类型别名可以为基本类型、联合类型或元组类型定义别名，而接口不行
- 同名接口会自动合并，而类型别名不会
```ts
// 利用同名接口自动合并的特性，可自由扩展第三方库的接口，从而给使用者提供更好的安全保障
declare module 'webext-bridge' {
  export interface ProtocolMap {
    foo: { title: string }
  }
}

import { onMessage } from 'webext-bridge'
onMessage('foo', ({ data }) => {
  // type of `data` will be `{ title: string }`
  console.log(data.title)
})
```

## 泛型
- T(Type): 表示类型
- K(Key): 表示对象中的键的类型
- V(Value): 表示对象中的值的类型
- E(Element): 表示元素类型

## Union Types
联合类型

```ts
type NumOrStr = number | string;
```

## Intersection Types
交叉运算符的特性：
- 唯一性：`A & A` 等价于 `A`
- 满足交换律：`A & B` 等价于 `B & A`
- 满足结合律：`(A & B) & C` 等价于 `A & (B & C)`
- 父类型收敛：如果`B`是`A`的父类型，则`A & B`将被收敛成`A`

### 非对象类型交叉运算
```ts
type N1 = number & string; // never
type N2 = number & 1; // 1 父类型收敛
type N3 = false & boolean; // false 父类型收敛

// 除了 never 类型之外，任何类型与 any 类型进行交叉运算的结果都是 any 类型
type N4 = any & 1; // any
type N5 = any & '2'; // any
type N6 = any & false; // any
type N7 = any & undefined; // any
type N8 = any & null; // any
type N9 = any & unknown; // any
type N20 = any & never; // never

const n: N1 = 1; // 报错
```
### 对象类型交叉运算
```ts
interface Point {
  x: number;
  y: number;
}
interface Named {
  name: string;
}

type NamedPoint = Point & Named; // { x: number; y: number; name: string; }

const named_point: NamedPoint = {
  x: 1,
  y: 2,
  name: '3'
}
```
```ts
interface X {
  c: string;
  d: string;
}
interface Y {
  c: number;
  e: string;
}

// c = string & number = never
type XY = X & Y; // { c: never; d: string; e: string; }
type YX = Y & X; // { c: never; d: string; e: string; }

const xy: XY = {
  c: 0, // 报错
  d: '1',
  e: '2'
}


/**
 * 在对多个对象类型进行交叉运算时，
 * 若存在相同的属性，且属性类型是对象类型，
 * 那么属性会按照对应的规则进行合并
 */
interface OA { a: string; }
interface OB { b: number; }
interface OC { c: boolean; }

interface OA1 { x: OA; }
interface OB1 { x: OB; }
interface OC1 { x: OC; }

type OABC = OA1 & OB1 & OC1; // { x: { a: string; b: number; c: boolean; }}

const abc: OABC = {
  x: {
    a: '1',
    b: 2,
    c: false
  }
}
```

```ts
/**
 * 注意：在对对象类型进行交叉运算的时候，
 * 如果对象中相同的属性被认为是可辨识的属性,
 * 即属性的类型是字面量类型或字面量类型组成的联合类型，
 * 那么最终的运算结果将是 never 类型
 */
type A = { kind: 'a', foo: string };
type B = { kind: 'b', foo: number };
type C = { kind: 'c', foo: number };

type AB = A & B; // never
type BC = B & C; // never

const ab: AB = { kind: 'ab', foo: 1 }; // 报错
const bc: BC = { kind: 'bc', foo: 1 }; // 报错
```

```ts
type Foo = {
  age: number;
  name: string;
}
type Bar1 = {
  age: number;
  name: string;
}
type Bar2 = {
  age: number;
  name: number;
}
type Bar3 = {
  age: number;
  name: boolean; // boolean 类型可认为是 true | false 字面量类型组成的联合类型
}
type Baz1 = Foo & Bar1; // { age: number; nama: string; }
type Baz2 = Foo & Bar2; // { age: number; name: never; }
type Baz3 = Foo & Bar3; // never
```

### 函数类型交叉运算
```ts
type F1 = (a: string, b: string) => void;
type F2 = (a: number, b: number) => void;
type Fn = F1 & F2; // (a: string | number, b: string | number) => void
const fn1: Fn = (a, b) => {};
// const fn1: F1 & F2 = (a: string | number, b: string | number) => {};
fn1('hello', 'world');
fn1(1, 2);
fn1('hello', 3); // 报错
```
```ts
type F3 = (a: string, b: string) => void;
type F4 = (a: number, b: number) => void;
type F5 = (a: string, b: number) => void;
const fn2: F3 & F4 & F5 = (a: string | number, b: string | number) => {};
fn2('hello', 'world');
fn2(1, 2);
fn2('hello', 3);
```


```ts
type User = {
  id: number;
  name: string;
  age: number;
  gender?: string;
  telphone?: string;
}

// 把对象类型中指定的 keys 变成可选
type PartialByKeys<T, K extends keyof T> = {
  [P in K]?: T[P];
} & Pick<T, Exclude<keyof T, K>>;

type Simplify<T> = {
  [P in keyof T]: T[P];
};

type U0 = PartialByKeys<User, 'id'>;
type U1 = Simplify<PartialByKeys<User, 'id'>>;
type U2 = Simplify<PartialByKeys<User, 'id' | 'age'>>;

// 把对象类型中指定的 keys 变成必填
type RequiredByKeys<T, K extends keyof T> = {
  [P in K]-?: T[P];
} & Pick<T, Exclude<keyof T, K>>;

type U3 = RequiredByKeys<User, 'gender'>;
type U4 = Simplify<U3>;
```

## Mapped Types
映射类型语法:
-  `{ [P in K]: T }`
-  `{ [P in K] ?: T }`
-  `{ [P in K] -?: T }`
-  `{ readonly [P in K]: T }`
-  `{ -readonly [P in K]: T }`
-  `{ readonly [P in K] ?: T }`
-  `{ -readonly [P in K] ?: T }`
-  `{ readonly [P in K] -?: T }`
-  `{ -readonly [P in K] -?: T }`
```ts
interface Person {
  name: string;
  age: number;
  location?: string;
}

type PartialKeys<T> = {
  [K in keyof T] ?: T[K];
}
type RequiredKeys<T> = {
  [K in keyof T] -?: T[K];
}
type ReadonlyKeys<T> = {
  readonly [K in keyof T]: T[K];
}

type PersonPartial1 = Partial<Person>;
type PersonPartial2 = PartialKeys<Person>;

type PersonRequired1 = Required<Person>;
type PersonRequired2 = RequiredKeys<Person>;

type PersonReadonly1 = Readonly<Person>;
type PersonReadonly2 = ReadonlyKeys<Person>;
```

## Key Remapping
```ts
// NewKeyType 的类型必须是 string | number | symbol 联合类型的子类型
type MappedTypeWithNewKeys<T> = {
  [K in keyof T as NewKeyType]: T[K];
}
```

```ts
// 键重映射时如果 as 子句返回 never 类型，该键将被剔除
type RemoveKindField<T> = {
  [K in keyof T as Exclude<K, 'kind'>]: T[K];
}
interface Circle {
  kind: 'circle';
  radius: number;
}
type KindlessCircle = RemoveKindField<Circle>;
```

```ts
// 键重映射 + 模板字面量类型
type Getters<T> = {
  // string & K: 过滤非 string 类型的键
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
}
type LazyPerson = Getters<Person>;
```

## Conditional Types
条件类型语法：`T extends U ? X : Y`，当类型 T 可以赋值给类型 U 时，返回类型 X，否则返回类型 Y
```ts
type Exclude<T, U> = T extends U ? never : T;

type Extract

type NonNullable

type Parameters

type ReturnType
```
```ts
type TypeName<T> =
  T extends string ? 'string' :
  T extends number ? 'number' :
  T extends boolean ? 'boolean' :
  T extends undefined ? 'undefined' :
  T extends Function ? 'function' :
  'object';
type T10 = TypeName<string>; // "string"
type T11 = TypeName<'hello'>; // "string"
type T12 = TypeName<() => string>; // "function"
type T13 = TypeName<string | (() => void)>; // "string" | "function"
type T14 = TypeName<string | string[] | undefined>; // "string" | "undefined" | "object"
```

#### Distributive conditional types
分布式条件类型：在条件类型（`T extends U ? X : Y`）中，如果被检查的类型 （`T`）是一个裸类型参数，即没有被元组(`[T]`)、数组（`T[]`）、Promise（`Promise<T>`）包装过，则该条件类型被称为分布式条件类型。

对于分布式条件类型，当传入的被检查类型是联合类型（`A | B | C extends U ? X : Y`）时，在运算过程中会被分解为多个分支（`(A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)`）。

```ts
type Naked<T> = T extends boolean ? 'Y' : 'N';
type WrappedTuple<T> = [T] extends [boolean] ? 'Y' : 'N';
type WrappedArray<T> = T[] extends boolean[] ? 'Y' : 'N';
type WrappedPromise<T> = Promise<T> extends Promise<boolean> ? 'Y' : 'N';

type T15 = Naked<number | boolean>; // "N" | "Y"
type T16 = WrappedTuple<number | boolean>; // "N"
type T17 = WrappedArray<number | boolean>; // "N"
type T18 = WrappedPromise<number | boolean>; // "N"
```
```ts
// 结合映射类型、条件类型
interface UserInfo {
  id: number;
  name: string;
  age?: number;
  updateName(newName: string): void;
}

type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

type T19 = FunctionPropertyNames<UserInfo>; // "updateName" | undefined
type T20 = FunctionProperties<UserInfo>; // { updateName: (newName: string) => void; }

type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

type T21 = NonFunctionPropertyNames<UserInfo>; // "name" | "id" | "age" | undefined
type T22 = NonFunctionProperties<UserInfo>;
```

## conditional type + infer
- 条件类型: 允许我们检测两种类型之间的关系，可以通过条件类型来判断类型是否相兼容
- `infer`: 用来声明类型变量，以存储在模式匹配过程中所捕获的类型。
:::warning
- `infer` 只能在条件类型的 `extends` 子句中使用
- `infer` 声明的类型变量只能在条件类型的 `true` 分支中使用
:::

```ts
// 获取数组类型中元素的类型
type UnpackedArray<T> = T extends (infer U)[] ? U : T;
type T0 = string[];
type U0 = UnpackedArray<T0>; // string

// 获取函数的返回值类型
type UnpackedFn<T> = T extends (...args: any[]) => infer U ? U : T;
type T1 = () => number;
type U1 = UnpackedFn<T1>; // number

// 如果遇到函数重载的情况，TypeScript 将使用最后一个调用签名进行类型推断
declare function foo(x: string): number;
declare function foo(x: number): string;
declare function foo(x: string | number): string | number;
type U2 = UnpackedFn<typeof foo>; // string | number
```

```ts
// 条件类型条件链 + infer
type Unpacked<T> =
  T extends (infer U)[] ? U :
  T extends (...args: any[]) => infer U ? U :
  T extends Promise<infer U> ? U :
  T;
type U3 = Unpacked<string>; // string
type U4 = Unpacked<number[]>; // number
type U5 = Unpacked<() => string>; // string
type U6 = Unpacked<Promise<boolean>>; // boolean
type U7 = Unpacked<Promise<string>[]>; // Promise<string>
type U8 = Unpacked<Unpacked<Promise<string>[]>>; // string
```

```ts
// 使用 infer 推断对象类型的值的类型
interface UserData {
  id: number;
  name: string;
  age: number;
  a(x: string): void;
  b: (x: string) => void;
  c(y: number): void;
}
// 1. 当使用 infer 声明多个类型变量时，若类型匹配，则会按顺序返回，如下面返回元组
type PropertyType1<T> = T extends { id: infer U, name: infer R } ? [U, R] : T;
type UserDataType1 = PropertyType1<UserData>; // [number, string]

// 2. 当只声明一个类型变量，却用在多个地方时：
// 2.1 在协变位置上，同一个类型变量存在多个候选者，则最终会推断为联合类型
type PropertyType2<T> = T extends { id: infer U, name: infer U } ? U : T;
type PropertyType3<T> = T extends { id: infer U, age: infer U } ? U : T;
type UserDataType2 = PropertyType2<UserData>; // string | number
type UserDataType3 = PropertyType3<UserData>; // number
// 2.2 在逆变位置上，同一个类型变量存在多个候选者，则最终会推断为交叉类型
type PropertyType4<T> = T extends { a: (x: infer U) => void; b: (y: infer U) => void; } ? U : T;
type PropertyType5<T> = T extends { a: (x: infer U) => void; c: (z: infer U) => void; } ? U : T;
type UserDataType4 = PropertyType4<UserData>; // string (string & string)
type UserDataType5 = PropertyType5<UserData>; // never (string & number)
```

```ts
// 联合类型转交叉类型
type UnionToIntersection<U> = (
  U extends any ? (arg: U) => void : never
) extends (arg: infer R) => void
  ? R
  : never;

type T1a = UnionToIntersection<number | string> // never (number & string)

type T2a = {a:'a'} | {b: 'b'}
type T3a = UnionToIntersection<T2a> // { a: 'a'; } & { b: 'b'; }
// U extends any ? (arg: U) => void : never 结果为
type U2a = ((arg: {a: 'a'}) => void) |  ((arg: {b: 'b'}) => void)
```

## Omit
使用 `Omit` 工具类型，可以很方便地过滤掉对象类型中不需要的属性

```ts
// Pick 实现
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
}
// Omit 实现
type MyOmit1<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
type MyOmit2<T, K extends keyof any> = {
  [P in Exclude<keyof T, K>]: T[P];
}
type MyOmit3<T, K extends keyof any> = {
  [P in keyof T as P extends K ? never : P]: T[P];
}

type User = {
  id: number;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
type MyUser0 = Pick<User, 'id' | 'name'>; // { id: number; name:strign; }
type MyUser1 = MyPick<User, 'id' | 'name'>; // { id: number; name:strign; }
type MyUser2 = Omit<User, 'id' | 'createdAt' | 'updatedAt'>; // { name: string; password: string; }
type MyUser3 = MyOmit1<User, 'id' | 'createdAt' | 'updatedAt'>; // { name: string; password: string; }
type MyUser4 = MyOmit2<User, 'id' | 'createdAt' | 'updatedAt'>; // { name: string; password: string; }
type MyUser5 = MyOmit3<User, 'id' | 'createdAt' | 'updatedAt'>; // { name: string; password: string; }

const user1: MyUser1 = {
  id: 1,
  name: 'hello',
}
const user2: MyUser5 = {
  name: 'hello',
  password: 'world',
}
```

使用接口继承的方式覆盖已有对象类型中的已知属性的类型
```ts
type User = {
  id: number;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
interface UserUI extends Omit<User, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}
```

## Template Literal Types [4.1]
模板字面量类型：`${T}`，类型变量 T 的类型可以是 `string` `number` `boolean` `bigint`
```ts
// 使用模板字面量类型避免重复代码
type CssPadding1 = 
    | 'padding-top'
    | 'padding-right'
    | 'padding-bottom'
    | 'padding-left';
type CssMargin1 = 
    | 'margin-top'
    | 'margin-right'
    | 'margin-bottom'
    | 'margin-left';

type CssPadding2 = `padding-${Direction}`; // "padding-top" | "padding-right" | "padding-bottom" | "padding-left"
type CssMargin2 = `margin-${Direction}`; // "margin-top" | "margin-right" | "margin-bottom" | "margin-left"
```

```ts
// 模板字符串类型可以连接字符串字面量
type EventName<T extends string> = `${T}Changed`;
type Concat<S1 extends string, S2 extends string> = `${S1}-${S2}`;
// 还可以把非字符串的基本类型转换成对应的字符串字面量类型
type ToString<T extends string | number | boolean | bigint> = `${T}`;

type T0 = EventName<'foo'>; // "fooChanged"
type T1 = Concat<'Hello', 'World'>; // "Hello-World"
type T2 = ToString<'cicada' | 815 | true | -123n>; // "cicada" | "true" | "815" | "-123"
// 对于模板字面量类型来说，当类型占位符的实际类型是联合类型时，如果是单个占位符，单个占位符的联合类型自动展开
type T3 = EventName<'foo' | 'bar' | 'baz'>; // "fooChanged" | "barChanged" | "bazChanged"
// 对于模板字面量类型来说，当类型占位符的实际类型是联合类型时，如果是多个占位符，多个占位符的联合类型解析为叉积
type T4 = Concat<'top' | 'bottom', 'left' | 'right'>; // "top-left" | "top-right" | "bottom-left" | "bottom-right"
```

```ts
// 使用模板字面量类型过程中，可以使用用于处理字符串类型的内置工具类型，如：Uppercase Lowercase Capitalize Uncapitalize
type GetterName<T extends string> = `get${Capitalize<T>}`;
type Cases<T extends string> = `${Uppercase<T>} ${Lowercase<T>} ${Capitalize<T>} ${Uncapitalize<T>}`;

type T5 = GetterName<'foo'>; // "getFoo"
type T6 = Cases<'bar'>; // "BAR bar Bar bar"
```

```ts
// 结合条件类型和 infer 关键字实现类型推断
type Direction = 'top' | 'right' | 'bottom' | 'left';
type InferRoot<T> = T extends `${infer R}${Capitalize<Direction>}` ? R : T;

type T7 = InferRoot<'marginTop'>; // "margin"
type T8 = InferRoot<'paddingRight'>; // "padding"
```

```ts
// 结合键重映射，实现简单的工具类型，如为对象类型生成对应的 getter 类型
type Getters<T> = {
  // string & K: 过滤非 string 类型的键
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
}
type LazyPerson = Getters<Person>;
```

```ts
// 结合条件类型、条件链、infer 推断、递归类型，可以实现复杂的工具类型，如用于获取对象类型中任一层级属性的类型
type PropType<T, Path extends string> = string extends Path
  ? unknown
  : Path extends keyof T
    ? T[Path]
    : Path extends `${infer K}.${infer R}`
      ? K extends keyof T
        ? PropType<T[K], R>
        : unknown
      : unknown;

declare function getPropValue<T extends object, P extends string>(
  obj: T,
  path: P
): PropType<T, P>;

const obj = { a: {  b: { c: 'cicada', d: 666 } } }
const a = getPropValue(obj, 'a'); // { b: { c: string; d: number; } }
const ab = getPropValue(obj, 'a.b'); // { c: string; d: number; }
const abc = getPropValue(obj, 'a.b.c'); // string
const abd = getPropValue(obj, 'a.b.d'); // number
```

## declare
declare 可用来声明全局变量、全局函数、全局类、全局枚举
```ts
// weixin js-sdk
declare var wx = any;

// wx.d.ts
declare namespace wx {
  // export function chooseImage(params: { count: number; }): void;
}
```

```ts
// packages/vite/client.d.ts
declare module '*.css' {
  const css: string;
  export default css;
}
declare module '*.jpg' {
  const src: string;
  export default src;
}
declare module '*.ttf' {
  const src: string;
  export default src;
}

import css from './file.css';
import logo from './logo.jpg';
```

```ts
// 使用 declare module 扩展已有模块中定义的类型
// 比如为每个 vue 组件实例增加 $axios 属性
import { AxiosInstance } from 'axios';
declare module '@vue/runtime-core' {
  interface ComponentCustomPropertites {
    $axios: AxiosInstance;
  }
}

import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
const app = createApp(App);
app.config.globalPropertites.$axios = axios;
app.mount('#app');

import { getCurrentInstance, ComponentInternalInstance } from 'vue';
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
proxy!.$axios
  .get('https://jsonplaceholder.typicode.com/todos/1')
  .then((response) => response.data)
  .then((json) => console.log(json));
```

## infer
```ts
type FirstIsString<T> =
  T extends [infer S, ...unknown[]]
    ? S extends string
      ? S
      : never
    : never;

type S1 = FirstIsString<[string]>; // string
type S2 = FirstIsString<[string, number]>; // string
type S3 = FirstIsString<[number]>; // never
type S4 = FirstIsString<[number, string]>; // never
type S5 = FirstIsString<['hello', string]>; // "hello"
type S6 = FirstIsString<['hello' | 'world', boolean]>; // "hello" | "world"
```

```ts
// TypeScript 4.7 允许为 inter type 添加可选 extends 子句，用于指定类型变量的显示约束
type FirstIsString<T> =
  T extends [infer S extends string, ...unknown[]]
    ? S
    : never;
type S1 = FirstIsString<[string]>; // string
type S2 = FirstIsString<[string, number]>; // string
type S3 = FirstIsString<[number]>; // never
type S4 = FirstIsString<[number, string]>; // never
type S5 = FirstIsString<['hello', string]>; // "hello"
type S6 = FirstIsString<['hello' | 'world', boolean]>; // "hello" | "world"
```

## typeof
```ts
const user = {
  name: 'cicada',
  age: 18,
  address: {
    province: 'Shanghai',
    city: 'Pudong New Area'
  }
}
type Person = typeof user;
type Address = typeof user.address; // { province: string; city: string; }
```

```ts
enum HTTPMethod {
  Get,
  Post
}
const method: typeof HTTPMethod = {
  Get: 0,
  Post: 1
}
// 使用 keyof 和 typeof 操作符可以获取枚举类型的所有属性名
type Method = keyof typeof HTTPMethod; // "Get" | "Post"
```

```ts
// 使用 typeof 获取函数对象的类型
function add(a: number, b: number) {
  return a + b
}
type AddType = typeof add; // (a: number, b: number) => number
type AddReturnType = ReturnType<AddType>; // number
type AddParamsType = Parameters<AddType>; // [a: number, b: number]
```

```ts
class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
function createPoint(
  Constructor: typeof Point, // new (x: number, y: number) => Point
  x: number,
  y: number
) {
  return new Constructor(x, y);
}
```

### const assertions [3.4]
```ts
let requestMethod1 = 'Get';
let requestMethod2 = 'Get' as const;

type R0 = typeof requestMethod1; // string
type R1 = typeof requestMethod2; // "Get"


let user1 = {
  id: 1,
  name: 'cicada'
};
let user2 = {
  id: 1,
  name: 'cicada'
} as const;

type U0 = typeof user1; // { id: number; name: string; }
type U1 = typeof user2; // { readonly id: 1; readonly name: "cicada"; }
```
