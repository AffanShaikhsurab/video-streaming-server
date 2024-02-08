import { useEffect, useState } from "react";
import "../../Css/Studio/dashboard.css";
import jwtDecode from "jwt-decode";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import noVideo from "../../img/no-video2.png";

function Dashboard() {
  const backendURL = "http://localhost:3000"
  const [myVideos, setMyVideos] = useState([]);
  const [Email, setEmail] = useState();
  const [dropDown, setDropDown] = useState(true);
  const [showSortedVideos, setShowSortedVideos] = useState(false); // State for hover effect
  const [channelSubs, setChannelSubs] = useState();
  const [totalViews, setTotalViews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [menu, setmenu] = useState(() => {
    const menu = localStorage.getItem("studioMenuClicked");
    return menu ? JSON.parse(menu) : false;
  });
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  document.title = "Channel dashboard - Video Streaming Kle Studio";

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setEmail(jwtDecode(token).email);
  }, []);

  useEffect(() => {
    const handleMenuButtonClick = () => {
      setmenu((prevMenuClicked) => !prevMenuClicked);
    };

    const menuButton = document.querySelector(".menu2");
    if (menuButton) {
      menuButton.addEventListener("click", handleMenuButtonClick);
    }

    return () => {
      if (menuButton) {
        menuButton.removeEventListener("click", handleMenuButtonClick);
      }
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("studioMenuClicked", JSON.stringify(menu));
  }, [menu]);

  useEffect(() => {
    const getVideos = async () => {
      try {
        if (Email !== undefined) {
          const response = await fetch(
            `${backendURL}/getuservideos/${Email}`
          );
          const data = await response.json();
          setMyVideos(data);
        }
      } catch (error) {
        // console.log(error.message);
      }
    };

    getVideos()
  }, [Email]);

  useEffect(() => {
    const getSubscribers = async () => {
      try {
        if (Email !== undefined) {
          const response = await fetch(
            `${backendURL}/getsubscribers/${Email}`
          );
          const subscribers = await response.json();

          setChannelSubs(subscribers);
        }
      } catch (error) {
        // Handle fetch error
        console.error(error);
      }
    };

    getSubscribers()
  }, [Email]);

  useEffect(() => {
    const GetTotalViews = async () => {
      try {
        if (Email !== undefined) {
          const response = await fetch(
            `${backendURL}/totalviews/${Email}`
          );
          const totalViews = await response.json();
          setTotalViews(totalViews);
        }
      } catch (error) {
        // console.log(error.message);
      }
    };

    GetTotalViews();
  }, [Email]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const sortedVideos =
    myVideos &&
    myVideos !== "USER DOESN'T EXIST" &&
    myVideos.length > 0 &&
    myVideos.sort((a, b) => b.views - a.views);

  const indexInSorted =
    sortedVideos &&
    sortedVideos.findIndex((video) => video._id === myVideos[0]._id);

  if (loading === true) {
    return (
      <SkeletonTheme baseColor={theme ? "#353535" : "#aaaaaa"}
      highlightColor={theme ? "#444" : "#b6b6b6"}>
        <div
          className="dashboard-data"
          style={{ left: menu ? "125px" : "310px" }}
        >
          <Skeleton
            count={1}
            width={250}
            height={25}
            className="sk-dash-title"
          />
          <div className="dash-data-all sk-dash">
            <div className="performed-vid-data">
              <Skeleton
                count={1}
                width={400}
                height={550}
                className="sk-dash-first"
              />
              <Skeleton
                count={1}
                width={400}
                height={450}
                style={{ marginTop: "20px" }}
                className="sk-dash-second"
              />
            </div>
            <Skeleton
              count={1}
              width={400}
              height={450}
              style={{ marginTop: "25px", marginLeft: "20px" }}
              className="sk-dash-third"
            />
          </div>
        </div>
      </SkeletonTheme>
    );
  }

  if (myVideos.message === "USER DOESN'T EXIST" && channelSubs === 0) {
    return (
      <>
        <div className="studio-dashboard-section">
          <div
            className="dashboard-data"
            style={{
              left: menu ? "125px" : "310px",
              transition: menu ? "all .1s ease" : "none",
            }}
          >
            <p
              className={
                theme ? "dashboard-top" : "dashboard-top text-light-mode"
              }
            >
              Channel dashboard
            </p>
            <div className="dash-data-all">
              <div className="left-dashboard-data">
                <div className={theme ? "uploadnew-video-dash" : "uploadnew-video-dash light-mode text-light-mode"}>
                  <div className="dashed-dash">
                    <div className="dash-dataimp">
                      <img
                        src={noVideo}
                        alt="upload"
                        className="noupload-img"
                      />
                      <p className={theme ? "" : "text-light-mode2"}>Want to see metrics on your recent video?</p>
                      <p className={theme ? "" : "text-light-mode2"}>Upload and publish a video to get started.</p>
                      <button className={theme ? "uploadnewone-video" : "uploadnewone-video text-dark-mode"}>
                        UPLOAD VIDEOS
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </>
    );
  } else if (myVideos.message === "USER DOESN'T EXIST" && channelSubs > 0) {
    return (
      <div className="studio-dashboard-section">
        <div
          className="dashboard-data"
          style={{
            left: menu ? "125px" : "310px",
            transition: menu ? "all .1s ease" : "none",
          }}
        >
          <p
            className={
              theme ? "dashboard-top" : "dashboard-top text-light-mode"
            }
          >
            Channel dashboard
          </p>
          <div className="dash-data-all">
            <div className="left-dashboard-data">
              <div className={theme ? "uploadnew-video-dash" : "uploadnew-video-dash light-mode text-light-mode"}>
                <div className="dashed-dash">
                  <div className="dash-dataimp">
                    <img src={noVideo} alt="upload" className="noupload-img" />
                    <p className={theme ? "" : "text-light-mode2"}>Want to see metrics on your recent video?</p>
                    <p className={theme ? "" : "text-light-mode2"}>Upload and publish a video to get started.</p>
                    <button className={theme ? "uploadnewone-video" : "uploadnewone-video text-dark-mode"}>
                      UPLOAD VIDEOS
                    </button>
                  </div>
                </div>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* <div className="studio-dashboard-section">
        <div
          className="dashboard-data"
          style={{
            left: menu ? "125px" : "310px",
            transition: menu ? "all .1s ease" : "none",
          }}
        >
          <p
            className={
              theme ? "dashboard-top" : "dashboard-top text-light-mode"
            }
          >
            Channel dashboard
          </p>
          <div className="dash-data-all">
            <div className="left-dashboard-data">
              <div
                className={
                  theme
                    ? "dashboard-performance"
                    : "dashboard-performance light-mode text-light-mode"
                }
              >
                <div className="video-performance">
                  <p>Bestest video performance</p>
                  <div className="performed-vid-data">
                    <img
                      src={
                        myVideos &&
                        myVideos.message !== "USER DOESN'T EXIST" &&
                        myVideos.length > 0 &&
                        myVideos[0].thumbnailURL
                      }
                      alt="thumbnail"
                      style={{ width: "358px" }}
                    />
                    <div className="video-performance-icons">
                      <div className="left-performed-icons">
                        <div className="performed-video-views">
                          <BarChartOutlinedIcon
                            fontSize="small"
                            style={{ color: theme ? "#aaa" : "#606060" }}
                          />
                          <p className={theme ? "" : "text-light-mode2"}>
                            {myVideos &&
                              myVideos.message !== "USER DOESN'T EXIST" &&
                              myVideos.length > 0 &&
                              myVideos[0].views}
                          </p>
                        </div>
                        <div className="performed-video-comments">
                          <ChatOutlinedIcon
                            fontSize="small"
                            style={{ color: theme ? "#aaa" : "#606060" }}
                          />
                          <p className={theme ? "" : "text-light-mode2"}>
                            {myVideos &&
                              myVideos.message !== "USER DOESN'T EXIST" &&
                              myVideos.length > 0 &&
                              myVideos[0].comments.length}
                          </p>
                        </div>
                        <div className="performed-video-likes">
                          <ThumbUpOutlinedIcon
                            fontSize="small"
                            style={{ color: theme ? "#aaa" : "#606060" }}
                          />
                          <p className={theme ? "" : "text-light-mode2"}>
                            {myVideos &&
                              myVideos.message !== "USER DOESN'T EXIST" &&
                              myVideos.length > 0 &&
                              myVideos[0].likes}
                          </p>
                        </div>
                      </div>
                      <div className="right-performed-icons">
                        <KeyboardArrowDownOutlinedIcon
                          fontSize="medium"
                          className={theme ? "expandd" : "expandd expand-light"}
                          style={
                            dropDown === false &&
                            myVideos &&
                            myVideos.message !== "USER DOESN'T EXIST" &&
                            myVideos.length > 1
                              ? { color: "#aaa", cursor: "pointer" }
                              : { display: "none" }
                          }
                          onClick={() => setDropDown(true)}
                        />
                        <KeyboardArrowUpIcon
                          fontSize="medium"
                          className={theme ? "expandd" : "expandd expand-light"}
                          style={
                            dropDown === true &&
                            myVideos &&
                            myVideos.message !== "USER DOESN'T EXIST" &&
                            myVideos.length > 1
                              ? { color: "#aaa", cursor: "pointer" }
                              : { display: "none" }
                          }
                          onClick={() => setDropDown(false)}
                        />
                      </div>
                    </div>
                    <div
                      className="extra-performance-data"
                      style={
                        myVideos &&
                        myVideos.message !== "USER DOESN'T EXIST" &&
                        myVideos.length > 1 &&
                        dropDown === true
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      <p className={theme ? "" : "text-light-mode2"}>
                        First{" "}
                        {(() => {
                          const timeDifference =
                            new Date() -
                            new Date(
                              myVideos &&
                                myVideos.length > 0 &&
                                myVideos[0].uploaded_date
                            );
                          const minutes = Math.floor(timeDifference / 60000);
                          const hours = Math.floor(timeDifference / 3600000);
                          const days = Math.floor(timeDifference / 86400000);
                          const weeks = Math.floor(timeDifference / 604800000);
                          const years = Math.floor(
                            timeDifference / 31536000000
                          );

                          if (minutes < 1) {
                            return "just now";
                          } else if (minutes < 60) {
                            return `${minutes} mins`;
                          } else if (hours < 24) {
                            return `${hours} hours`;
                          } else if (days < 7) {
                            return `${days} days`;
                          } else if (weeks < 52) {
                            return `${weeks} weeks`;
                          } else {
                            return `${years} years`;
                          }
                        })()}
                      </p>
                      <div className="more-performed-details">
                        <div className="views-ranking">
                          <p>Ranking by views</p>
                          <div
                            className="total-outof"
                            onMouseEnter={() => setShowSortedVideos(true)}
                            onMouseLeave={() => setShowSortedVideos(false)}
                          >
                            <p>
                              {indexInSorted + 1} of {myVideos.length}
                            </p>
                            <ChevronRightIcon
                              fontSize="medium"
                              className={
                                theme ? "right-arrw" : "right-arrw-light"
                              }
                              style={{ color: "#aaa" }}
                            />
                          </div>
                          <div
                            className={`${
                              theme
                                ? "all-sortedvideos-dash"
                                : "all-sortedvideos-dash light-mode text-light-mode"
                            } ${showSortedVideos ? "visible" : ""}`}
                          >
                            <p>Top recent videos</p>
                            <p className={theme ? "" : "text-light-mode2"}>
                              Views
                            </p>

                            {sortedVideos &&
                              sortedVideos.map((element, index) => {
                                return (
                                  <div
                                    className="list-of-sortedvideos"
                                    key={index}
                                  >
                                    <div className="leftsort-list">
                                      <p
                                        style={{
                                          color: theme ? "#aaa" : "#606060",
                                        }}
                                      >
                                        {index + 1}
                                      </p>
                                      <div className="sorted-viddataaa">
                                        <img
                                          src={element.thumbnailURL}
                                          alt=""
                                          className="sortedthumbnail"
                                        />
                                        <p style={{ marginLeft: "12px" }}>
                                          {" "}
                                          {element.Title.length <= 25
                                            ? element.Title
                                            : `${element.Title.slice(
                                                0,
                                                20
                                              )}...`}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="right-sortlist">
                                      <p>{element.views}</p>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>

                        <div className="thisviews-performed">
                          <p>Views</p>
                          <p>
                            {myVideos &&
                              myVideos.length > 0 &&
                              myVideos[0].views}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p
                      className="see-comments-dash"
                      onClick={() =>
                        (window.location.href = `/studio/video/comments/${myVideos[0]._id}`)
                      }
                    >
                      SEE COMMENTS (
                      {myVideos &&
                        myVideos.length > 0 &&
                        myVideos[0].comments.length}
                      )
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={
                  theme
                    ? "published-videos-dash"
                    : "published-videos-dash light-mode text-light-mode"
                }
              >
                <p className="publish-toop">Published videos</p>
                <div className="all-publishvid-data">
                  {myVideos &&
                    myVideos.length > 0 &&
                    myVideos.map((element, index) => {
                      return (
                        <div
                          className={
                            theme
                              ? "dashboard-publishvideos"
                              : "dashboard-publishvideos dashboard-publishvideos-light"
                          }
                          key={index}
                        >
                          <img
                            src={element.thumbnailURL}
                            alt="thumbnail"
                            className="publish-imgs"
                            onClick={() =>
                              (window.location.href = `/studio/video/edit/${element._id}`)
                            }
                          />
                          <div className="publish-rightdata">
                            <div className="toppublish">
                              {element.Title.length <= 42
                                ? element.Title
                                : `${element.Title.slice(0, 35)}...`}
                            </div>
                            <div className="bottompublish">
                              <div className="publishviews">
                                <BarChartOutlinedIcon
                                  fontSize="small"
                                  style={{ color: theme ? "#aaa" : "#606060" }}
                                />
                                <p className={theme ? "" : "text-light-mode2"}>
                                  {element.views}
                                </p>
                              </div>
                              <div className="publishcomments">
                                <ChatOutlinedIcon
                                  fontSize="small"
                                  style={{ color: theme ? "#aaa" : "#606060" }}
                                />
                                <p className={theme ? "" : "text-light-mode2"}>
                                  {element.comments.length}
                                </p>
                              </div>
                              <div className="publishlikes">
                                <ThumbUpOutlinedIcon
                                  fontSize="small"
                                  style={{ color: theme ? "#aaa" : "#606060" }}
                                />
                                <p className={theme ? "" : "text-light-mode2"}>
                                  {element.likes}
                                </p>
                              </div>
                            </div>
                            <div className="bottompublish2">
                              <div className="publishviews">
                                <ModeEditOutlineOutlinedIcon
                                  className={
                                    theme ? "make-white" : "make-white-light"
                                  }
                                  fontSize="small"
                                  style={{ color: theme ? "#aaa" : "#606060" }}
                                  onClick={() =>
                                    (window.location.href = `/studio/video/edit/${element._id}`)
                                  }
                                />
                              </div>
                              <div className="publishcomments">
                                <ChatOutlinedIcon
                                  className={
                                    theme ? "make-white" : "make-white-light"
                                  }
                                  fontSize="small"
                                  style={{ color: theme ? "#aaa" : "#606060" }}
                                  onClick={() =>
                                    (window.location.href = `/studio/video/comments/${element._id}`)
                                  }
                                />
                              </div>
                              <div className="publishlikes">
                                <YoutubeIcon
                                  className={
                                    theme ? "make-white" : "make-white-light"
                                  }
                                  fontSize="small"
                                  style={{ color: theme ? "#aaa" : "#606060" }}
                                  onClick={() =>
                                    (window.location.href = `/video/${element._id}`)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <p
                  className="see-comments-dash go-videos"
                  onClick={() => (window.location.href = `/studio/video`)}
                >
                  GO TO VIDEOS
                </p>
              </div>
            </div>
          
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Dashboard;