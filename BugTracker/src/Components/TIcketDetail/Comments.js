import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../Context";
import { Toast } from "../../animations/Alerts";
import { Fade } from '../../animations/fade'
import axios from "axios";
import { backend_route } from "../../GlobalVariables";

export function Comments({ props, commentsDetail, setCommentsDetail }) {
  const { user } = useContext(Context);

  ////////////////////////Card-General////////////////////////
  const [filteredArray, setFilteredArray] = useState([]);
  ////////////////////////Card-General////////////////////////

  ////////////////////////Search////////////////////////

  const [searchedWord, setSearchedWord] = useState("");
  useEffect(() => {
    setFilteredArray(commentsDetail);
  }, [commentsDetail]);

  const itemsFiltered = (searchedItem, arrayOfObject) => {
    let arrayFiltered = arrayOfObject.filter(function(obj) {
      let objectClean = {};

      objectClean["commenterName"] = obj["commenterName"];
      objectClean["message"] = obj["message"];
      objectClean["createAt"] = obj["createAt"];

      for (let key in objectClean) {
        if (
          JSON.stringify(objectClean[key])
            .toLowerCase()
            .includes(searchedItem.toLowerCase())
        ) {
          return objectClean;
        }
      }
    });
    return arrayFiltered;
  };

  const handleSearchedWord = e => {
    setSearchedWord(e.target.value);
  };

  useEffect(() => {
    setFilteredArray(itemsFiltered(searchedWord, commentsDetail));
    console.log(searchedWord);
  }, [searchedWord]);
  ////////////////////////Search////////////////////////

  // LOGIG PAGINATION ///////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(1);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentCommentsForThisTicket = filteredArray.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  // const totalPersonel = myPersonel.length;

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(filteredArray.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  //////////////////////////////////////////////////////

  const [message, setMessage] = useState("");
  const onHandleMessage = e => {
    e.preventDefault();
    setMessage(e.target.value);
    // console.log(e.target.value);
  };

  const onSendComment = () => {
    axios
      .post(
        `${backend_route}/api/global/ticket/addCommentToTicket`,
        {
          ticketId: props.ticketId,
          commenterId: user._id,
          commenterName: user.name,
          message: message
        },
        {
          params: {},
          headers: { "auth-token": window.sessionStorage.getItem("token") }
        }
      )
      .then(function(res) {
        Toast.fire({
          icon: "success",
          title: "Added comments with success"
        });
        setCommentsDetail(res.data.comments);
        setMessage("");
      })
      .catch(function(error) {
        Toast.fire({
          icon: "error",
          title: "Error! to add comment "
        });
        console.log(error);
      });
  };
  return (
    <Fade>
      <div>
        <h4> {("Add a comment")}?</h4>
        <textarea
          required={true}
          rows="1"
          cols="50"
          className="form-control  mb-4"
          value={message}
          onChange={onHandleMessage}
          type="text"
          placeholder="Your commnets goes here"
        ></textarea>
        <button onClick={onSendComment} className="btn btn-info">
          {("Add")}
        </button>
      </div>
      <div className="card">
        <div className="card-header card-header-success">
          <h6 className="card-title ">{("Tickets Comments")}</h6>
          <p className="card-category">
            {("All your cooments for this tickets")}
          </p>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            {/* ///////////////////Search/////////////////////////// */}
            <div className="input-group no-border w-100  d-flex flex-row-reverse">
              <div className="input-group no-border w-50  ">
                <input
                  className="form-control"
                  type="text"
                  value={searchedWord}
                  onChange={handleSearchedWord}
                  placeholder="Search"
                />
                <button
                  type="submit"
                  class="btn btn-white btn-round btn-just-icon"
                >
                  <i class="material-icons">search</i>
                  <div class="ripple-container"></div>
                </button>
              </div>
            </div>
            {/* ///////////////////Search/////////////////////////// */}
            <table className="table ">
              <thead>
                <tr>
                  <th className="font-weight-bold">{("Commenter")}</th>
                  <th className="font-weight-bold">{("Message")}</th>
                  <th className="font-weight-bold">{("Created at")}</th>
                </tr>
              </thead>
              <tbody>
                {currentCommentsForThisTicket.map((comment, index) => {
                  return (
                    <tr key={index}>
                      <td>{comment.commenterName}</td>
                      <td> {comment.message}</td>
                      <td> {new Date(comment.createAt).toISOString}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <nav>
                      <ul className="pagination">
                        {pageNumbers.map(number => (
                          <li key={number} className="page-item">
                            <a
                              onClick={() => paginate(number)}
                              className="page-link"
                            >
                              {number}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </Fade>
  );
}
