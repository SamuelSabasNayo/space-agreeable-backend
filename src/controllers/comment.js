import model from "../database/models";

export const CreateComment = async (req, res) => {
  try {
    const request = await model.request.findOne({
      where: {
        id: req.params.requestId,
      },
    });
    if (request) {
      const userid = req.userData.id;
      const userData = await model.User.findOne({
        where: {
          id: userid,
        },
      });

      const comment = await model.Comment.create({
        userId: userData.id,
        requesterName: `${userData.firstname} ${userData.lastname}`,
        requestId: req.params.requestId,
        comment: req.body.comment,
      });
      return res.status(201).json({
        comment,
      });
    }
    return res.status(404).json({
      message: "request not found",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "comment cannot be null",
    });
  }
};

export const GetComment = async (req, res) => {
  
    const request = await model.request.findOne({
      where: {
        id: req.params.requestId,
      },
    });

    if (!request) {
      return res
        .status(404)
        .json({ message: `Request with the specified ID does not exists ` });
    }
    const comments = await model.Comment.findAll({
      where: { requestId: req.params.requestId, userId: req.userData.id },
      include: [
        {
          model: model.request,
          as: "request",
          attributes: [
            "id",
            "idUser",
            "idRoom",
            "dateStart",
            "dateEnd",
            "requestStatus",
            "idRoom",
          ],
        },
        {
          model: model.Reply,
          as:"Reply"
        }
        
      ],
    });
    res.status(200).json({
      comments,
    });
};
export const GetAllComment = async (req, res) => {
  
    const comments = await model.Comment.findAll();
    res.status(200).json({
      comments,
    });
 
};

export const ReplyComment = async (req, res) => {
  try {
    const request = await model.request.findOne({
      where: {
        id: req.params.requestId,
      },
    });

    if (!request) {
      return res
        .status(404)
        .json({ message: `Request with the specified ID does not exists ` });
    }
    const comment= await model.Comment.findOne({
      where: { id: req.params.id },
    });
    if (!comment) {
      
      return res
        .status(404)
        .json({ message: `comment with the specified ID does not exists ` });
    }

    const userid = req.userData.id;  
      const userData = await model.User.findOne({
        where: {
          id: userid,
          
        },
      });


    const reply =  await model.Reply.create(
      {
        userId:comment.userId,
        commentId:comment.id, 
        requesterName:comment.requesterName,
        replierName: `${userData.firstname} ${userData.lastname}`,
        replyContent: req.body.replyContent,
      }); 

    res.status(200).json({
      reply,
    });
  } catch (error) {
    res.status(404).json({message:error.message})
  }
};

export const DeleteComment = async(req, res) => {

  const comment = await model.Comment.destroy({
    where:{id: req.params.commentId}
  })

  if(!comment){
    return res.status(404).json({message:"comment not found such Id"})
  }
    return res.status(200).json({ message: res.__('Comment deleted successfully!') })
  
}
