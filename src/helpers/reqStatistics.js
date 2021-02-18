/* eslint-disable require-jsdoc */
import moment from 'moment';

export default class reqStatistics {
  static async filterRequests(time, existingRequest) {
    const today = new Date();

    today.setDate(today.getDate() - time);

    const desiredtime = today,
      year = desiredtime.getFullYear(),
      month = desiredtime.getMonth() + 1,
      date = desiredtime.getDate(),

      desiredDay = `${year}-${month}-${date}`,

      allRequests = existingRequest.filter((item) => (item ? (moment(`${(item.createdAt).toDateString()}`).isSameOrAfter(desiredDay)) : false));
    if (allRequests) return allRequests;
  }
}
