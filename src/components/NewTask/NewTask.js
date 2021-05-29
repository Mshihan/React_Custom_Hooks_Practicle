import useHttp from "../../hooks/use-http";
import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const enterTaskHandler = async (taskText) => {
    const applyData = (data, taskText) => {
      const generatedId = data.name;
      const createdTask = { id: generatedId, text: taskText };
      props.onAddTask(createdTask);
    };
    const configuration = {
      url: "https://react-http-89bb8-default-rtdb.firebaseio.com/tasks.json",
      method: "POST",
      body: { text: taskText },
      headers: {
        "Content-Type": "application/json",
      },
    };

    await sendTaskRequest(configuration, applyData);
  };

  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  //   try {
  //

  //     if (!response.ok) {
  //       throw new Error("Request failed!");
  //     }
  //   } catch (err) {
  //     setError(err.message || "Something went wrong!");
  //   }
  //   setIsLoading(false);
  // };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
