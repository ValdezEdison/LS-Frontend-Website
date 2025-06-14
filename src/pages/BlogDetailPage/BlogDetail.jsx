"use client";
import React, { useEffect, useContext, useState } from "react";
import styles from "./BlogDetail.module.css";
import Header from "../../components/layouts/Header";
import ArticleContent from "../../components/BlogDetailPage/ArticleContent";
import Footer from "../../components/layouts/Footer";
import Newsletter from "../../components/common/Newsletter";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchPostDetails, fetchTags } from "../../features/cms/wordpress/WordPressAction";
import { LanguageContext } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";

function BlogDetail() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const { loading, currentPost, tags } = useSelector((state) => state.cms.wordpress);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const location = useLocation();
  const { id } = location.state || {};

  const [state, setState] = useState({
    tag: null,
    tagName: "",
  })

  useEffect(() => {
    if (id) {
      dispatch(fetchTags({per_page: 100}));
      dispatch(fetchPostDetails(id));
    }

  }, [id, dispatch, language]);

  useEffect(() => {
    if (state.tag) {
      navigate("/blog-list", { state: { id: state.tag, name: state.tagName } });
    }
  }, [state.tag, dispatch, language]);
  return (
    <div className={styles.blogContainer}>
      <Header />
      <main className="page-center">
      
          <ArticleContent currentPost={currentPost} tags={tags} loading={loading} setState={setState}/>
        
      </main>
      {!isAuthenticated && <Newsletter />}
      <Footer />

    </div>
  );
}

export default BlogDetail;
