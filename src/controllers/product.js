import {
  getAllProducts,
  getProductbyTitle,
  getAllroles,
  getAllpermissions,
  insertrole_permission,
  getpermissionsbyroleid,
} from "../services/product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching products." });
  }
};

export const getRoles = async (req, res) => {
  try {
    const roles = await getAllroles();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: "An error occured while fetching roles." });
  }
};
export const getPermissions = async (req, res) => {
  try {
    const permissions = await getAllpermissions();
    res.json(permissions);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occured while fetching permissions." });
  }
};

export const role_permission= async(req,res)=>{
  try{
    const { roleId, permissionIds } = req.body;
    const updatedRole = await insertrole_permission(roleId,permissionIds);
    res.json(updatedRole)
  }catch(err){res.status(500).json({error:"An error occured while add role permissions"})}
}
export const getProduct = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }

  try {
    const products = await getProductbyTitle(q);
    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching products." });
  }
};

export const getallpermrole = async(req,res)=>{
//  const { id } = req.params.roleId;
  const roleId = parseInt(req.params.roleId, 10);

  try {
    //const roleid = parseInt(id);
    console.log("role id ", roleId);
    if (isNaN(roleId)) {
      res.status(400).json({ error: "Invalid role id" });
    }
    const permissions = await getpermissionsbyroleid(roleId)
  
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("error", error);
  }
};