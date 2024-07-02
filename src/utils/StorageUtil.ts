import {ITask} from "../interfaces";
import {TaskStatus} from "./enums";

export class StorageUtil {
    static saveToLocalStorage = (data: Array<ITask>, key: string): void => {
        const oldData: Array<ITask> | undefined = this.getFromLocalStorage(key);
        if (oldData !== undefined) {
            const dataStr = JSON.stringify(oldData.concat(data));
            localStorage.setItem(key, dataStr);
        } else {
            const dataStr = JSON.stringify(data);
            localStorage.setItem(key, dataStr);
        }
    }

    static getFromLocalStorage = (key: string): Array<ITask> | undefined => {
        const dataStr: string | null = localStorage.getItem(key);
        if (dataStr !== null) {
            const data: Array<ITask> = JSON.parse(dataStr);
            return data;
        } else return undefined;
    }

    static removeTask = (taskId: string, key: string) => {
        const tasks = this.getFromLocalStorage(key);
        const updatedTasks = tasks?.filter(task => task.id !== taskId);
        const dataStr = JSON.stringify(updatedTasks);
        localStorage.setItem(key, dataStr);
    }

    static updateTask = (taskId: string, check: boolean, key: string) => {
        const tasks = this.getFromLocalStorage(key);
        if(tasks === undefined)
            return;
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, status: check ? TaskStatus.DONE : TaskStatus.NOT_STARTED };
            }
            return task;
        });
        const dataStr = JSON.stringify(updatedTasks);
        localStorage.setItem(key, dataStr);
    }
}