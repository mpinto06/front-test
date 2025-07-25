export interface Message {
  bot_sender: boolean;
  business_id: number;
  business_social_id: number;
  customer: number;
  is_deleted: boolean;
  message_date: string; // Or Date if you plan to convert it immediately
  message_text: string;
  platform: string;
  read_by_business: boolean;
  read_by_customer: boolean;
  sent_by_customer: boolean;
}

export type DateSelectorOption = "today" | "yesterday" | "thisWeek" | "previous";