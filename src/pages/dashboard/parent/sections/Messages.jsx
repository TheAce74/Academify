import { useCallback, useEffect, useState } from "react";
import Button from "../../../../components/ui/Button";
import MessageBox from "../../components/ui/MessageBox";
import MessageDialog from "../../components/ui/MessageDialog";
import { useParent } from "../../../../hooks/useParent";
import { useParentContext } from "../../../../context/ParentContext";
import { format } from "date-fns";
import { useAlert } from "../../../../hooks/useAlert";

export default function Messages() {
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const [dialog, setDialog] = useState(false);

  const { getMessages, messageAdviser } = useParent();
  const { parent } = useParentContext();
  const { showAlert } = useAlert();

  const handleContactClick = (contact) => {
    setActiveContact(contact);
  };

  const fetchMessages = useCallback(async () => {
    const data = await getMessages(parent?.profile?.roleId);
    setMessages(data.messages);
    const lastAdviserSenderMessages = data.messages?.filter(
      (message) => message.sender?._id !== parent?.profile?.userId
    );
    const lastAdviserReceiverMessages = data.messages?.filter(
      (message) => message.receiver?._id !== parent?.profile?.userId
    );
    let adviser = [];
    for (const lastAdviserReceiverMessage of lastAdviserReceiverMessages) {
      adviser.push({
        id: lastAdviserReceiverMessage.receiver?._id,
        name: `${lastAdviserReceiverMessage.receiver?.firstName} ${lastAdviserReceiverMessage.receiver?.lastName}`,
        lastMessage: lastAdviserReceiverMessage.content,
        you: true,
      });
    }
    for (const lastAdviserSenderMessage of lastAdviserSenderMessages) {
      adviser.push({
        id: lastAdviserSenderMessage.sender?._id,
        name: `${lastAdviserSenderMessage.sender?.firstName} ${lastAdviserSenderMessage.sender?.lastName}`,
        lastMessage: lastAdviserSenderMessage.content,
        you: false,
      });
    }
    setContacts(adviser);
  }, [getMessages, parent?.profile?.roleId, parent?.profile?.userId]);

  const senderCallback = async (message, childReg) => {
    const child = parent?.children?.filter(
      (child) => child.reg === childReg
    )[0];
    const adviserId = child?.courseAdvisor;
    return await messageAdviser(message, parent?.profile?.roleId, adviserId);
  };

  const sendMessage = async (message) => {
    if (activeContact) {
      const adviserId = activeContact.id;
      const regNumber = parent?.children?.filter(
        (child) => child?.courseAdvisor === adviserId
      )[0]?.reg;
      try {
        const response = await senderCallback(message, regNumber);
        showAlert(response.message, {
          variant: "success",
        });
        fetchMessages();
      } catch (e) {
        console.error(e);
      }
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
            <div className="font-semibold">{contact.name}</div>
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
                  message.sender?._id === parent?.profile?.roleId
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg shadow-md ${
                    message.sender?._id === parent?.profile?.roleId
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
          role="parent"
        />
      </div>
    </div>
  );
}
