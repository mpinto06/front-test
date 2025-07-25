"use client";

import { useEffect, useState } from "react";
import MessageList from "../components/MessageList";
import DateSelector from "@/components/DateSelector";
import { DateSelectorOption, Message } from "@/types";
import { filterMessagesByDate } from "../utils/filterMessagesByDate";
import styles from "./page.module.css";

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [dateOption, setDateOption] = useState<DateSelectorOption>('today');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/messages");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch messages");
        }
        const data: Message[] = await response.json();
        
        setMessages(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // if (loading) {
  //   return <div>Loading messages...</div>;
  // }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.mainContainer}>
      <DateSelector selected={dateOption} onChange={setDateOption}/>
      <MessageList loading={loading} messages={filterMessagesByDate(messages, dateOption)} />
    </div>
  );
};

export default Home;

