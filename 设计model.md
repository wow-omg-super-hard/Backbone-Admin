## model按照数据类型划分为基础model(后端返回的数据)、和前端交互model

### 会员管理  
* 基础Model
```json
[
  {
    "id": 1,
    "username": "13834220689",
    "usernick": "小明",
    "sex": 0,
    "email": "461111111@qq.com",
    "address": "北京海淀区",
    "create_time": "2017-01-01 11:11:42",
    "can_enabled": true
  },
  ...
]
```

* 前端交互(按页面模块)  

> 会员列表页

```json
  {
    "page": {
      "curr": 1,
      "size": 10,
      "total": 40
    },
    "start_time": "2017-01-01 11:11:42",
    "end_time": "2017-01-01 11:11:42",
    "search_username": "185", // 模糊查询
    "visible_add_dialog": false, // 显示添加对话框
    "visible_update_dialog": false, // 显示修改对话框,
    "add_vip_ids": [ 1 ], // 添加一组选中项id
  }
```

> 添加和修改会员

```json
  {
    "email": "461111111@qq.com",
    "usernick": "小花",
    "password": "dfsdfd",
    "confirm_password": "dfsdfd"  
  }
```

### 管理员管理
* 基础Model
```json
[
  {
    "id": 1,
    "username": "13834220689",
    "email": "461151111@qq.com",
    "role_names": [ "超级管理员", "文案人员" ],
    "create_time": "2017-01-01 11:11:42",
    "can_enabled": true
  }
]
```

* 前端交互

> 管理员列表

```json
{
  "page": {
    "curr": 1,
    "size": 10,
    "total": 40
  },
  "start_time": "2017-01-01 11:11:42",
  "end_time": "2017-01-01 11:11:42",
  "search_username": "185", // 模糊查询
  "visible_add_dialog": false,
  "visible_update_dialog": false,
  "add_vip_ids": [ 1 ], // 添加一组选中项id
}
```

> 添加和修改管理员

```json
{
  "username": "13834220689",
  "email": "461151111@qq.com",
  "role_name": [ "超级管理员", "文案人员" ],
  "password": "dfsdfd",
  "confirm_password": "dfsdfd"  
}
```
### 角色管理

* 基础Model
```json
[
  {
    "id": 1,
    "permissions_names": [ "用户管理", "用户删除" ],
    "des": "dfdsfsfdsfdsfds",
    "can_enabled": false
  }
]
```

* 前端交互

> 角色列表

```json
{
  "page": {
    "curr": 1,
    "size": 10,
    "total": 40
  },
  "start_time": "2017-01-01 11:11:42",
  "end_time": "2017-01-01 11:11:42",
  "search_username": "185", // 模糊查询
  "visible_add_dialog": false,
  "visible_update_dialog": false,
  "add_role_ids": [ 1 ], // 添加一组选中项id
}
```

> 添加和修改角色

```json
{
  "role_name": "角色名",
  "permissions_names": [ "用户修改", "用户改密" ],
  "des": "的范德萨范德萨"
}
```

### 权限管理

* 基础Model
```json
[
  {
    "id": 1,
    "rule": "admin/user/userlist",
    "name": "会员列表"
  }
]
```

* 前端交互

> 权限列表

```json
{
  "page": {
    "curr": 1,
    "size": 10,
    "total": 40
  },
  "search_name": "185", // 模糊查询权限名
  "visible_update_dialog": false,
  "add_permissions_ids": [ 1 ], // 添加一组选中项id
}
```
