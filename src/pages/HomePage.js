import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchForm from "../components/forms/searchForm";
import TaskList from "../components/tasks/taskList";
import AddButton from "../components/ui/addButton";
import Header from "../components/ui/header";
import Layout from "../components/ui/layout";
import { fetchTasks } from "../Redux/tasksReducer";

const HomePage = () => {

  const {tasks,loading,searchResult,isMore} = useSelector((state) => state.tasks);

  const dispatch = useDispatch();

  const [options,setOptions] = React.useState({
    limit: 10,
    sortBy: 'asc',
    skip: 0
  });
  const [search,setSearch] = React.useState(false);
  
  const loadMore = () => {
    if(tasks.length%10 === 0){
      dispatch(fetchTasks({...options,skip: options.skip + 10}));
      setOptions(prev =>({...prev,skip: options.skip + 10}))
    }
  }

  React.useEffect(() => {
    if(tasks.length === 0){
      dispatch(fetchTasks(options));
    }
  },[])

  return (
    <Layout>
        <div className="home-container">
          <Header title="Dashboard"  />
          <SearchForm setSearch={setSearch} />
          <TaskList tasks={search ? searchResult : tasks} loading={loading}  handleMore={loadMore} search={search} isMore={isMore} />
        </div>
        <AddButton />
    </Layout>
  );
};

export default HomePage;
