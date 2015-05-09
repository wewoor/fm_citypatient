## 一个基于Nodejs + HTML5的FM网站

这个项目本来是为了之前一个同学的小站搭建的，不过这个网站我直接基于HTML5的Audio编写的，所以低版本的浏览器是无法使用的。当前页面还并未添加响应式的样式设计。

这个网站代码不多，除了服务端是Nodejs， 框架是sailsjs, 自定义Audio的控制代码，另外结合了一部分Angularjs, 和少量的Bootstarp, 感兴趣的朋友可以下载下来看看。

### 安装&使用
整个项目是基于Nodejs的，如果从Github上clone下来后，请记得运行：

``` 
npm install
```
确保依赖包安装完毕，如果没有Nodejs运行环境，请自行Google。另外ddl目录下有数据库初始化脚本，请记得先配置数据库，在config/connection.js文件中。

### 后台
后台登陆地址：

```
http://localhost:1337/user/ucenter
```
初始化账号密码：

```
root
123456
```
## License

MIT