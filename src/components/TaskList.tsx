import { PlusCircle } from "phosphor-react";
import { SetStateAction, useState } from "react";
import styles from "./tasklist.module.scss";

interface Task {
  title: string;
  id: number;
  isComplete: boolean;
}

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 0,
      title: "Beber agua",
      isComplete: false,
    },
    {
      id: 1,
      title: "Malhar",
      isComplete: false,
    },
    {
      id: 2,
      title: "Ler 10min",
      isComplete: false,
    },
  ]);
  const [newTask, setNewTask] = useState<string>("");

  const handleToggleTaskComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  };

  const handleCreateTask = (title: string) => {
    if (title.length === 0) return;
    setTasks((state) => [...state, { title, id: 4, isComplete: false }]);
    setNewTask("");
  };

  const handleInputValue = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setNewTask(event.target.value);
  };

  return (
    <section className={styles.taskContainer}>
      <header className={styles.addTask}>
        <input
          value={newTask}
          onChange={handleInputValue}
          type="text"
          placeholder="Adicione uma nova tarefa"
          required
        />
        <button onClick={() => handleCreateTask(newTask)}>
          Criar
          <PlusCircle size={22} />
        </button>
      </header>

      <main className={styles.taskList}>
        <div className={styles.info}>
          <p>
            Tarefas criadas <span>{tasks.length}</span>
          </p>
          <p>
            Concluidas{" "}
            <span>
              {tasks.filter((item) => item.isComplete === true).length}
            </span>
          </p>
        </div>

        <section className={tasks.length ? styles.tasks : styles.noTasks}>
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <div
                  className={
                    task.isComplete ? styles.completed : styles.noCompleted
                  }
                >
                  <label htmlFor="">
                    <input
                      type="checkbox"
                      checked={task.isComplete}
                      readOnly
                      onClick={() => handleToggleTaskComplete(task.id)}
                    />
                  </label>
                  <p>{task.title}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </section>
  );
};
