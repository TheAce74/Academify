import { useState } from "react";
import { useAlert } from "../../../../hooks/useAlert";
import Button from "../../../../components/ui/Button";

const MessageBox = ({ sendMessage }) => {
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const { showAlert } = useAlert();

  const handleSend = async () => {
    const message = input.trim();
    if (message !== "") {
      setSending(true);
      await sendMessage(message);
      setInput("");
      setSending(false);
    } else {
      showAlert("Message can't be empty");
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
      <Button onClick={handleSend} disabled={sending}>
        Send
      </Button>
    </div>
  );
};

export default MessageBox;
