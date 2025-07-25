# Setup

Follow the next steps: 

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/mpinto06/front-test.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd front-test
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```

**Prerequisite:** Ensure you have Node.js version **18.17 or later** installed.


# Assumptions

```typescript
export interface Message {
  bot_sender: boolean;
  business_id: number;
  business_social_id: number;
  customer: number;
  is_deleted: boolean;
  message_date: string;
  message_text: string;
  platform: string;
  read_by_business: boolean;
  read_by_customer: boolean;
  sent_by_customer: boolean;
}
```
From this model, i just assumed that if **bot_sender** was true, the message was from the ai bot from the business, and if it's false, it's a message from a customer. I also used the field **read_by_business** to indicate the user that a real human from the businsess (not an ai bot) read the message. 

I also assumed the 'This Week' means previous yesterday. 
That's why in the code i set the following switch case condition: 
```typescript
case "thisWeek":
      return messages.filter(msg =>
        moment(msg.message_date).isSame(now, "week") &&
        !moment(msg.message_date).isSame(now, "day") &&
        !moment(msg.message_date).isSame(now.clone().subtract(1, "day"), "day")
      );
```

# Technical Decisions
I decided to build the project with three main components, **MessageList**, **DateSelector** and **Page**. 

The **Page** is in charge of calling the API and rendering the **MessageList** and **DateSelector** components. It also filters the messages based on the **DateSelector** current value. 

The **DateSelector** takes a default value as a parameter and emits a value everytime it changes. 

The **MessageList** takes the messages as an input and it also handles the cases when the API is still loading or there are no messages to show. 

I consider that it was a good idea to separate the components in this way, to keep both the logic and the UI/UX separated. 

For css, i followed the CSS Modules approach to ensure that all class names and animation names in a CSS file are scoped locally by default. 
Also, I didn't use Tailwind because I find that while it's simpler for small projects, it can become unreadable as projects grow in complexity.

# Limitations

The data from the API was insufficient to test all the 4 cases for the date groups (Only earlier dates was tested with the given API). I hardcoded myself some objects in my code to test the other cases. 