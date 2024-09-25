import { useEffect, useState } from "react";
import Button from "../../../../components/ui/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
// import Button2 from "@mui/material/Button";
// import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";

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
  const [FullScreen, setFullscreen] = useState(false);

  const handleContactClick = (contact) => {
    setActiveContact(contact);
  };

  useEffect(() => {
    let ResponsiveModal = () => {
      if (window.innerWidth < 539) {
        setFullscreen(true);
      } else {
        setFullscreen(false);
      }
    };
    ResponsiveModal();
    window.addEventListener("resize", ResponsiveModal);
  }, []);

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
          <MessageBox />
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
        <Dialog open={dialog} fullScreen={FullScreen}>
          <DialogContent setDialog={setDialog} />
        </Dialog>
      </div>
    </div>
  );
}

const MessageBox = () => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      // Add logic to send message
      console.log("Sending message:", input);
      setInput("");
    }
  };

  return (
    <div className="p-4 border-t border-gray-200 flex items-center bg-gray-50">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        className="flex-grow p-3 border rounded-md resize-none focus:outline-none focus:border-blue-400 mr-4"
      />
      <Button onClick={handleSend}>Send</Button>
    </div>
  );
};

const DialogContent = ({ setDialog }) => {
  // const [messageContent] = useState([
  //   {
  //     name: "John Joe",
  //     time: "11:11am",
  //     message: "Thank you very much for the car",
  //   },
  //   {
  //     name: "Jennifer Okeke",
  //     time: "11:11am",
  //     message:
  //       "Hello ma, I have an issue with my CSC 411 result. I did the practical, took the test and even sat for the exam but as the result came out I found out I had a missing test and practical score and my exam score was nothing to write home about. Please ma I would appreciate if you can look into this. Thank you!",
  //   },
  // ]);

  return (
    <div className="relative p-5 overflow-y-auto">
      <div className="absolute top-2 right-2">
        <IconButton onClick={() => setDialog(false)}>
          <HighlightOffOutlinedIcon fontSize="small" />
        </IconButton>
      </div>
      <p className="bg-slate-300 rounded-xl sm:w-2/3 w-3/4 mx-auto text-center p-4 text-xs text-neutral-500 mt-[2rem]">
        All messages can only be seen and replied to by the course adviser.
      </p>
      <div className="mt-20 fixed sm:static bottom-0 left-0 right-0">
        <MessageBox />
      </div>
      {/* {messageContent.map((message, i) => (
        <div
          key={i}
          className="border border-neutral-700 shadow-sm rounded-xl px-4 pt-2 pb-7 my-5 relative"
        >
          <h3 className="text-sm">
            <span className="font-bold">{message?.name} </span>
            {message?.time}
          </h3>
          <h3 className="my-2">{message?.message}</h3>
          <div className="absolute bottom-0 right-0">
            <Button2 variant="text" sx={{ color: "#808080" }}>
              <UndoOutlinedIcon fontSize="small" />
              <span className="ml-2 text-sm">Reply</span>
            </Button2>
          </div>
        </div>
      ))} */}
    </div>
  );
};
