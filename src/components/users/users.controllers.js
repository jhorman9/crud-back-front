import User from "../../models/users.model.js";

const getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json( {error: error} )
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
    
        const user = await User.update(body, {
          where: { id: id } 
        });
    
        const usernotArray = user.toString();
        
        if (usernotArray === '0') {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    
        res.status(201).json({message: 'Actualizado exitosamente', user: body, column_affected: user});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.destroy({ where: { id } });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}