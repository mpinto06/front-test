import moment from "moment";
import { Message } from "../types";
import { DateSelectorOption } from "../types";

export function filterMessagesByDate(
  messages: Message[],
  option: DateSelectorOption
): Message[] {
  const now = moment();

  switch (option) {
    case "today":
      return messages.filter(msg =>
        moment(msg.message_date).isSame(now, "day")
      );
    case "yesterday":
      return messages.filter(msg =>
        moment(msg.message_date).isSame(now.clone().subtract(1, "day"), "day")
      );
    case "thisWeek":
      return messages.filter(msg =>
        moment(msg.message_date).isSame(now, "week") &&
        !moment(msg.message_date).isSame(now, "day") &&
        !moment(msg.message_date).isSame(now.clone().subtract(1, "day"), "day")
      );
    case "previous":
      return messages.filter(msg =>
        !moment(msg.message_date).isSame(now, "week")
      );
    default:
      return messages;
  }
}
