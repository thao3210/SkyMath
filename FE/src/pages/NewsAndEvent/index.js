// import BannerEvent from "./MainBlogs/MainBlogs";
import MainBlogs from "./MainBlogs/MainBlogs";
import NoteworthyBlogs from "./NoteworthyBlogs/NoteworthyBlogs";
import OtherBlogs from "./OtherBlogs/OtherBlogs";

function NewsAndEvent() {
  return (
    <section className="container py-5">
      <MainBlogs />
      <div className="d-flex flex-lg-row flex-column gap-5">
        <div className="col">
          <NoteworthyBlogs />
        </div>
        <div className="col">
          <OtherBlogs />
        </div>
      </div>
    </section>
  );
}

export default NewsAndEvent;
