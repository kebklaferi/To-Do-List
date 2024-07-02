import {TaskStatus} from "./utils/enums";
export interface ITask {
    id: string,
    title: string,
    description?: string,
    status: TaskStatus,
}

export interface TaskProps {
    task: ITask,
    onDelete: (taskId: string) => void,
    handleCheck: (taskId: string, checked: boolean) => void
}

export interface ITaskInput {
    title?: string,
    description?: string
}
