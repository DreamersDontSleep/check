// 根据userInfo，获取子权限列表
export function getPermissionFromUserRole(role) {
  console.log('role', role)
  const permissions = new Set() // 防止重复

  if (role && role.permissions && role.permissions.length > 0) {
    const permissionsOrigin = role.permissions
    for (let i = 0; i < permissionsOrigin.length; i++) {
      const permissionsOriginThis = permissionsOrigin[i]
      // permissions.add(permissionsOrigin[i].key)
      if (
        permissionsOriginThis.children &&
        permissionsOriginThis.children.length > 0
      ) {
        const permissionsChildsThis = permissionsOriginThis.children

        for (let j = 0; j < permissionsChildsThis.length; j++) {
          permissions.add(permissionsChildsThis[j].key)
        }
      }
    }
  }

  console.log('权限id', [...permissions])

  return [...permissions] // Set -> Array
}
