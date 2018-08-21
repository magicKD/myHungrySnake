



# [实现绝对定位元素水平垂直居中的两种方法](https://www.cnblogs.com/sapho/p/5787381.html)

平时,用的方法即第一种方法是设置left,top值均为50%,同时margin-left设置为绝对定位元素width的一半取负,margin-top设为其height的一半取负。

例如，绝对定位元素的width:100px;height:100px;

代码如下:

```
position:absolute;
left:50%;
top:50%;
margin-left:-50px;
margin-top:-50px;
```

这是比较常用的一个方法，今天介绍一个巧妙的方法，是利用了绝对定位元素的自动伸缩的特性实现的。

代码如下：

```
position:absolute;
left: 0;
right: 0;
top: 0;
bottom: 0;
margin:auto;
```

上面就是第二种方法：设置margin:auto;设置left和right的值相等,top和bottom的值相等,
注意：left和right的值不能超过其相对元素width减去它自身width的一半,否则绝对定位元素会优先取left值进行定位(前提是文档流是从左向右),但是top和bottom的值却没有这个限制。