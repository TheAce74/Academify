// import Button2 from "@mui/material/Button";
// import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { useStudentContext } from "../../../../context/StudentContext";
import { useParentContext } from "../../../../context/ParentContext";
import { useAlert } from "../../../../hooks/useAlert";
import MessageBox from "./MessageBox";
import Dialog from "@mui/material/Dialog";
import Select2 from "../../../../components/ui/Select2";

export default function MessageDialog({
  dialog,
  setDialog,
  senderCallback,
  role,
  callback,
}) {
  const [fullScreen, setFullscreen] = useState(false);
  const [messageContent, setMessageContent] = useState([]);

  const { showAlert } = useAlert();
  const { student } = useStudentContext();
  const { parent } = useParentContext();

  const [reg, setReg] = useState(
    parent?.children?.length > 0
      ? parent?.children?.map((child) => child.reg)
      : []
  );
  const [childrenDisplay] = useState(
    parent?.children.map((child) => {
      return {
        title: child.user.firstName + " " + child.user.lastName,
        value: child?.reg,
      };
    })
  );

  const sendMessage = async (message) => {
    if (role === "student") {
      setMessageContent([
        {
          name: `${student?.student?.user?.firstName} ${student?.student?.user?.lastName}`,
          time: format(new Date(), "Pp"),
          message,
        },
      ]);
    } else {
      setMessageContent([
        {
          name: `${parent?.profile?.firstName} ${parent?.profile?.lastName}`,
          time: format(new Date(), "Pp"),
          message,
        },
      ]);
    }
    try {
      const response = await senderCallback(message, reg[0]);
      {
        callback && callback();
      }
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
        {role === "parent" && (
          <div className="mt-8 -mb-8">
            <Select2
              value={reg}
              setValue={(e) => setReg(e)}
              placeholder="Select Child"
              options={childrenDisplay}
            />
          </div>
        )}
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
