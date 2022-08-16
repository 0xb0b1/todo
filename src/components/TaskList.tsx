import { ClipboardText, PlusCircle, Trash } from "phosphor-react";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import styles from "./tasklist.module.scss";

interface Task {
  title: string;
  id: number;
  isComplete: boolean;
}

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
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
    setTasks((state) => [
      ...state,
      { title, id: Math.floor(Math.random() * 100), isComplete: false },
    ]);
    setNewTask("");
  };

  const handleRemoveTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
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

        {tasks.length ? (
          <section className={styles.tasks}>
            <ul>
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={
                    task.isComplete ? styles.completed : styles.noCompleted
                  }
                >
                  <div>
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
                  <Trash size={20} onClick={() => handleRemoveTask(task.id)} />
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <section className={styles.noTasks}>
            <ClipboardText size={72} color="#333" />
            <p>Você ainda não tem tarefas cadastradas</p>
            <span>Crie tarefas e organize seus itens a fazer</span>
          </section>
        )}
      </main>
    </section>
  );
};
