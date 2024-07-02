import {ITask, ITaskInput} from "../../interfaces";
import "./list.scss";
import {useState} from "react";
import {v4 as uuidv4} from 'uuid';
import {StorageUtil} from "../../utils/StorageUtil";
import {Button, Modal, TextArea, TextInput} from "@carbon/react";
import {Task} from "./Task";
import {TaskStatus} from "../../utils/enums";

const taskInputInitialState: ITaskInput = {
    title: "",
    description: ""
}
export const CustomList = () => {
    const [tasks, setTasks] = useState<ITask[]>(StorageUtil.getFromLocalStorage("tasks") ?? []);
    const [open, setOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<ITaskInput>(taskInputInitialState);
    const handleAdd = () => {
        if (!inputValue?.title)
            return;
        const newTask: ITask = {
            id: uuidv4(),
            title: inputValue?.title,
            description: inputValue?.description,
            status: TaskStatus.NOT_STARTED
        }
        setTasks([...tasks, newTask]);
        setInputValue(taskInputInitialState);
        StorageUtil.saveToLocalStorage([newTask], 'tasks');
        setOpen(false);
    }
    const handleDelete = (taskId: string): void => {
        StorageUtil.removeTask(taskId, "tasks");
        setTasks(StorageUtil.getFromLocalStorage("tasks") ?? []);
    }
    const handleModal = () => {
        setOpen(prevState => !prevState);
    }

    const handleCheck = (taskId: string, check: boolean) => {
        console.log("task", taskId, check)
        StorageUtil.updateTask(taskId, check, "tasks");
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, status: check ? TaskStatus.DONE : TaskStatus.NOT_STARTED };
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    return (
        <div className="list-container">
            <div className="header-container">
                <div className="title-container">
                    TO-DO LIST
                </div>
                <Button kind="primary" onClick={handleModal}>
                    Add a new task
                </Button>
            </div>
            {
                tasks.length !== 0 ?
                    <div className="scrollable h-full">
                        {
                            tasks.map(task => (
                                <Task key={task.id} task={task} onDelete={handleDelete} handleCheck={handleCheck}/>
                            ))
                        }
                    </div> :
                    <div className="flex-cont h-full">
                        You don't have any tasks on your list.
                    </div>
            }
            <Modal
                modalHeading="Create a new task"
                modalLabel="Task list"
                open={open}
                onRequestClose={handleModal}
                secondaryButtonText="Cancel"
                primaryButtonText="Create"
                onRequestSubmit={handleAdd}
            >
                <TextInput
                    id="title-input"
                    labelText="Title"
                    helperText="Title should be clear and concise."
                    placeholder="Watch a new episode of HOTD!"
                    value={inputValue?.title}
                    onChange={(e) => setInputValue({...inputValue, title: e.target.value})}
                />
                <div style={{padding: "10px"}}/>
                <TextArea
                    id="description-input"
                    labelText="Description"
                    placeholder="Don't forget to tell Ana all about it!"
                    helperText="If necessary you can provide a longer description."
                    value={inputValue?.description}
                    onChange={(e) => setInputValue({...inputValue, description: e.target.value})}
                />
            </Modal>
        </div>
    )
}