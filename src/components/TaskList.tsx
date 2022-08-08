import { PlusCircle } from "phosphor-react";
import { useState } from "react";
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
  ]);
  const [newTask, setNewTaskList] = useState();

  const handleToggleTaskComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === task.id ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  };

  return (
    <section className={styles.taskContainer}>
      <header className={styles.addTask}>
        <input type="text" placeholder="Adicione uma nova tarefa" />
        <button>
          Criar
          <PlusCircle size={22} />
        </button>
      </header>

      <main className={styles.taskList}>
        <div className={styles.info}>
          <p>
            Tarefas criadas <span>0</span>
          </p>
          <p>
            Concluidas <span>0</span>
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
