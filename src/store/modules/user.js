import { login, logout, getInfoList } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { getPermissionFromUserRole } from '@/utils/index'

const user = {
  state: {
    token: getToken(),
    name: '',
    role: '',
    userInfo: '',
    rolePermissions: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_ROLE: (state, role) => {
      state.role = role
    },
    SET_ROLE_PERMISSIONS: (state, rolePermissions) => {
      state.rolePermissions = rolePermissions
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password)
          .then(response => {
            const data = response.data
            setToken(data.token)
            commit('SET_TOKEN', data.token)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfoList()
          .then(response => {
            const data = response.data
            console.log('权限数据', data)
            const { resources, profile } = data
            const [routes, children] = [[], []]

            resources.forEach(el => {
              if (el.parentId === 0) {
                routes.push(el)
              } else {
                children.push(el)
              }
            })
            console.log('根权限1', routes)
            console.log('子权限', children)
            routes.forEach(item => {
              item.children = []
              children.forEach(el => {
                if (el.parentId === item.id) {
                  item.children.push(el)
                }
              })
            })
            console.log('根权限2', routes)

            // 权限处理
            const permissions = []
            routes.forEach(item => {
              if (item.openFlag === 0) {
                const { id, name, children } = item
                const child = []
                children.forEach(el => {
                  if (el.openFlag === 0) {
                    const { id, name } = el
                    child.push({ key: id, value: name })
                  }
                })
                permissions.push({ key: id, value: name, children: child })
              }
            })

            console.log('根权限3', permissions)

            const { nickName, realName } = profile
            const userInfo = { ...profile, role: { nickName, realName, permissions }}

            console.log('提取用户数据', userInfo)

            // 处理 root
            commit('SET_NAME', profile.realName)
            commit('SET_ROLE', profile.nickName)

            // 处理权限
            commit('SET_ROLE_PERMISSIONS', getPermissionFromUserRole(userInfo.role))

            commit('SET_USER_INFO', userInfo)

            resolve(userInfo)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLE', '')
            commit('SET_SET_USER_INFO', '')
            commit('SET_ROLE_PERMISSIONS', [])
            removeToken()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLE', '')
        commit('SET_SET_USER_INFO', '')
        commit('SET_ROLE_PERMISSIONS', [])
        removeToken()
        resolve()
      })
    }
  }
}

export default user
