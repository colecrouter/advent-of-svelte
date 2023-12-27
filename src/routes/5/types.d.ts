type TaskType = 'CREATED_TOY' | 'WRAPPED_PRESENT';

interface Task {
    elf: string;
    task: TaskType;
    minutesTaken: number;
    date: string;
}

interface ObjectConstructor {
    groupBy<T>(items: T[], callbackFn: (item: T) => string): { [key: string]: T[]; };
}