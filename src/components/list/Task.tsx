import {TaskProps} from "../../interfaces";
import {Button, Checkbox, Modal} from "@carbon/react";
import {useState} from "react";

export const Task = ({task, onDelete, handleCheck}: TaskProps) => {
    const [checked, setChecked] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const handleDelete = (): void => {
        onDelete(task.id);
    }
    const handleCheckboxChange = (checked: boolean) => {
        setChecked(checked);
        handleCheck(task.id, checked);
    };

    return (
        <div className="task-cont w-full">
            <div className="text-status" style={{width: "10%"}}>
                <div>
                    <Checkbox
                        id={task.id}
                        labelText={task.status}
                        checked={checked}
                        onChange={(e) => handleCheckboxChange(e.target.checked)}
                    />
                </div>
            </div>
            <div className="text-title" style={{width: "30%"}}>
                {task.title}
            </div>
            <div style={{width: "40%"}}>
                {task.description}
            </div>
            <div style={{flexGrow: 1, display: "flex", justifyContent: "end", paddingRight: "15px"}}>
                <Button
                    kind="danger"
                    onClick={() => setOpen(true)}
                >
                    delete
                </Button>
            </div>
            <Modal
                open={open}
                danger={true}
                primaryButtonText="Yes, delete it."
                secondaryButtonText="No, cancel."
                onRequestSubmit={handleDelete}
                onRequestClose={() => setOpen(false)}
            >
            <div>
                Are you sure you want to delete this task?
            </div>
            </Modal>
        </div>
    )
}