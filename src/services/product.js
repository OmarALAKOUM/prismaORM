import { PrismaClient } from "../../generated/prisma/index.js";
const prisma = new PrismaClient();
export const getAllProducts = async () => {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const getAllroles = async () => {
  try {
    const roles = await prisma.role.findMany();
    return roles;
  } catch (roles) {
    console.error("Error fetching roles:", error);
  }
};

export const getAllpermissions = async () => {
  try {
    const permissions = await prisma.permission.findMany();
    return permissions;
  } catch (error) {
    console.error("Error fetching permissions:", error);
  }
};
export const insertrole_permission = async (roleId, permissionIds) => {
  try {
    const roleperm = await prisma.role.update({
      where: { id: roleId },
      data: {
        permissions: {
          set: permissionIds.map((id) => ({ id })),
          //disconnect, create, set, connect
        },
      },
    });
    return roleperm;
  } catch (error) {
    console.error("Error insert role permissions", error);
  }
};
export const getProductbyTitle = async (q) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        title: {
          contains: q,
        },
      },
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
export const getpermissionsbyroleOid = async (roleid) => {
  try {
    const permissions = await prisma.role.findMany({
      where: { roleid: roleid },
    });
    return permissions;
  } catch (error) {
    console.error("error fetching permissions by id", error);
  }
};
export const getpermissionsbyroleid = async (roleId) => {
  try {
    // const roleWithPermissions = await prisma.role.findUnique({
    //   where: { id: roleId },
    //   include: {
    //     permissions: true,
    //   },
    // });

    // return roleWithPermissions?.permissions || [];
    const result = await prisma.$queryRaw`
      SELECT 
        IF(rp.B IS NOT NULL, 1, 0) AS rpid, 
        p.id AS pid, 
        p.description AS pname
      FROM permissions p
      LEFT OUTER JOIN _permissiontorole rp ON rp.A = p.id and rp.B=${roleId}
      WHERE p.status = 1 order by p.description;
    `;

    return result;
  } catch (error) {
    console.error("Error fetching permissions by role ID:", error);
    throw error;
  }
};
