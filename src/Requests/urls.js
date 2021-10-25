const mainUrl = "http://arjun-task-manager.herokuapp.com";
const createUser = `${mainUrl}/users`; //POST name(required)='',email(required)='',password(required)='',age=''
const userLogin = `${mainUrl}/users/login`; //POST
const userLogout = `${mainUrl}/users/logout`; //POST
const userLogoutall = `${mainUrl}/users/logoutall`; //POST
const deleteUser = `${mainUrl}/users/me`; //DELETE
const updateUser = `${mainUrl}/users/me`; //PATCH updatefield(required)='';
const viewUser = `${mainUrl}/users/me`; //get
const addAvatar = `${mainUrl}/users/me/avatar`; //POST
const removeAvatar = `${mainUrl}/users/me/avatar`; //DELETE
const createTask = `${mainUrl}/tasks`; //POST task(required)= '',completed= ''
const updateTask = `${mainUrl}/tasks/`; //PATCH updatefield(required) provide id
const findTask = `${mainUrl}/tasks/search`; //GET provide id
const readTasks = `${mainUrl}/tasks`; // GET ? match , sort ,limit ,skip
const deleteTask = `${mainUrl}/tasks/`; // provide id
const getAavtar = `${mainUrl}/users/`;

module.exports = {
  createUser,
  userLogin,
  userLogout,
  userLogoutall,
  deleteUser,
  updateUser,
  viewUser,
  addAvatar,
  removeAvatar,
  createTask,
  updateTask,
  findTask,
  readTasks,
  deleteTask,
  getAavtar,
};
