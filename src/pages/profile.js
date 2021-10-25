import React from "react";
import { useDropzone } from "react-dropzone";
import Header from "../components/ui/header";
import MiniLoader from "../components/ui/miniLoader";
import Info from "../components/ui/info";
import Settings from "../components/ui/settings";
import Layout from "../components/ui/layout";
import { useDispatch, useSelector } from "react-redux";
import { addAvatarRequest,deleteAvatar,fetchUser } from "../Redux/userReducer";
import altProfilePic  from '../images/User-595b40b85ba036ed117da56f.svg';

const ProfilePage = () => {

  const dispatch = useDispatch();

  const { user, loading, avatar } = useSelector((state) => state.user);

  const [isAvatar,setIsAvatar] = React.useState(true);

  const onDrop = React.useCallback(acceptedFiles => {
    const formData = new FormData();
    formData.append('avatar',acceptedFiles[0]);
    dispatch(addAvatarRequest(formData));
  },[])

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: "image/jpeg, image/png, image/jpg",
    onDrop
  });

  // const handleRemove = () => {
  //   dispatch(deleteAvatar());
  //   setIsAvatar(false);
  // }

  const handleImageError = (e) => {
      setIsAvatar(false);
      e.target.onerror = '';
      e.target.src = altProfilePic;
  }

  React.useEffect(() => {
    if(user === null){
      dispatch(fetchUser());
    }
  },[]);

  React.useEffect(() => {
    setIsAvatar(true);
  },[avatar]);

  return (
    <Layout>
      <div className="home-container">
        <Header title="Profile" />
        <main
          className="home-content"
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <section className="profile-content">
            {/* {isAvatar ? (
              <img className="avatar" onLoad={() => setIsAvatar(true)}  src={avatar} alt="user-avatar" onError={handleImageError}></img>
            ) : ( */}
              <div {...getRootProps({ className: "avatar dropzone"})}>
                {isAvatar && <img className="avatar"  src={avatar} alt="user-avatar" onError={handleImageError}></img>}
                <input {...getInputProps()} />
              </div>
            {/* {isAvatar && (
              <button
                className="remove-button"
                style={{ width: "180px", margin: "20px 0px" }}
                onClick={handleRemove}
              >
                Remove Pic
              </button>
            )} */}
            {user && (
              <div className="user-details">
                <Info title="Name" text={user.name} />
                <Info title="Email" text={user.email} />
                <Info title="Age" text={user.age} disable={true} />
              </div>
            )}
            {!loading && !user && (
              <h1 className="empty" style={{ margin: "50px 0px" }}>
                No Info To Display
              </h1>
            )}
            {loading && <MiniLoader InComponent={true} />}
            <Settings />
          </section>
        </main>
      </div>
    </Layout>
  );
};

export default ProfilePage;
