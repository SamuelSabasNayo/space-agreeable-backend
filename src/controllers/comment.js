import { Comment,User } from "../database/models";


export const CreateComment = async (req, res) => {
  try {
    const { requestId } = req.params;
    const comment = await Comment.create({
      userId: req.userData.id,
      requestId,
      comment:req.body.comment
    });
    res.status(201).json({
      comment,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

export const GetComment = async (req, res) => {

    const { requestId } = req.params;
    const comments = await Comment.findAll({
      where: { requestId }, include:[
        {
          model:User,
          as: 'author',
          attributes:[
            'firstname','lastname','email','id'
          ]
        }
      ]
    });
        
        res.status(200).json({
        comments,
      });

    return res.status(404).send('Request with the specified ID does not exists');
  
};
