// import Button2 from "@mui/material/Button";
// import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { useStudent } from "../../../../hooks/useStudent";
import { useStudentContext } from "../../../../context/StudentContext";
import { useAlert } from "../../../../hooks/useAlert";
import MessageBox from "./MessageBox";
import Dialog from "@mui/material/Dialog";

export default function MessageDialog({ dialog, setDialog }) {
  const [fullScreen, setFullscreen] = useState(false);
  const [messageContent, setMessageContent] = useState([]);

  const { messageAdviser } = useStudent();
  const { student } = useStudentContext();
  const { showAlert } = useAlert();

  const sendMessage = async (message) => {
    setMessageContent([
      {
        name: `${student.student.user.firstName} ${student.student.user.lastName}`,
        time: format(new Date(), "aaa"),
        message,
      },
    ]);
    try {
      const response = await messageAdviser(message, student.student._id);
      showAlert(response.message, {
        variant: "success",
      });
      setDialog(false);
    } catch (e) {
      console.error(e);
      setMessageContent([]);
    }
  };

  useEffect(() => {
    const responsiveModal = () => {
      if (window.innerWidth < 539) {
        setFullscreen(true);
      } else {
        setFullscreen(false);
      }
    };
    responsiveModal();
    window.addEventListener("resize", responsiveModal);
  }, []);

  return (
    <Dialog open={dialog} fullScreen={fullScreen}>
      <div className="relative p-5 overflow-y-auto">
        <div className="absolute top-2 right-2">
          <IconButton onClick={() => setDialog(false)}>
            <HighlightOffOutlinedIcon fontSize="small" />
          </IconButton>
        </div>
        <p className="bg-slate-300 rounded-xl sm:w-2/3 w-3/4 mx-auto text-center p-4 text-xs text-neutral-500 mt-[2rem]">
          All messages can only be seen and replied to by the course adviser.
        </p>
        {messageContent.map((message, i) => (
          <div
            key={i}
            className="border border-neutral-700 shadow-sm rounded-xl px-4 pt-2 pb-7 my-5 relative"
          >
            <h3 className="text-sm">
              <span className="font-bold">{message?.name} </span>
              {message?.time}
            </h3>
            <h3 className="my-2">{message?.message}</h3>
            {/* <div className="absolute bottom-0 right-0">
              <Button2 variant="text" sx={{ color: "#808080" }}>
                <UndoOutlinedIcon fontSize="small" />
                <span className="ml-2 text-sm">Reply</span>
              </Button2>
            </div> */}
          </div>
        ))}
        <div className="mt-20 fixed sm:static bottom-0 left-0 right-0">
          <MessageBox sendMessage={sendMessage} />
        </div>
      </div>
    </Dialog>
  );
}
