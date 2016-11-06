单页面网站([4bin.cn](http://4bin.cn))
========================================

## 0、目录

1. [网站简介](#user-content-head1)
2. [功能设计](#user-content-head2)
3. [数据库设计](#user-content-head3)
4. [设计规范](#user-content-head4)
5. [服务端](#user-content-head5)
6. [展示页](#user-content-head6)
7. [控制台](#user-content-head7)
8. [构建](#user-content-head8)
9. [提升](#user-content-head9)

## 1、网站简介<h4 id="head1"></h4>
4bin,.cn是一个个人网站，也是一个分享网站，站主会分享时下最热门、最好看的美、英连续剧，以及一些好听的民谣音乐。网站使用 JavaScript + PHP + mysql 搭建，部署在[阿里云](https://www.aliyun.com)平台的虚拟空间上。现在仍在开发中，许多新功能仍在陆续添加....    
关键词: 无刷新，单页面，后台数据管理，瀑布流布局，动态数据加载，响应式设计，数据可视化(未)     
兼容：ie10+，chrome37+，firfox16+，android chrome      

## 2、功能设计<h4 id="head2"></h4>
主要实现以下功能：   
个人信息展示，静态页面。     
分享展示功能，采用不同的数据源，维护频次高的数据从数据库加载；维护频次低的数据，从json文件中加载；几乎不需要维护的数据，使用静态页面。能够对分类、筛选需要展示的数据。    
后台管理功能，实现数据包括图片的增、删、改、查。         
数据展示功能（未实现），可视化显示访问量、ip地址等网站数据，以及可视化观剧数量、观影时间等分享数据。        
留言板（未实现）           
日志（未实现）             

## 3、数据库设计<h4 id="head3"></h4>
数据库使用Mysql，表格关系通过代码逻辑实现。                 

## 4、设计规范<h4 id="head4"></h4>          
### 4.1 字体样式          
H1 24px Light           
H2 18px Regular          
H3 16px Regular         
H4 14px Regular          
P 12px Regular  

### 4.2 字体透明度
强调 87%     提示 54%     注释33%

### 4.3 阴影 
无偏移   宽度10px   扩散10px 
     
### 4.4 配色
主页   
背景色: #F5EBD6  
强调色1: #CB7665  
强调色2: #3CA0B4  

控制台
背景色: #CCCCCC  
强调色: #009688  

## 5、服务端<h4 id="head5"></h4>   
服务端使用PHP+Mysql实现，所有前端请求统一受理，发送的数据全部编码为json格式。服务端只负责数据存取和处理，不负责任何前端页面的展示工作。/lib路径下存放通用函数，/core路径下存放业务代码，include.php负责引入头文件。

## 6、展示页<h4 id="head6"></h4>  
展示页配合成熟插件实现无刷新导航，瀑布流布局，动态加载等技术。向服务器请求数据，并将获取的数据美美地展示出来。 
###插件使用  
导航菜单：[jquery-mmenu](http://mmenu.frebsite.nl/)    
瀑布流布局：[masonry](http://masonry.desandro.com/)    
灯箱：[magnific-popup](http://dimsemenov.com/plugins/magnific-popup/)    
图片加载：[imagesloaded](http://imagesloaded.desandro.com/)  
手势库：[hammerjs](http://hammerjs.github.io/)  

## 7、控制台<h4 id="head7"></h4>  
控制台配合成熟插件实现无刷新导航，用户验证等功能。负责数据的增、删、改、添。
###插件使用    
导航菜单：[jquery-mmenu](http://mmenu.frebsite.nl/)   
灯箱：[magnific-popup](http://dimsemenov.com/plugins/magnific-popup/)    
手势库：[hammerjs](http://hammerjs.github.io/)   
UI库：[jquery-ui](http://jqueryui.com/)    
Cookie：[cookies.js](https://github.com/franciscop/cookies.js)  
表格插件：[datatables](https://datatables.net/)  
tags输入：[tagsinput](http://jquery-plugins.net/bootstrap-tags-input)  
上传插件：[fine-uploader](http://fineuploader.com/)

## 8、构建<h4 id="head8"></h4>  
构建工具使用Gulp+Bower+Yeoman的组合。js、html、css等文件正常构建，php文件则直接复制。主页和控制台两个页面在统一gulp配置文件中配置。

## 9、提升<h4 id="head9"></h4>  
网站仍有需要不足的地方，有些因水平不够认识不到，有些因能力不足暂时先搁置，有些已经纳入到改善计划内。  
需要提升的地方  
1. 安全性：拼接sql语句，提交的数据未转码，表单未添加token，账号密码明文存储，使用管理员账号连接数据库、登录验证无验证码...  
2. 兼容性：css不兼容ie8及更早浏览器，masonry不兼容魅族浏览器，滚动不兼容android UC浏览器  
3. 外链提示：音乐分享使用了网易云外链，加载失败会弹出alert窗口    
4. 删除数据：删除关系数据不完善  
5. 测试：无ui测试和单元测试  
6. 图片：整体展示时图片所需分辨率不高，不需要加载原图  
7. 图片优化：有些图片尺寸较大，应该使用优化方案  
8. css风格：命名不规范，属性顺序不规范，缺少注释，适合改用sass或less  
9. json：前后端交换json的格式不够统一  
10. error：错误处理机制不完善  
11. 不符合用户习惯，功能不实用
12. 不合适SEO优化
13. 其它  
