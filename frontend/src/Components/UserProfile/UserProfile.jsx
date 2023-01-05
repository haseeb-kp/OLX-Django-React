import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { imageupload } from "../../utils/Constants";
import { change } from "../../Redux/usernameReducer";
import Swal from "sweetalert2";
import { useState } from "react";
import { changeImage } from "../../Redux/userImageReducer";

function UserProfile() {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const Token = localStorage.getItem("user");
    if (!Token) {
      return navigate("/login");
    } else {
      axios
        .post(`http://localhost:8000/api/profile/${Token}`, JSON.stringify({ Token }), {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          // console.log(res.data.username)
          setName(res.data.username);
          setemail(res.data.email);
          setImage(res.data?.image);
          dispatch(change(res.data.username));
          dispatch(changeImage(`localhost:8000${res.data?.image}`));
        })
        .catch((err) => {
          // localStorage.removeItem("user");
        });
    }
  }, [navigate, dispatch]);

  const addImage = async () => {
    const { value: file } = await Swal.fire({
      title: "Select image",
      input: "file",

      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your profile picture",
      },
    });

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        Swal.fire({
          title: "img",
          imageUrl: e.target.result,
          imageHeight: 400,
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Update",
          denyButtonText: `Change`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            uploadimg(file);
          } else if (result.isDenied) {
            addImage();
          }
        });
      };
      reader.readAsDataURL(file);
    }
    function uploadimg(file) {
      const Token = localStorage.getItem("user");
      let Stoken = JSON.stringify({ Token });
      let formData = new FormData();
      formData.append("image", file);
      axios
        .post(`${imageupload}/${Token}`, formData)
        .then((res) => {
          console.log(`localhost:8000${res.data?.image}`)
          setImage(`localhost:8000${res.data?.image}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // const remove = () => {
  //   const Token = localStorage.getItem("token");
  //   let Stoken = JSON.stringify({ Token });
  //   axios
  //     .delete(`${removeimage}/${Stoken}`)
  //     .then((res) => {
  //       setImage(res.data.image);
  //       dispatch(changeImage(res.data.image));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  return (
    <div>
      <section style={{ backgroundColor: "#eee", paddingTop: "3rem" }}>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    src={image}
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ height: 150, width: 150 }}
                  />
                  <h5 className="my-3">{name}</h5>
                  <p className="text-muted mb-1">{email}</p>

                  <div className="d-flex justify-content-center mb-2">
                    {/* <button
                      onClick={remove}
                      type="button"
                      className="btn btn-primary"
                    >
                      Remove image
                    </button> */}

                    <button
                      onClick={addImage}
                      type="button"
                      className="btn btn-outline-primary ms-1"
                    >
                      Update image
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">User name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{name}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{email}</p>
                    </div>
                  </div>
                  <hr />
                  {/* <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">0494 258 6908</p>
                    </div>
                  </div> */}
                  {/* <hr /> */}
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Mobile</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">7034260621</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">State</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">Kerala</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserProfile;
