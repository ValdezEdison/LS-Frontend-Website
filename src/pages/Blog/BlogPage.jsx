"use client";
import React, { useEffect, useContext } from "react";
import styles from "./BlogPage.module.css";
import Header from "../../components/layouts/Header";
import BlogPostCard from "../../components/Blog/BlogPostCard";
import BlogSection from "../../components/Blog/BlogSection";
import Newsletter from "../../components/common/Newsletter";
import Footer from "../../components/layouts/Footer";
import ArticlesSection from "../../components/common/ArticlesSection";
import { fetchPosts, fetchCategories, fetchPostsByCategory, fetchTags } from "../../features/cms/wordpress/WordPressAction";
import { useDispatch, useSelector } from "react-redux";
import BlogTags from "../../components/Blog/BlogTags";
import { LanguageContext } from "../../context/LanguageContext";
import { useTranslation } from "react-i18next";
import { WidgetSkeleton } from "../../components/skeleton/common/WidgetSkeleton";

function BlogPage() {

  const dispatch = useDispatch();

   const { posts, loading: postsLoading, error: postsError, categories, categoriesLoading, postsByCategory, postsByCategoryLoading, tags, LoadingTags } = useSelector((state) => state.cms.wordpress);

     const { language, languageId } = useContext(LanguageContext);


  const { t } = useTranslation("BlogSection");
 

  useEffect(() => {
    dispatch(fetchPosts({ per_page: 20 }));
    dispatch(fetchTags({per_page: 100}));
    dispatch(fetchCategories({per_page: 10})).then((action) => {
      if (action.payload) {
        // Fetch posts for each category
        action.payload.forEach(category => {
          dispatch(fetchPostsByCategory({ 
            categoryId: category.id,
           
          }));
        });
      }
    });
  }, [dispatch, language]);



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
                  <h1 className={styles.blogTitle}>{t('title')}</h1>
                  <BlogTags tags={tags} loading={LoadingTags}/>
                </div>
                {/* <h2 className={styles.sectionTitle}>Últimos artículos</h2> */}
              </div>

             
            </div>
            {postsByCategoryLoading || categoriesLoading  && (
              [...Array(4)].map((_, i) => (
              <WidgetSkeleton />
            ))
            )}
            {categories.map((category) => {
              const categoryPosts = postsByCategory[category.id] || [];
              if (categoryPosts.length > 0) {
                return (
                  <ArticlesSection 
                    key={category.id} 
                    title={category.name} 
                    posts={categoryPosts} 
                    seeMore={true} 
                    handleNavActions={handleNavActions}
                    tags={tags}
                  />
                );
              }
            })}

          

        </main>
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
}

export default BlogPage;
