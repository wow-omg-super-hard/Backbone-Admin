/**
 * 项目配置文件，数据请求的域名、端口、
 */

export default ({
  api: {
    host: HOST,
    port: PORT,
    pathname: '/api'
  },

  testMenuData: [
    {
       id: 1,
       title: '会员管理',
       pid: 0
    },
    {
       id: 2,
       title: '管理员管理',
       pid: 0
     },
    {
        id: 3,
        title: '会员列表',
        pid: 1,
        url: '/#members'
     },
     {
         id: 4,
         title: '会员删除',
         pid: 1,
         url: '/#delMembers'
     },
     {
         id: 5,
         title: '管理员列表',
         pid: 2,
         url: '/#admins'
      }
  ]
});
