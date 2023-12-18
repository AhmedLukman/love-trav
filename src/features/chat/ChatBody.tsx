import { Fragment, useEffect, useRef } from "react";

import { ChatBodyProps, User } from "../../lib/types";
import { useFetchConversation } from "./useFetchConversation";
import { useUser } from "../../hooks/useUser";

const ChatBody = ({ isOpen, setBotAvatar }: ChatBodyProps) => {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const {
    user: {
      user_metadata: { avatar, clientChatSlug },
    },
  } = useUser() as { user: User };
//Remove setBotAvatar
  const { conversations, isPending, error } = useFetchConversation({
    clientChatSlug: clientChatSlug,
    setBotAvatar,
  });

  //Refactor this
  useEffect(() => {
    // Scroll to the bottom when new messages arrive
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [conversations]);

  return (
    <div
      ref={chatContainerRef}
      className={`${
        isOpen ? `max-h-52 overflow-auto p-2` : "max-h-0 overflow-hidden"
      } scrollbar h-52 rounded-b bg-gray-100 transition-all duration-300 ${
        error && "bg-red-500"
      }`}
    >
      {/* Add skeleton on top of the image and displayed items instead of a loading text */}
      {isPending ? (
        <p className="mt-2 text-center">Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : conversations && conversations?.length > 0 ? (
        conversations.map((conversation) => (
          <Fragment key={conversation.id}>
            <div className="flex bg-yellow-50 rounded-md flex-row-reverse items-center gap-2 p-1 pl-11">
              <img
                className="h-8 w-8 rounded-full object-cover"
                src={avatar || conversation.clients.image}
                alt=""
              />
              <p>{conversation.input}</p>
            </div>
            <div className="flex items-center gap-2 p-1 pr-11">
              <img className="h-8 w-8" src={conversation.bot.image} alt="" />
              <p>{conversation.output}</p>
            </div>
          </Fragment>
        ))
      ) : (
        <p>Send a message to start a new conversation 💬</p>
      )}
    </div>
  );
};

export default ChatBody;
