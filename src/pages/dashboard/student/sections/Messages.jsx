import { useCallback, useEffect, useState } from "react";
import Button from "../../../../components/ui/Button";
import MessageBox from "../../components/ui/MessageBox";
import MessageDialog from "../../components/ui/MessageDialog";
import { useStudent } from "../../../../hooks/useStudent";
import { useStudentContext } from "../../../../context/StudentContext";
import { format } from "date-fns";
import { useAlert } from "../../../../hooks/useAlert";

export default function Messages() {
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const [dialog, setDialog] = useState(false);

  const { getMessages, messageAdviser } = useStudent();
  const { student } = useStudentContext();
  const { showAlert } = useAlert();

  const handleContactClick = (contact) => {
    setActiveContact(contact);
  };

  const fetchMessages = useCallback(async () => {
    const data = await getMessages(student?.student?._id);
    setMessages(data.messages);
    const lastAdviserSenderMessage = data.messages?.filter(
      (message) => message.sender?._id !== student?.student?.user?._id
    );
    const lastAdviserReceiverMessage = data.messages?.filter(
      (message) => message.receiver?._id !== student?.student?.user?._id
    );
    let adviser = {};
    if (lastAdviserSenderMessage.length === 0) {
      adviser = {
        id: lastAdviserReceiverMessage[0].receiver._id,
        name: `${lastAdviserReceiverMessage[0].receiver.firstName} ${lastAdviserReceiverMessage[0].receiver.lastName}`,
        lastMessage: lastAdviserReceiverMessage[0].content,
        you: true,
      };
    } else {
      adviser = {
        id: lastAdviserSenderMessage[0].sender._id,
        name: `${lastAdviserSenderMessage[0].sender.firstName} ${lastAdviserSenderMessage[0].sender.lastName}`,
        lastMessage: lastAdviserSenderMessage[0].content,
        you: false,
      };
    }
    setContacts([adviser]);
  }, [getMessages, student?.student?._id, student?.student?.user?._id]);

  const senderCallback = async (message) => {
    return await messageAdviser(message, student?.student?._id);
  };

  const sendMessage = async (message) => {
    try {
      const response = await senderCallback(message);
      showAlert(response.message, {
        variant: "success",
      });
      fetchMessages();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

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
            <div className="font-semibold flex items-center gap-1">
              <span>{contact.name}</span>
              <span className="text-xs font-normal text-gray-500">
                (Class adviser)
              </span>
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <span>{contact.lastMessage}</span>
              {contact.you && <span className="text-xs italic">(You)</span>}
            </div>
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
            {[...messages].reverse().map((message, index) => (
              <div
                key={index}
                className={`flex mb-4 ${
                  message.sender?._id === student?.student?.user?._id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg shadow-md ${
                    message.sender?._id === student?.student?.user?._id
                      ? "bg-[#E7EBFE]"
                      : "bg-white"
                  }`}
                >
                  {message.content}
                </div>
                <div className="text-xs text-gray-400 ml-2 self-end">
                  {format(new Date(message.timestamp), "Pp")}
                </div>
              </div>
            ))}
          </div>
          <MessageBox sendMessage={sendMessage} />
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
        <MessageDialog
          dialog={dialog}
          setDialog={setDialog}
          senderCallback={senderCallback}
        />
      </div>
    </div>
  );
}
