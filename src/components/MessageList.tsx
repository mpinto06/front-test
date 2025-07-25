import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./MessageList.module.css";
import { Message } from "../types";
import empty from "../assets/empty-box.svg";
import { formatTimestamp } from "@/utils/formatTimeStamp";
import check from "../assets/check.svg";
import checkSeen from "../assets/check-seen.svg";



interface MessageListProps {
  messages: Message[];
  loading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, loading }) => {
  const scrollableRef = useRef<HTMLDivElement>(null);
  
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = useCallback(() => {
    const element = scrollableRef.current;

    if (element instanceof HTMLDivElement) {
      const scrollTop = element.scrollTop;
      setScrollTop(scrollTop);
    }
  }, []); 

  useEffect(() => {
    const element = scrollableRef.current;

    if (element) {
      element.addEventListener('scroll', handleScroll);

      return () => {
        element.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  return (
    <div ref={scrollableRef} onScroll={handleScroll} className={styles.mainContainer}>
      {scrollTop > 0 && 
        <div className={styles.scrollTop} onClick={() => scrollableRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}>Scroll to Top</div>
      } 
      
      {messages.length === 0 && loading &&
        <div className={styles.emptyContainer}>
          <div className={styles.loader}></div>
          <div>Loading</div>
        </div>
      }
      {messages.length === 0 && !loading &&
        <div className={styles.emptyContainer}>
          <img src={empty.src}  width={100}/>
          <div>No messages</div>
        </div>
      }
      {messages.length > 0 &&
        <div className={styles.messageList}>
          {messages.map((msg, index) => (
            <div key={index} className={`${styles.message} ${msg.bot_sender ? styles.botMessage : ""}`}>
              <div  className={styles.messageContent}  >
                {msg.message_text}
              </div>
              <div className={styles.timestamp}>
                <div>
                  {formatTimestamp(msg.message_date)}
                </div>
                {!msg.bot_sender && !msg.read_by_business &&
                  <img src={check.src} width={10} height={10} />
                }

                {!msg.bot_sender && msg.read_by_business &&
                  <img src={checkSeen.src} width={10} height={10} />
                } 
                
                </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default MessageList;