/* eslint-disable no-underscore-dangle */
/* eslint-disable require-jsdoc */
import model from '../database/models';

const { Question } = model;

export default class questionController {
  // get all Questions
  static async getAllQuestions(req, res) {
    try {
      const allQuestions = await Question.findAll({});

      return res.status(200).json({ message: res.__('All questions found successfully!'), allQuestions });
    } catch (error) {
      return res.status(500).json({ error: res.__('Internal server error!') });
    }
  }

  // get one Question
  static async getOneQuestion(req, res) {
    try {
      const { id } = req.params,
        existingQuestion = await Question.findOne({ where: { id } });

      if (!existingQuestion) res.status(404).json({ message: res.__('Question Id does not exist!') });
      return res.status(200).json({ message: res.__('Question found successfully!'), existingQuestion });
    } catch (error) {
      return res.status(500).json({ error: res.__('Internal server error!') });
    }
  }

  // create a Question
  static async addQuestion(req, res) {
    try {
      const savedQuestion = await Question.create(req.body);

      res.status(201).json({ message: res.__('Question added successfully!'), savedQuestion });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error!' });
    }
  }

  // delete a Question
  static async deleteQuestion(req, res) {
    try {
      const { id } = req.params,
        { roleId } = req.userData,
        existingQuestion = await Question.findOne({ where: { id } });

      if (roleId !== 1) res.status(401).json({ message: 'Access denied!' });

      if (!existingQuestion) res.status(404).json({ message: res.__('Question Id does not exist!') });
      await Question.destroy({ where: { id } });

      res.status(200).json({ message: res.__('Question deleted successfully!') });
    } catch (error) {
      return res.status(500).json({ error: res.__('Internal server error!') });
    }
  }
}
