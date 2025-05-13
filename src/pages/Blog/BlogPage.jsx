"use client";
import React, { useEffect, useContext, useState } from "react";
import styles from "./BlogPage.module.css";
import Header from "../../components/layouts/Header";
import BlogPostCard from "../../components/Blog/BlogPostCard";
import BlogSection from "../../components/Blog/BlogSection";
import Newsletter from "../../components/common/Newsletter";
import Footer from "../../components/layouts/Footer";
import ArticlesSection from "../../components/common/ArticlesSection";
import { fetchPosts, fetchCategories, fetchPostsByCategory, fetchTags, fetchMedia, fetchPostsByTag } from "../../features/cms/wordpress/WordPressAction";
import { useDispatch, useSelector } from "react-redux";
import BlogTags from "../../components/Blog/BlogTags";
import { LanguageContext } from "../../context/LanguageContext";
import { useTranslation } from "react-i18next";
import { WidgetSkeleton } from "../../components/skeleton/common/WidgetSkeleton";
import { useNavigate } from "react-router-dom";
import { resetPostsByTag } from "../../features/cms/wordpress/WordPressSlice";

function BlogPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { posts, loading: postsLoading, error: postsError, categories, categoriesLoading, postsByCategory, postsByCategoryLoading, tags, LoadingTags, postsByTagLoading, postsByTag } = useSelector((state) => state.cms.wordpress);

  const { language, languageId } = useContext(LanguageContext);


  const { t } = useTranslation("BlogSection");

  const [state, setState] = useState({
    tag: null,
    tagName: "",
  });


  useEffect(() => {
    if(!state.tag){
      dispatch(resetPostsByTag());
      dispatch(fetchPosts({ per_page: 20 }));
      dispatch(fetchCategories({ per_page: 10 })).then((action) => {
        if (action.payload) {
          // Fetch posts for each category
          action.payload.forEach(category => {
            dispatch(fetchPostsByCategory({
              categoryId: category.id,
            }));
          });
        }
      });
      dispatch(fetchTags({ per_page: 100 }));
    }
    // dispatch(fetchPosts({ per_page: 20 }));
    // dispatch(fetchTags({ per_page: 100 }));
    // dispatch(fetchCategories({ per_page: 10 })).then((action) => {
    //   if (action.payload) {
    //     // Fetch posts for each category
    //     action.payload.forEach(category => {
    //       dispatch(fetchPostsByCategory({
    //         categoryId: category.id,

    //       }));
    //     });
    //   }
    // });
  }, [dispatch, language, state.tag]);



  const handleNavActions = (e, id, action) => {

    if (action === "viewDetail") {
      navigate('/blog-detail', { state: { id } });
    } else if (action === "viewList") {
      navigate('/blog-list');
    }
  }

  useEffect(() => {
    if (state.tag) {

      dispatch(fetchPostsByTag({ tagId: state.tag, per_page: 20 }));
    }

  }, [state.tag, dispatch]);

  return (
    <div className={styles.blogContainer}>
      <div className={styles.mainWrapper}>
        <Header />

        <main>

          <div className={styles.mainWrapper}>
            <div className="page-center">
              <div className={styles.blogHeaderWrapper}>
                <h1 className={styles.blogTitle}>{t('title')}</h1>
                <BlogTags tags={tags} loading={LoadingTags} state={state} setState={setState} />
              </div>
              {/* <h2 className={styles.sectionTitle}>Últimos artículos</h2> */}
            </div>


          </div>
          {postsByCategoryLoading || categoriesLoading || postsByTagLoading && (
            [...Array(4)].map((_, i) => (
              <WidgetSkeleton />
            ))
          )}
          { state.tag ? (
            <ArticlesSection
              title={state.tagName}
              posts={postsByTag} 
              seeMore={false}
              handleNavActions={handleNavActions}
              tags={tags}
              layout="grid"  // Add this prop to indicate grid layout
              setState={setState}
            />
          ) : (
            categories.map((category) => {
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
                    layout="carousel"  // Default carousel layout
                    setState={setState}
                  />
                );
              }
              return null;
            })
          )}


        </main>
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
}

export default BlogPage;
