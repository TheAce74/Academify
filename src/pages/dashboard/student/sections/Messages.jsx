import { useState } from "react";
import Button from "../../../../components/ui/Button";
import MessageBox from "../../components/ui/MessageBox";
import MessageDialog from "../../components/ui/MessageDialog";

export default function Messages() {
  const [contacts] = useState([
    // { id: 1, name: "John Doe", lastMessage: "Hey, how are you?" },
    // { id: 2, name: "Jane Smith", lastMessage: "See you tomorrow!" },
    // { id: 3, name: "Michael Johnson", lastMessage: "Let's catch up later." },
  ]);
  const [messages] = useState([
    // { sender: "John Doe", content: "Hello!", time: "10:30 AM" },
    // { sender: "You", content: "Hi John, how are you?", time: "10:32 AM" },
    // {
    //   sender: "John Doe",
    //   content: "I am good, thanks for asking!",
    //   time: "10:35 AM",
    // },
  ]);
  const [activeContact, setActiveContact] = useState(null);
  const [dialog, setDialog] = useState(false);

  const handleContactClick = (contact) => {
    setActiveContact(contact);
  };

  return contacts.length > 0 ? (
    <div className="grid grid-cols-1 xl:grid-cols-4 h-[83dvh] xl:h-[73dvh] bg-gray-100">
      {/* Chat List Section */}
      <div className="xl:col-span-1 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 text-lg font-bold bg-gray-50 border-b border-gray-200">
          Chats
        </div>
        {contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => handleContactClick(contact)}
            className={`p-4 border-b border-gray-100 cursor-pointer ${
              contact.id === activeContact?.id
                ? "bg-blue-50"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="font-semibold">{contact.name}</div>
            <div className="text-sm text-gray-500">{contact.lastMessage}</div>
          </div>
        ))}
      </div>

      {/* Messages Section */}
      {activeContact ? (
        <div className="xl:col-span-3 flex flex-col bg-white">
          <div className="p-4 border-b border-gray-200">
            {activeContact.name}
          </div>
          <div className="flex-1 p-4 overflow-y-auto max-h-[40dvh] xl:max-h-[50dvh]">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex mb-4 ${
                  message.sender === "You" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg shadow-md ${
                    message.sender === "You" ? "bg-[#E7EBFE]" : "bg-white"
                  }`}
                >
                  {message.content}
                </div>
                <div className="text-xs text-gray-400 ml-2 self-end">
                  {message.time}
                </div>
              </div>
            ))}
          </div>
          <MessageBox sendMessage={() => {}} />
        </div>
      ) : (
        <div className="xl:col-span-3 flex flex-col bg-white">
          <div className="h-[40dvh] grid place-content-center place-items-center xl:h-[70dvh]">
            <h2 className="text-xl font-medium">No active chat</h2>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="h-[80dvh] xl:h-[70dvh] gap-4 grid place-content-center place-items-center">
      <h2 className="text-xl font-medium">No conversations</h2>
      <Button onClick={() => setDialog(true)}>Start one</Button>
      <div className="block sm:hidden">
        <MessageDialog dialog={dialog} setDialog={setDialog} />
      </div>
    </div>
  );
}
