import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import roleService from '../services/role';

config();

export default {
  superAdminAuth: async (req, res, next) => {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(403).json({ message: 'Please login first!' });
    }

    const token = header.split(' ')[1];
    const admin = await jwt.decode(token, process.env.JWT_KEY, { expiresIn: '10h' });

    if (!admin) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = admin;
    const { roleId } = admin;

    if (roleId === null) {
      return res.status(401).json({ message: 'Only super administrator can perform this action!' });
    }
    const userRole = await roleService.findRoleById(roleId);
    if (userRole.name === 'SUPER_ADMIN') return next();

    return res.status(401).json({ message: 'Only super administrator can perform this action!' });
  }
};
