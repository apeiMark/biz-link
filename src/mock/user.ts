import setupMock, { successResponseWrap } from '@/utils/setup-mock'
import Mock from 'mockjs'

import USER_SERVER_BASE_URL from '@/api/baseUrl'

setupMock({
  setup() {
    // Mock.XHR.prototype.withCredentials = true;
    const baseUrl = USER_SERVER_BASE_URL
    // // 用户信息
    // Mock.mock(new RegExp(`${baseUrl}/info`), () => {
    //   if (isLogin()) {
    //     const role = window.localStorage.getItem('userRole') || 'admin'
    //     return successResponseWrap({
    //       uid: '181703456786',
    //       nickName: 'apei',
    //       avatar: 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif',
    //       email: 'wangliqun@email.com',
    //       gender: 1,
    //       birthday: '2013-05-10',
    //       signature: '这个人很懒，什么都没有留下',
    //       mobile: '13576184616',
    //       createTime: '2013-05-10 12:10:00',
    //       role,
    //     })
    //   }
    //   return failResponseWrap(null, '未登录', 50008)
    // })

    // // 登录
    // Mock.mock(new RegExp('/api/user/login'), (params: MockParams) => {
    //   const { username, password } = JSON.parse(params.body)
    //   if (!username) {
    //     return failResponseWrap(null, '用户名不能为空', 50000)
    //   }
    //   if (!password) {
    //     return failResponseWrap(null, '密码不能为空', 50000)
    //   }
    //   if (username === '2120678565' && password === 'ljm2004930') {
    //     window.localStorage.setItem('userRole', 'admin')
    //     return successResponseWrap({
    //       token: 'ljm2004930',
    //     })
    //   }
    //   if (username === 'user' && password === 'user') {
    //     window.localStorage.setItem('userRole', 'user')
    //     return successResponseWrap({
    //       token: '12345',
    //     })
    //   }
    //   return failResponseWrap(null, '账号或者密码错误', 50000)
    // })

    // 登出
    Mock.mock(new RegExp('/api/user/logout'), () => {
      return successResponseWrap(null)
    })

    // 用户的服务端菜单
    Mock.mock(new RegExp('/api/user/menu'), () => {
      const menuList = [
        {
          path: '/dashboard',
          name: 'dashboard',
          meta: {
            locale: 'menu.server.dashboard',
            requiresAuth: true,
            icon: 'icon-dashboard',
            order: 1,
          },
          children: [
            {
              path: 'workplace',
              name: 'Workplace',
              meta: {
                locale: 'menu.server.workplace',
                requiresAuth: true,
              },
            },
            {
              path: 'https://arco.design',
              name: 'arcoWebsite',
              meta: {
                locale: 'menu.arcoWebsite',
                requiresAuth: true,
              },
            },
          ],
        },
      ]
      return successResponseWrap(menuList)
    })
  },
})
