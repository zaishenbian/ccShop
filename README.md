# ccShop

xss需要考虑（xss包）

后端代码目录结构

	  ├── package.json 
	  ├── config.js # 配置文件
	  ├── server  # 后端代码目录
	  │   ├── app.js # 后端服务入口文件
	  │   ├── codes/ # 提示语代码目录
	  │   ├── controllers/    # 操作层目录，实现接口返回数据
	  │   ├── models/ # 数据模型model层目录，执行数据的操作
	  │   ├── routers/ # 路由目录，控制路由
	  │   ├── services/   # 业务层目录，实现models层到controllers层的封装耦合
	  │   ├── utils/  # 工具类目录
	  └── static # 静态文件目录