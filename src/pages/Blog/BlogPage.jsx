"use client";
import React, { useEffect } from "react";
import styles from "./BlogPage.module.css";
import Header from "../../components/layouts/Header";
import BlogCategories from "../../components/Blog/BlogCategories";
import BlogPostCard from "../../components/Blog/BlogPostCard";
import BlogSection from "../../components/Blog/BlogSection";
import Newsletter from "../../components/common/Newsletter";
import Footer from "../../components/layouts/Footer";
import ArticlesSection from "../../components/common/ArticlesSection";
import { fetchPosts } from "../../features/cms/wordpress/WordPressAction";
import { useDispatch, useSelector } from "react-redux";

function BlogPage() {

  const dispatch = useDispatch();

   const { posts, loading: postsLoading, error: postsError } = useSelector((state) => state.cms.wordpress);
 

  useEffect(() => {
    dispatch(fetchPosts({ per_page: 20 }));
  }, [dispatch]);

  const handleNavActions = (e, id, action) => {
    if(action === "viewDetail") {
      navigate('/places/details', { state: { id } });
    }else if(action === "viewList") {
      navigate('/blog');
    }
  }

  return (
    <div className={styles.blogContainer}>
      <div className={styles.mainWrapper}>
        <Header />

        <main>
          
            <div className={styles.mainWrapper}>
              <div className="page-center">
                <div className={styles.blogHeaderWrapper}>
                  <h1 className={styles.blogTitle}>Blog de Local Secrets</h1>
                  <BlogCategories />
                </div>
                {/* <h2 className={styles.sectionTitle}>Últimos artículos</h2> */}
              </div>

             
            </div>
            <ArticlesSection posts={posts} seeMore={true} handleNavActions={handleNavActions}/>
            <ArticlesSection posts={posts} seeMore={true} handleNavActions={handleNavActions}/>
            <ArticlesSection posts={posts} seeMore={true} handleNavActions={handleNavActions}/>
            <ArticlesSection posts={posts} seeMore={true} handleNavActions={handleNavActions}/>
          

        </main>
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
}

export default BlogPage;
